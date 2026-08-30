import AWS from '@/components/technologies/AWS';
import CSS from '@/components/technologies/CSS';
import Docker from '@/components/technologies/Docker';
import Firebase from '@/components/technologies/Firebase';
import Flask from '@/components/technologies/Flask';
import Html from '@/components/technologies/Html';
import Java from '@/components/technologies/Java';
import JavaScript from '@/components/technologies/JavaScript';
import Python from '@/components/technologies/Python';
import ReactIcon from '@/components/technologies/ReactIcon';
import SpringBoot from '@/components/technologies/SpringBoot';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import { Project } from '@/types/project';

import { githubUrl } from './Hero';

// Farmora and alien-invaders are confirmed. The two slugs below them are
// TODO: confirm they match your real repo names on github.com/Doyelshree.
const repo = (name: string) => `${githubUrl}/${name}`;

export const projects: Project[] = [
  {
    title: 'Smart India Hackathon 2024',
    description:
      'Mentorship platform that placed 2nd among 500+ teams — mentor-mentee matching at 92% compatibility accuracy, real-time scheduling, and AI-driven career guidance for 1000+ potential users',
    image: '/project/sih-2024.png',
    link: repo('smart-india-hackathon-2024'),
    technologies: [
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Flask', icon: <Flask key="flask" /> },
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'Docker', icon: <Docker key="docker" /> },
      { name: 'Firebase', icon: <Firebase key="firebase" /> },
    ],
    github: repo('smart-india-hackathon-2024'),
    live: repo('smart-india-hackathon-2024'),
    details: true,
    projectDetailsPageSlug: '/projects/smart-india-hackathon-2024',
    isWorking: true,
  },
  {
    title: 'AWS S3 File Uploader',
    description:
      'Full-stack file management app pairing a Spring Boot API with a React client, backed by AWS S3 for secure uploads with authentication and validation',
    image: '/project/aws-s3-uploader.png',
    link: repo('aws-s3-file-uploader'),
    technologies: [
      { name: 'Java', icon: <Java key="java" /> },
      { name: 'Spring Boot', icon: <SpringBoot key="springboot" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'AWS S3', icon: <AWS key="aws" /> },
    ],
    github: repo('aws-s3-file-uploader'),
    live: repo('aws-s3-file-uploader'),
    details: true,
    projectDetailsPageSlug: '/projects/aws-s3-file-uploader',
    isWorking: true,
  },
  {
    title: 'Farmora',
    description:
      'Agricultural disease detection platform trained on 10,000+ labeled plant images, hitting 88% accuracy across 38 disease classes, with a Gemini-powered chatbot for real-time crop advice',
    image: '/project/farmora.png',
    link: repo('Farmora'),
    technologies: [
      { name: 'Python', icon: <Python key="python" /> },
      { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
      { name: 'HTML', icon: <Html key="html" /> },
      { name: 'CSS', icon: <CSS key="css" /> },
    ],
    github: repo('Farmora'),
    live: repo('Farmora'),
    details: true,
    projectDetailsPageSlug: '/projects/farmora',
    isWorking: true,
  },
  {
    title: 'Alien Invaders',
    description:
      'Responsive arcade game built on HTML5 Canvas with collision detection, scoring, 5 enemy types, and 3 difficulty levels designed around OOP principles',
    image: '/project/alien-invaders.png',
    link: repo('alien-invaders'),
    technologies: [
      { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
      { name: 'HTML5', icon: <Html key="html" /> },
      { name: 'CSS', icon: <CSS key="css" /> },
    ],
    github: repo('alien-invaders'),
    live: repo('alien-invaders'),
    details: true,
    projectDetailsPageSlug: '/projects/alien-invaders',
    isWorking: true,
  },
];
