'use client';

import React from 'react';
import { useCVStore, useActiveCVData } from '@/store/useCVStore';
import { Plus, Trash2, Zap, Star } from 'lucide-react';

const SkillsForm: React.FC = () => {
  const skills = useActiveCVData().skills || [];
  const addSkill = useCVStore((state) => state.addSkill);
  const updateSkill = useCVStore((state) => state.updateSkill);
  const removeSkill = useCVStore((state) => state.removeSkill);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
      <div className="mb-10 flex items-start gap-4">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-100">
          <Zap className="text-white" size={24} />
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Professional Skills</h2>
            <p className="text-slate-500 text-sm mt-1 font-medium">Highlight your core expertise and proficiency.</p>
          </div>
          <button
            onClick={addSkill}
            className="group flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
          >
            <Plus size={18} className="group-hover:scale-110 transition-transform" />
            Add Skill
          </button>
        </div>
      </div>

      {skills.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200">
          <Star className="mx-auto text-slate-200 mb-4" size={48} />
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No skills listed yet</p>
          <p className="text-slate-300 text-[11px] mt-2 font-medium">Click "Add Skill" to start building your technical profile</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {skills.map((skill) => (
            <div 
              key={skill.id} 
              className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm group hover:border-indigo-200 hover:shadow-md transition-all animate-in zoom-in-95 duration-300"
            >
              <div className="flex-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1 block">Skill Name</label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                  placeholder="e.g. React.js, Python, Leadership"
                  className="w-full bg-transparent font-bold text-slate-800 outline-none border-b-2 border-transparent focus:border-indigo-500 transition-all py-1 placeholder:text-slate-200"
                />
              </div>

              <div className="flex flex-col items-end gap-1 px-6 border-l border-slate-50">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Proficiency</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => updateSkill(skill.id, { level })}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black transition-all ${
                        skill.level >= level
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 scale-110'
                          : 'bg-slate-50 text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => removeSkill(skill.id)}
                className="p-3 text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                title="Remove Skill"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
