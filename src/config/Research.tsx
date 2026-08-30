/*
 * Research & Publications
 *
 * Both papers came out of the final-year CVD work with the IT department at
 * Techno Main Salt Lake.
 *
 * TODO: confirm before deploying —
 *   - `venue` for both is taken from the manuscript filenames (AICCT,
 *     "1461-ICTIS 2026"), not from the papers themselves. Replace with the
 *     conference's full name once you have it.
 *   - `year` is set to 2026 for both. Correct AICCT if it was 2025.
 *   - `doi` / `url` / `pdf` are left undefined so no dead links render. Fill
 *     any of them in and the card grows the matching button automatically.
 */

export interface Publication {
  title: string;
  /** In publication order. The site owner's name is emphasised automatically. */
  authors: string[];
  venue: string;
  year: string;
  /** 'First author' | 'Co-author' — rendered as the leading badge. */
  role: string;
  /** Two or three sentences, plain language. */
  summary: string;
  /** Short, concrete results. Rendered as badges. */
  highlights: string[];
  /** Publisher's page — preferred over a self-hosted PDF. */
  doi?: string;
  url?: string;
  /** Only host a PDF you have the right to distribute. See README notes. */
  pdf?: string;
}

export const publications: Publication[] = [
  {
    title:
      'An IoT-Enabled System for Predictive Analysis of Cardiovascular Disease',
    authors: [
      'Harsh Vardhan',
      'Harsh Vikramaditya',
      'Doyelshree Bhui',
      'Shilpi Basak',
      'Soumitra Sasmal',
      'Subhajit Bhowmick',
      'Ishan Ghosh',
    ],
    venue: 'ICTIS 2026',
    year: '2026',
    role: 'Co-author',
    summary:
      'A GridSearch-tuned SVM over the 14-feature Cleveland Heart Disease dataset, paired with SHAP attribution so a clinician can see why any single prediction was made. The model is small enough to run inference on bare-metal edge hardware, which the deep-learning baselines it was benchmarked against are not.',
    highlights: [
      '93.33% accuracy, AUC 0.97',
      '42 KB model, <10 ms on Arduino Uno',
      'Beat XGBoost (90.00%) and 1-D CNN (88.33%)',
      'SHAP per-patient explainability',
    ],
  },
  {
    title: 'Predictive Analysis of Cardiovascular Disease — A Future Direction',
    authors: [
      'Doyelshree Bhui',
      'Shilpi Basak',
      'Harsh Vikramaditya',
      'Harsh Vardhan',
      'Soumitra Sasmal',
    ],
    venue: 'AICCT',
    year: '2026',
    role: 'First author',
    summary:
      'A survey of machine learning and IoT approaches to cardiovascular disease detection, tracing the field from classical classifiers through hybrid deep learning to federated learning. It closes by proposing a privacy-preserving CNN + attention-BiGRU pipeline that keeps raw patient data on the edge device.',
    highlights: [
      'Surveys 14 prior ML/IoT systems',
      'CNN + attention-BiGRU pipeline',
      'Federated learning for HIPAA/GDPR compliance',
      '70,000+ record Kaggle risk-factor dataset',
    ],
  },
];

const researchConfig = {
  publications,
};

export default researchConfig;
