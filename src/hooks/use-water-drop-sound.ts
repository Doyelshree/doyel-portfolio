'use client';

import { useCallback } from 'react';

// One context for the whole page. Browsers cap how many AudioContexts a
// document may create, so making a fresh one per toggle would go silent after
// a handful of clicks.
let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;

  if (audioContext === null) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextClass) return null;

    audioContext = new AudioContextClass();
  }

  // Autoplay policy suspends the context until a user gesture. Every caller
  // here is inside a click handler, so resuming is allowed.
  if (audioContext.state === 'suspended') {
    void audioContext.resume();
  }

  return audioContext;
};

/**
 * Plays a short synthesised water droplet — the "plink" of a drop hitting
 * still water. Synthesised rather than loaded from a file so it costs no
 * network request and no asset.
 */
export const useWaterDropSound = () => {
  const playWaterDrop = useCallback(() => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);

      // A droplet reads as a droplet because its pitch sweeps sharply upward
      // as the cavity it makes in the water collapses.
      const drop = ctx.createOscillator();
      const dropGain = ctx.createGain();

      drop.type = 'sine';
      drop.frequency.setValueAtTime(620, now);
      drop.frequency.exponentialRampToValueAtTime(1750, now + 0.085);

      dropGain.gain.setValueAtTime(0.0001, now);
      dropGain.gain.exponentialRampToValueAtTime(0.28, now + 0.008);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);

      drop.connect(dropGain);
      dropGain.connect(master);

      // A quieter low layer underneath gives the plink some body, so it lands
      // as a drop rather than a beep.
      const body = ctx.createOscillator();
      const bodyGain = ctx.createGain();

      body.type = 'sine';
      body.frequency.setValueAtTime(190, now);
      body.frequency.exponentialRampToValueAtTime(430, now + 0.07);

      bodyGain.gain.setValueAtTime(0.0001, now);
      bodyGain.gain.exponentialRampToValueAtTime(0.1, now + 0.01);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      body.connect(bodyGain);
      bodyGain.connect(master);

      drop.start(now);
      drop.stop(now + 0.3);
      body.start(now);
      body.stop(now + 0.18);

      // Release the nodes once the tail has finished.
      drop.onended = () => {
        master.disconnect();
      };
    } catch (error) {
      // Silently fail if Web Audio is unavailable or blocked.
      console.debug('Water drop sound not supported:', error);
    }
  }, []);

  return { playWaterDrop };
};
