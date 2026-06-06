'use client';

import React from 'react';
import { useCVStore, useActiveCVData } from '@/store/useCVStore';
import { Plus, Trash2, Briefcase, ChevronRight } from 'lucide-react';
import { FormHeader, FormInput } from './FormComponents';

const WorkForm: React.FC = () => {
  const work = useActiveCVData().work || [];
  const addWork = useCVStore((state) => state.addWork);
  const updateWork = useCVStore((state) => state.updateWork);
  const removeWork = useCVStore((state) => state.removeWork);
  const setActiveSection = useCVStore((state) => state.setActiveSection);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
      <FormHeader 
        title="Work Experience" 
        subtitle="List your professional journey and key achievements."
        icon={Briefcase}
        action={
          <button
            onClick={addWork}
            className="group flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Plus size={18} className="group-hover:scale-110 transition-transform" />
            Add Experience
          </button>
        }
      />

      {work.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200 cursor-pointer hover:border-indigo-300 transition-all group" onClick={addWork}>
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100 group-hover:scale-110 transition-all">
            <Briefcase size={24} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No experience added yet</p>
          <p className="text-slate-300 text-[11px] mt-2 font-medium">Click "Add Experience" to showcase your career path</p>
        </div>
      ) : (
        <div className="space-y-6">
          {work.map((exp, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative group hover:border-indigo-100 transition-all"
            >
              <button
                onClick={() => removeWork(index)}
                className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                title="Remove Entry"
              >
                <Trash2 size={20} />
              </button>

              <div className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Position / Role"
                    value={exp.position}
                    onChange={(e) => updateWork(index, { position: e.target.value })}
                    placeholder="e.g. Senior Software Engineer"
                  />
                  <FormInput
                    label="Company / Institution"
                    value={exp.company}
                    onChange={(e) => updateWork(index, { company: e.target.value })}
                    placeholder="e.g. Google, Inc."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Start Date"
                    value={exp.startDate}
                    onChange={(e) => updateWork(index, { startDate: e.target.value })}
                    placeholder="e.g. Jan 2020"
                  />
                  <FormInput
                    label="End Date"
                    value={exp.endDate}
                    onChange={(e) => updateWork(index, { endDate: e.target.value })}
                    placeholder="e.g. Present"
                  />
                </div>

                <FormInput
                  as="textarea"
                  label="Description / Achievements"
                  rows={4}
                  value={exp.description.join('\n')}
                  onChange={(e) => updateWork(index, { description: e.target.value.split('\n') })}
                  placeholder="Describe your responsibilities and impact..."
                  className="resize-none leading-relaxed"
                  helperText="Use line breaks for multiple points."
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end">
        <button
          type="button"
          onClick={() => setActiveSection('education')}
          className="group flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100"
        >
          Education Section
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default WorkForm;
