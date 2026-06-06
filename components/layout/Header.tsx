"use client";

import React from 'react';
import { useCVStore, useActiveCVData } from '../../store/useCVStore';
import { useAppStore } from '../../store/useAppStore';
import { Download, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  resumeRef?: React.RefObject<HTMLDivElement | null>;
}

const Header: React.FC<HeaderProps> = ({ resumeRef }) => {
  const data = useActiveCVData();
  const activeVersionId = useCVStore((state) => state.activeVersionId);
  const versions = useCVStore((state) => state.versions);
  const activeVersion = versions.find(v => v.id === activeVersionId);
  const setView = useAppStore((state) => state.setView);
  
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 sticky top-0 z-50 app-header no-print">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setView('dashboard')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          title="Back to Dashboard"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('dashboard')}>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">K</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hidden sm:block">
            KertasKerja
          </h1>
        </div>
        {activeVersion && (
          <div className="ml-4 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100 uppercase tracking-wider max-w-[200px] truncate">
            Version: {activeVersion.name}
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setView('print')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm flex items-center gap-2 min-w-[140px] justify-center"
        >
          <Download size={18} />
          <span>Download PDF</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
