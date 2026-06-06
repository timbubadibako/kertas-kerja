import React from 'react';
import { TemplateId, CVData } from '@/types/cv';
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';
import Template4 from './Template4';
import Template5 from './Template5';
import Template6 from './Template6';
import Template7 from './Template7';
import Template8 from './Template8';
import Template9 from './Template9';

export interface TemplateMetadata {
  id: TemplateId;
  name: string;
  description: string;
  thumbnail: string;
  component: React.FC<{ data: CVData }>;
}

export const TEMPLATES: TemplateMetadata[] = [
  {
    id: 'template-1',
    name: 'Template 1',
    description: 'Clean sans-serif design with a traditional ATS-friendly layout.',
    thumbnail: '/templates/template-1.png',
    component: Template1,
  },
  {
    id: 'template-2',
    name: 'Template 2',
    description: 'Elegant serif typography with centered header and bold sections.',
    thumbnail: '/templates/template-2.png',
    component: Template2,
  },
  {
    id: 'template-3',
    name: 'Template 3',
    description: 'Bold impact with dark header and structured two-column content.',
    thumbnail: '/templates/template-3.png',
    component: Template3,
  },
  {
    id: 'template-4',
    name: 'Template 4',
    description: 'Executive style with refined spacing and professional serif fonts.',
    thumbnail: '/templates/template-4.png',
    component: Template4,
  },
  {
    id: 'template-5',
    name: 'Template 5',
    description: 'Tech-focused monospaced design inspired by code editors and terminals.',
    thumbnail: '/templates/template-5.png',
    component: Template5,
  },
  {
    id: 'template-6',
    name: 'Template 6',
    description: 'Modern approachable design with rounded elements and soft borders.',
    thumbnail: '/templates/template-6.png',
    component: Template6,
  },
  {
    id: 'template-7',
    name: 'Template 7',
    description: 'Creative split-column layout with high visual hierarchy.',
    thumbnail: '/templates/template-7.png',
    component: Template7,
  },
  {
    id: 'template-8',
    name: 'Template 8',
    description: 'High-density academic layout focused on research and appointments.',
    thumbnail: '/templates/template-8.png',
    component: Template8,
  },
  {
    id: 'template-9',
    name: 'Template 9',
    description: 'Minimalist centered layout with focus on typography and clear sections.',
    thumbnail: '/templates/template-9.png',
    component: Template9,
  },
];

export const getTemplateComponent = (id: TemplateId) => {
  const template = TEMPLATES.find((t) => t.id === id);
  return template?.component || Template1;
};
