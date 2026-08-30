'use client';

import { cn } from '@/lib/utils';
import { type Project } from '@/types/project';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';

import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  className?: string;
}

export function ProjectList({ projects, className }: ProjectListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (projects.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No projects found.</p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2', className)}>
      {projects.map((project: Project, idx: number) => (
        <div
          key={project.title}
          className="group relative block h-full w-full p-2"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 block h-full w-full rounded-3xl bg-neutral-200 dark:bg-slate-800/[0.8]"
                layoutId="projectHoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div className="relative z-20 h-full">
            <ProjectCard project={project} />
          </div>
        </div>
      ))}
    </div>
  );
}
