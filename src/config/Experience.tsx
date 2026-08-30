import Git from '@/components/technologies/Git';
import Linux from '@/components/technologies/Linux';
import Python from '@/components/technologies/Python';

import { githubUrl } from './Hero';

export interface Technology {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  image: string;
  description: string[];
  startDate: string;
  endDate: string;
  website: string;
  x?: string;
  linkedin?: string;
  github?: string;
  technologies: Technology[];
  isCurrent: boolean;
  isBlur?: boolean;
}

export const experiences: Experience[] = [
  {
    isCurrent: false,
    company: 'IEEE Computational Intelligence Society',
    position: 'Research Intern',
    location: 'Kolkata, WB',
    image: '/company/ieee.png',
    description: [
      'Studied *evolutionary computation* techniques for optimizing ligand structures using *Genetic Algorithms (GAs)* in drug design.',
      'Minimized average interaction energy between ligand molecules and protein active sites using a *variable-length tree model*.',
      'Developed and published a complete implementation of the *NBGA algorithm* using *TSPLIB* datasets to generate benchmark graphs and validate results.',
      'Co-authored the resulting research paper on the approach and its benchmark results.',
    ],
    startDate: 'June 2025',
    endDate: 'July 2025',
    technologies: [
      {
        name: 'Python',
        href: 'https://www.python.org/',
        icon: <Python />,
      },
      {
        name: 'Git',
        href: 'https://git-scm.com/',
        icon: <Git />,
      },
      {
        name: 'Linux',
        href: 'https://www.linux.org/',
        icon: <Linux />,
      },
    ],
    website: 'https://cis.ieee.org/',
    github: githubUrl,
  },
];
