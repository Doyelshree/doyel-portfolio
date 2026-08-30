/*
 * CUSTOMIZATION EXAMPLE
 *
 * Want to customize this portfolio for yourself? Here's how easy it is:
 *
 * 1. Update your personal info:
 *    name: "Your Name"
 *    title: "Your Professional Title"
 *    avatar: "/path/to/your/image.jpg"
 *
 * 2. Add your skills:
 *    skills: [
 *      { name: "Python", href: "https://python.org", component: "Python" },
 *      { name: "React", href: "https://react.dev", component: "ReactIcon" },
 *      { name: "Node.js", href: "https://nodejs.org", component: "NodeJs" },
 *    ]
 *
 * 3. Write your description using the template:
 *    template: "I'm a **passionate developer** who loves building apps with {skills:0} and {skills:1}. I specialize in **web development** and enjoy working with {skills:2}."
 *
 * 4. Update your social links:
 *    Just change the values in `socialHandles` below — every other config
 *    file (Meta, GitHub graph, CTA, chat assistant) reads from it.
 *
 * That's it! Your portfolio will automatically update with your information.
 */
import Github from '@/components/svgs/Github';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';
import AWS from '@/components/technologies/AWS';
import C from '@/components/technologies/C';
import CSS from '@/components/technologies/CSS';
import Docker from '@/components/technologies/Docker';
import Firebase from '@/components/technologies/Firebase';
import Flask from '@/components/technologies/Flask';
import Git from '@/components/technologies/Git';
import Html from '@/components/technologies/Html';
import Java from '@/components/technologies/Java';
import JavaScript from '@/components/technologies/JavaScript';
import Linux from '@/components/technologies/Linux';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Python from '@/components/technologies/Python';
import ReactIcon from '@/components/technologies/ReactIcon';
import SpringBoot from '@/components/technologies/SpringBoot';
import TailwindCss from '@/components/technologies/TailwindCss';
// Technology Components
import TypeScript from '@/components/technologies/TypeScript';

/*
 * SINGLE SOURCE OF TRUTH FOR YOUR HANDLES.
 * Every other config file derives its links from here.
 */
export const socialHandles = {
  github: 'Doyelshree',
  linkedin: 'doyelshreebhui',
  email: 'doyelshreeb@gmail.com',
};

export const githubUrl = `https://github.com/${socialHandles.github}`;
export const linkedinUrl = `https://www.linkedin.com/in/${socialHandles.linkedin}/`;

// Component mapping for skills
export const skillComponents = {
  Java: Java,
  SpringBoot: SpringBoot,
  Python: Python,
  ReactIcon: ReactIcon,
  TypeScript: TypeScript,
  JavaScript: JavaScript,
  AWS: AWS,
  Docker: Docker,
  Firebase: Firebase,
  Flask: Flask,
  Git: Git,
  Linux: Linux,
  PostgreSQL: PostgreSQL,
  TailwindCss: TailwindCss,
  Html: Html,
  CSS: CSS,
  C: C,
};

export const heroConfig = {
  // Personal Information
  name: 'Doyelshree',
  title: 'A Full Stack Developer.',
  avatar: '/assets/logo.png',

  // Skills Configuration
  skills: [
    {
      name: 'Java',
      href: 'https://www.java.com/',
      component: 'Java',
    },
    {
      name: 'Spring Boot',
      href: 'https://spring.io/projects/spring-boot',
      component: 'SpringBoot',
    },
    {
      name: 'React',
      href: 'https://react.dev/',
      component: 'ReactIcon',
    },
    {
      name: 'Python',
      href: 'https://www.python.org/',
      component: 'Python',
    },
  ],

  // Description Configuration
  description: {
    template:
      'I build full stack products with {skills:0}, {skills:1}, {skills:2}, and {skills:3}. An <b>IT graduate</b> of Techno Main Salt Lake, with a soft spot for <b>machine learning</b> and evolutionary computation.',
  },

  // Buttons Configuration
  buttons: [
    {
      variant: 'outline',
      text: 'Resume / CV',
      href: '/resume',
      icon: 'CV',
    },
    {
      variant: 'default',
      text: 'Get in touch',
      href: '/contact',
      icon: 'Chat',
    },
  ],
};

// Social Links Configuration
export const socialLinks = [
  {
    name: 'LinkedIn',
    href: linkedinUrl,
    icon: <LinkedIn />,
  },
  {
    name: 'Github',
    href: githubUrl,
    icon: <Github />,
  },
  {
    name: 'Email',
    href: `mailto:${socialHandles.email}`,
    icon: <Mail />,
  },
];
