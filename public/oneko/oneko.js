// oneko.js: https://github.com/adryd325/oneko.js

(function oneko() {
  const isReducedMotion =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

  if (isReducedMotion) return;

  const nekoEl = document.createElement('div');

  let nekoPosX = 32;
  let nekoPosY = 32;

  let mousePosX = 0;
  let mousePosY = 0;

  let frameCount = 0;
  let idleTime = 0;
  let idleAnimation = null;
  let idleAnimationFrame = 0;

  const nekoSpeed = 10;
  const spriteSets = {
    idle: [[-3, -3]],
    alert: [[-7, -3]],
    scratchSelf: [
      [-5, 0],
      [-6, 0],
      [-7, 0],
    ],
    scratchWallN: [
      [0, 0],
      [0, -1],
    ],
    scratchWallS: [
      [-7, -1],
      [-6, -2],
    ],
    scratchWallE: [
      [-2, -2],
      [-2, -3],
    ],
    scratchWallW: [
      [-4, 0],
      [-4, -1],
    ],
    tired: [[-3, -2]],
    sleeping: [
      [-2, 0],
      [-2, -1],
    ],
    N: [
      [-1, -2],
      [-1, -3],
    ],
    NE: [
      [0, -2],
      [0, -3],
    ],
    E: [
      [-3, 0],
      [-3, -1],
    ],
    SE: [
      [-5, -1],
      [-5, -2],
    ],
    S: [
      [-6, -3],
      [-7, -2],
    ],
    SW: [
      [-5, -3],
      [-6, -1],
    ],
    W: [
      [-4, -2],
      [-4, -3],
    ],
    NW: [
      [-1, 0],
      [-1, -1],
    ],
  };

  // Sounds are synthesised with the Web Audio API rather than loaded from
  // files, so the cat stays a zero-asset drop-in.
  let audioCtx = null;
  let purrNodes = null;
  let soundEnabled = true;

  // Browsers refuse to start audio before a user gesture, so the context is
  // created on the first click and reused from then on.
  function getAudioCtx() {
    if (!soundEnabled) return null;
    if (audioCtx === null) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) {
        soundEnabled = false;
        return null;
      }
      audioCtx = new Ctx();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function meow() {
    const ctx = getAudioCtx();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const formant = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    // A meow is roughly a pitch that rises then falls, pushed through a
    // vowel-ish resonant peak.
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.linearRampToValueAtTime(680, now + 0.12);
    osc.frequency.linearRampToValueAtTime(400, now + 0.42);

    formant.type = 'bandpass';
    formant.frequency.setValueAtTime(900, now);
    formant.frequency.linearRampToValueAtTime(1500, now + 0.12);
    formant.frequency.linearRampToValueAtTime(750, now + 0.42);
    formant.Q.value = 6;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
    gain.gain.setValueAtTime(0.12, now + 0.22);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

    osc.connect(formant);
    formant.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.46);
  }

  function startPurring() {
    if (purrNodes) return;
    // Only purr once the context exists — i.e. after the visitor has clicked
    // at least once. Creating it here would be blocked by autoplay policy.
    if (!soundEnabled || audioCtx === null) return;
    const ctx = audioCtx;
    if (ctx.state === 'suspended') return;

    const now = ctx.currentTime;
    const carrier = ctx.createOscillator();
    const lowpass = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    // A low rumble whose amplitude is chopped ~25 times a second is what makes
    // a purr read as a purr.
    const tremolo = ctx.createOscillator();
    const tremoloDepth = ctx.createGain();

    carrier.type = 'triangle';
    carrier.frequency.value = 55;

    lowpass.type = 'lowpass';
    lowpass.frequency.value = 320;

    tremolo.type = 'sine';
    tremolo.frequency.value = 25;
    tremoloDepth.gain.value = 0.035;

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.8);

    tremolo.connect(tremoloDepth);
    tremoloDepth.connect(gain.gain);

    carrier.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(ctx.destination);

    carrier.start(now);
    tremolo.start(now);

    purrNodes = { carrier, tremolo, gain };
  }

  function stopPurring() {
    if (!purrNodes) return;
    const { carrier, tremolo, gain } = purrNodes;
    purrNodes = null;

    const ctx = audioCtx;
    const now = ctx.currentTime;
    // Fade out rather than cutting, which would click.
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(0.0001, now + 0.4);
    carrier.stop(now + 0.45);
    tremolo.stop(now + 0.45);
  }

  function init() {
    nekoEl.id = 'oneko';
    nekoEl.ariaHidden = true;
    nekoEl.style.width = '32px';
    nekoEl.style.height = '32px';
    nekoEl.style.position = 'fixed';
    // Clickable so the cat can meow back. It keeps ~48px away from the cursor,
    // so it does not swallow clicks aimed at the page.
    nekoEl.style.pointerEvents = 'auto';
    nekoEl.style.cursor = 'pointer';
    nekoEl.style.imageRendering = 'pixelated';
    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
    nekoEl.style.zIndex = 2147483647;

    // Absolute so it still resolves if document.currentScript is unavailable
    // (the script is injected by next/script, not parsed inline).
    let nekoFile = '/oneko/oneko.gif';
    const curScript =
      document.currentScript ||
      document.querySelector('script[src*="oneko.js"]');
    if (curScript && curScript.dataset.cat) {
      nekoFile = curScript.dataset.cat;
    }
    if (curScript && curScript.dataset.sound === 'false') {
      soundEnabled = false;
    }
    nekoEl.style.backgroundImage = `url(${nekoFile})`;

    document.body.appendChild(nekoEl);

    nekoEl.addEventListener('click', function () {
      // Wake the cat up and startle it, the way a real one would react.
      stopPurring();
      resetIdleAnimation();
      idleTime = 0;
      setSprite('alert', 0);
      meow();
    });

    document.addEventListener('mousemove', function (event) {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    });

    window.requestAnimationFrame(onAnimationFrame);
  }

  let lastFrameTimestamp;

  function onAnimationFrame(timestamp) {
    // Stops execution if the neko element is removed from DOM
    if (!nekoEl.isConnected) {
      return;
    }
    if (!lastFrameTimestamp) {
      lastFrameTimestamp = timestamp;
    }
    if (timestamp - lastFrameTimestamp > 100) {
      lastFrameTimestamp = timestamp;
      frame();
    }
    window.requestAnimationFrame(onAnimationFrame);
  }

  function setSprite(name, frame) {
    const sprite = spriteSets[name][frame % spriteSets[name].length];
    nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
  }

  function resetIdleAnimation() {
    // Any idle animation ending means the cat is no longer asleep.
    stopPurring();
    idleAnimation = null;
    idleAnimationFrame = 0;
  }

  function idle() {
    idleTime += 1;

    // every ~ 20 seconds
    if (
      idleTime > 10 &&
      Math.floor(Math.random() * 200) == 0 &&
      idleAnimation == null
    ) {
      let avalibleIdleAnimations = ['sleeping', 'scratchSelf'];
      if (nekoPosX < 32) {
        avalibleIdleAnimations.push('scratchWallW');
      }
      if (nekoPosY < 32) {
        avalibleIdleAnimations.push('scratchWallN');
      }
      if (nekoPosX > window.innerWidth - 32) {
        avalibleIdleAnimations.push('scratchWallE');
      }
      if (nekoPosY > window.innerHeight - 32) {
        avalibleIdleAnimations.push('scratchWallS');
      }
      idleAnimation =
        avalibleIdleAnimations[
          Math.floor(Math.random() * avalibleIdleAnimations.length)
        ];
    }

    switch (idleAnimation) {
      case 'sleeping':
        if (idleAnimationFrame < 8) {
          setSprite('tired', 0);
          break;
        }
        setSprite('sleeping', Math.floor(idleAnimationFrame / 4));
        // Purr for as long as the cat is actually asleep.
        startPurring();
        if (idleAnimationFrame > 192) {
          resetIdleAnimation();
        }
        break;
      case 'scratchWallN':
      case 'scratchWallS':
      case 'scratchWallE':
      case 'scratchWallW':
      case 'scratchSelf':
        setSprite(idleAnimation, idleAnimationFrame);
        if (idleAnimationFrame > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite('idle', 0);
        return;
    }
    idleAnimationFrame += 1;
  }

  function frame() {
    frameCount += 1;
    const diffX = nekoPosX - mousePosX;
    const diffY = nekoPosY - mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < nekoSpeed || distance < 48) {
      idle();
      return;
    }

    // The cursor moved off — the cat is awake and chasing again.
    stopPurring();
    idleAnimation = null;
    idleAnimationFrame = 0;

    if (idleTime > 1) {
      setSprite('alert', 0);
      // count down after being alerted before moving
      idleTime = Math.min(idleTime, 7);
      idleTime -= 1;
      return;
    }

    let direction;
    direction = diffY / distance > 0.5 ? 'N' : '';
    direction += diffY / distance < -0.5 ? 'S' : '';
    direction += diffX / distance > 0.5 ? 'W' : '';
    direction += diffX / distance < -0.5 ? 'E' : '';
    setSprite(direction, frameCount);

    nekoPosX -= (diffX / distance) * nekoSpeed;
    nekoPosY -= (diffY / distance) * nekoSpeed;

    nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
    nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

    nekoEl.style.left = `${nekoPosX - 16}px`;
    nekoEl.style.top = `${nekoPosY - 16}px`;
  }

  init();
})();
