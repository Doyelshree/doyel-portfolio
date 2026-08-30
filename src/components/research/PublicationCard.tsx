import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { about } from '@/config/About';
import { type Publication } from '@/config/Research';
import React from 'react';

import { TrackedLink } from '../common/TrackedLink';
import ArrowUUpRight from '../svgs/ArrowUUpRight';

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  const { title, authors, venue, year, role, summary, highlights, doi, url } =
    publication;

  // Anything that resolves to a real destination becomes a button; a paper with
  // no public link yet simply renders without one.
  const links = [
    { label: 'DOI', href: doi },
    { label: 'Read paper', href: url },
    { label: 'PDF', href: publication.pdf },
  ].filter((link): link is { label: string; href: string } => !!link.href);

  return (
    <Card className="group h-full w-full gap-0 rounded-2xl border-gray-100 p-0 shadow-none transition-all hover:border-neutral-300 dark:border-gray-800 dark:hover:border-slate-700">
      <CardHeader className="gap-3 px-6 pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{role}</Badge>
          <Badge variant="outline">
            {venue} · {year}
          </Badge>
        </div>

        <h3 className="group-hover:text-primary text-xl leading-tight font-semibold transition-colors">
          {title}
        </h3>

        <p className="text-secondary text-sm leading-relaxed">
          {authors.map((author, index) => (
            <React.Fragment key={author}>
              {index > 0 && ', '}
              {author === about.name ? (
                <span className="text-foreground font-semibold">{author}</span>
              ) : (
                author
              )}
            </React.Fragment>
          ))}
        </p>
      </CardHeader>

      <CardContent className="space-y-4 px-6 pt-4 pb-6">
        <p className="text-secondary leading-relaxed">{summary}</p>

        <div className="flex flex-wrap gap-2">
          {highlights.map((highlight) => (
            <Badge key={highlight} variant="outline" className="font-normal">
              {highlight}
            </Badge>
          ))}
        </div>

        {links.length > 0 && (
          <div className="flex flex-wrap items-center gap-4 pt-1">
            {links.map((link) => (
              <TrackedLink
                key={link.label}
                href={link.href}
                target="_blank"
                className="text-secondary hover:text-primary flex items-center gap-1 text-sm underline-offset-4 transition-colors hover:underline"
                track={{
                  name: 'external_link_click',
                  data: {
                    url: link.href,
                    text: link.label,
                    location: 'publication_card',
                  },
                }}
              >
                {link.label} <ArrowUUpRight className="size-4" />
              </TrackedLink>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
