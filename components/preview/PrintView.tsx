"use client";

import React, { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { useActiveCVData } from '@/store/useCVStore';
import ResumePreview from './ResumePreview';
import { ArrowLeft, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

const PrintView: React.FC = () => {
  const setView = useAppStore((state) => state.setView);
  const data = useActiveCVData();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${data.personal.fullName || 'resume'} - KertasKerja`,
  });
  
  useEffect(() => {
    document.body.style.backgroundColor = '#f1f5f9';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center py-10 print:p-0 print:bg-white">
      {/* Print Control Bar (Hidden on Print) */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl border border-white z-50 no-print">
        <button 
          onClick={() => setView('editor')}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold text-sm transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Editor
        </button>
        <div className="w-px h-6 bg-slate-200" />
        <button 
          onClick={() => handlePrint()}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          <Printer size={18} />
          Print Now
        </button>
      </div>

      {/* The isolated Resume Card */}
      <div className="mt-12 shadow-2xl print:m-0 print:shadow-none">
        <ResumePreview ref={resumeRef} />
      </div>

      <p className="mt-8 text-slate-400 text-xs font-medium no-print">
        Standard A4 Preview (210mm x 297mm)
      </p>
    </div>
  );
};

export default PrintView;
