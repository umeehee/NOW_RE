/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProgramItem {
  id: string;
  category: string;
  categoryName: string;
  title: string;
  description: string;
  features: string[];
  durationRecommended: string;
  targetRecommended: string;
  syllabus: { step: string; content: string }[];
}

export interface CaseStudy {
  id: string;
  title: string;
  institution: string;
  category: string;
  image: string;
  satisfaction: number;
  target: string;
  duration: string;
  highlights: string[];
  feedback: string;
  feedbackAuthor: string;
  schedule: { day: string; title: string; desc: string }[];
  blogUrl?: string;
}

export interface Inquiry {
  id: string;
  institutionName: string;
  applicantName: string;
  phone: string;
  email: string;
  target: string;
  estimatedCount: number;
  message: string;
  createdAt: string;
  status: 'pending' | 'assigned' | 'reviewing' | 'completed';
  assignedConsultant?: string;
  notes?: string;
}
