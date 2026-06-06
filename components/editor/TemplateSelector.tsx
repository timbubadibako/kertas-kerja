'use client';

import React from 'react';
import { useCVStore, useActiveCV, useActiveCVData } from '@/store/useCVStore';
import { TEMPLATES } from '@/components/preview/templates/TemplateRegistry';
import { Check, Eye } from 'lucide-react';

const TemplateSelector: React.FC = () => {
  const activeCV = useActiveCV();
  const data = useActiveCVData();
  const setTemplate = useCVStore((state) => state.setTemplate);
  const currentTemplateId = activeCV?.templateId || 'template-1';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
          <Eye className="text-white" size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 font-sans">Choose Design</h2>
          <p className="text-slate-500 text-sm font-medium">Instantly switch between 9 professional layouts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {TEMPLATES.map((template) => {
          const isActive = currentTemplateId === template.id;
          const TemplateComponent = template.component;
          
          return (
            <button
              key={template.id}
              onClick={() => setTemplate(template.id)}
              className={`group relative flex flex-col text-left rounded-[32px] border-2 transition-all duration-300 overflow-hidden bg-white ${
                isActive
                  ? 'border-indigo-600 ring-[6px] ring-indigo-50 shadow-2xl scale-[1.02] z-10'
                  : 'border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-1'
              }`}
            >
              {/* LIVE PREVIEW THUMBNAIL */}
              <div className="relative aspect-[3/4] w-full bg-slate-50 overflow-hidden border-b border-slate-100 flex justify-center">
                {/* Scale Container */}
                <div 
                  className="absolute origin-top"
                  style={{ 
                    width: '210mm', 
                    height: '297mm',
                    // Calculate scale: fit perfectly
                    transform: 'scale(0.3)', // Increased scale for better visibility
                    top: '20px', // Small gap from top
                    pointerEvents: 'none', 
                    userSelect: 'none',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <TemplateComponent data={data} />
                </div>

                {/* Selection Overlay */}
                {isActive && (
                  <div className="absolute inset-0 bg-indigo-600/5 backdrop-blur-[1px] transition-all" />
                )}
                
                {/* Hover Indicator */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/2 transition-colors" />
              </div>

              {/* Template Info */}
              <div className="p-5 relative">
                <div className="flex justify-between items-center mb-1.5">
                  <h3 className={`font-black uppercase tracking-tight text-sm ${isActive ? 'text-indigo-600' : 'text-slate-800'}`}>
                    {template.name}
                  </h3>
                  {isActive && (
                    <div className="bg-indigo-600 text-white p-1 rounded-full shadow-lg shadow-indigo-200 animate-in zoom-in-50 duration-300">
                      <Check size={12} strokeWidth={4} />
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed line-clamp-2">
                  {template.description}
                </p>
              </div>

              {/* Status Badge */}
              {isActive && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">
                  Active
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateSelector;
