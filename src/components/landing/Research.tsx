import { type Publication, publications } from '@/config/Research';
import { Link } from 'next-view-transitions';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { PublicationCard } from '../research/PublicationCard';
import { Button } from '../ui/button';

export default function Research() {
  if (publications.length === 0) return null;

  return (
    <Container className="mt-20">
      <SectionHeading subHeading="Published" heading="Research" />

      <div className="mt-8 flex flex-col gap-4">
        {publications.map((publication: Publication) => (
          <PublicationCard key={publication.title} publication={publication} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          track={{
            name: 'button_click',
            data: {
              buttonId: 'view_paper_certificates',
              section: 'research',
            },
          }}
        >
          <Link href="/journey/certificates">View certificates</Link>
        </Button>
      </div>
    </Container>
  );
}
