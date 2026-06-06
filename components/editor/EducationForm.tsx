'use client';

import React from 'react';
import { useCVStore, useActiveCVData } from '@/store/useCVStore';
import { Plus, Trash2, GraduationCap, ChevronRight } from 'lucide-react';
import { FormHeader, FormInput } from './FormComponents';

const EducationForm: React.FC = () => {
  const education = useActiveCVData().education || [];
  const addEducation = useCVStore((state) => state.addEducation);
  const updateEducation = useCVStore((state) => state.updateEducation);
  const removeEducation = useCVStore((state) => state.removeEducation);
  const setActiveSection = useCVStore((state) => state.setActiveSection);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
      <FormHeader 
        title="Education" 
        subtitle="Your academic qualifications and lifelong learning."
        icon={GraduationCap}
        action={
          <button
            onClick={addEducation}
            className="group flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Plus size={18} className="group-hover:scale-110 transition-transform" />
            Add Education
          </button>
        }
      />

      {education.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200 cursor-pointer hover:border-indigo-300 transition-all group" onClick={addEducation}>
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100 group-hover:scale-110 transition-all">
            <GraduationCap size={24} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
          </div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No academic history yet</p>
          <p className="text-slate-300 text-[11px] mt-2 font-medium">Click "Add Education" to list your degrees or certifications</p>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative group hover:border-indigo-100 transition-all"
            >
              <button
                onClick={() => removeEducation(index)}
                className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                title="Remove Entry"
              >
                <Trash2 size={20} />
              </button>

              <div className="grid grid-cols-1 gap-6">
                <FormInput
                  label="Degree / Certification"
                  value={edu.degree}
                  onChange={(e) => updateEducation(index, { degree: e.target.value })}
                  placeholder="e.g. Bachelor of Computer Science"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="School / University"
                    value={edu.school}
                    onChange={(e) => updateEducation(index, { school: e.target.value })}
                    placeholder="e.g. Universitas Kuningan"
                  />
                  <FormInput
                    label="Graduation Date"
                    value={edu.graduationDate}
                    onChange={(e) => updateEducation(index, { graduationDate: e.target.value })}
                    placeholder="e.g. Sep 2023"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end">
        <button
          type="button"
          onClick={() => setActiveSection('skills')}
          className="group flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100"
        >
          Skills Section
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default EducationForm;
