'use client';

import React from 'react';
import { useCVStore } from '@/store/useCVStore';
import PersonalInfoForm from './PersonalInfoForm';
import WorkForm from './WorkForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import TemplateSelector from './TemplateSelector';

const SectionRenderer: React.FC = () => {
  const activeSection = useCVStore((state) => state.activeSection);

  switch (activeSection) {
    case 'templates':
      return <TemplateSelector />;
    case 'personal':
      return <PersonalInfoForm />;
    case 'work':
      return <WorkForm />;
    case 'education':
      return <EducationForm />;
    case 'skills':
      return <SkillsForm />;
    default:
      return <PersonalInfoForm />;
  }
};

export default SectionRenderer;
