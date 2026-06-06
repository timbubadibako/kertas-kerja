'use client';

import React, { useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import Dashboard from '@/components/dashboard/Dashboard';
import MainLayout from '@/components/layout/MainLayout';
import SectionRenderer from '@/components/editor/SectionRenderer';
import ResumePreview from '@/components/preview/ResumePreview';
import PrintView from '@/components/preview/PrintView';

export default function Home() {
  const { view } = useAppStore();
  const resumeRef = useRef<HTMLDivElement>(null);

  if (view === 'dashboard') {
    return <Dashboard />;
  }

  if (view === 'print') {
    return <PrintView />;
  }

  return (
    <MainLayout 
      preview={<ResumePreview ref={resumeRef} />}
      resumeRef={resumeRef}
    >
      <div className="px-8 py-8">
        <SectionRenderer />
      </div>
    </MainLayout>
  );
}
