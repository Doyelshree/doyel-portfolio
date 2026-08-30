import Container from '@/components/common/Container';
import About from '@/components/landing/About';
import CTA from '@/components/landing/CTA';
import Experience from '@/components/landing/Experience';
import Github from '@/components/landing/Github';
import Hero from '@/components/landing/Hero';
import Journey from '@/components/landing/Journey';
import Work from '@/components/landing/Projects';
import Research from '@/components/landing/Research';
import React from 'react';

export default function page() {
  return (
    <Container className="min-h-screen py-16">
      <Hero />
      <Experience />
      <Work />
      <Research />
      <About />
      <Github />
      <CTA />
      <Journey />
    </Container>
  );
}
