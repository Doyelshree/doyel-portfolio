/*
 * Certificates & Achievements
 *
 * `file` points at an image in /public. Drop your certificate scans into
 * public/certificates/ and update the paths below.
 */
export const certificates = [
  {
    file: '/certificates/sih-2024.png',
    title: 'Smart India Hackathon 2024 - 2nd Place (500+ teams)',
    issuer: 'Smart India Hackathon, Punjab',
    date: '01-12-2025',
  },
  {
    file: '/certificates/ieee-research-intern.png',
    title: 'Research Internship - Genetic Algorithms in Drug Design',
    issuer: 'IEEE Computational Intelligence Society',
    date: '31-07-2025',
  },
  {
    file: '/certificates/ICTIS.png',
    title: 'Research Paper - An IoT-Enabled System for Predictive Analysis of Cardiovascular Disease',
    issuer: 'ICTIS Springer',
    date: '13-09-2025',
  },
  {
    file: '/certificates/AICCT.png',
    title: 'Research Paper - An IoT-Enabled System for Predictive Analysis of Cardiovascular Disease',
    issuer: 'AICCT',
    date: '04-04-2026',
  },
  /*
   * The two CVD publication certificates. Entries stay dormant until the scan
   * exists at the path below — the certificates page skips any configured file
   * it can't find on disk, so nothing renders broken in the meantime.
   *
   * Drop the scans in as:
   *   public/certificates/ictis-2026-cvd-paper.png
   *   public/certificates/aicct-cvd-paper.png
   * and add a `date:` to each once you have the presentation date.
   */
];

const achievementsConfig = {
  certificates,
};

export default achievementsConfig;
