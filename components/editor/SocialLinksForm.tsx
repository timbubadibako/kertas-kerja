'use client';

import React from 'react';
import { useCVStore, useActiveCVData } from '@/store/useCVStore';
import { Plus, Trash2, Link as LinkIcon, ExternalLink } from 'lucide-react';

const SocialLinksForm: React.FC = () => {
  const links = useActiveCVData().personal.links || [];
  const addLink = useCVStore((state) => state.addLink);
  const updateLink = useCVStore((state) => state.updateLink);
  const removeLink = useCVStore((state) => state.removeLink);

  const platforms = [
    { label: 'LinkedIn', value: 'LinkedIn' },
    { label: 'GitHub', value: 'GitHub' },
    { label: 'Portfolio', value: 'Portfolio' },
    { label: 'Twitter / X', value: 'Twitter' },
    { label: 'Instagram', value: 'Instagram' },
    { label: 'Dribbble', value: 'Dribbble' },
    { label: 'Behance', value: 'Behance' },
    { label: 'Other', value: 'Other' }
  ];

  return (
    <div className="space-y-4 pt-4 border-t border-slate-100 mt-2">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-bold text-slate-800 uppercase tracking-tight">Social & Professional Links</label>
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-0.5">Showcase your online presence</p>
        </div>
        <button
          type="button"
          onClick={addLink}
          className="group flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg font-bold text-[11px] uppercase tracking-wider hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
        >
          <Plus size={14} className="group-hover:scale-110 transition-transform" />
          Add Link
        </button>
      </div>

      {links.length === 0 ? (
        <div className="text-center p-8 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl group cursor-pointer hover:border-indigo-300 transition-all" onClick={addLink}>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-slate-100 group-hover:scale-110 transition-all">
            <LinkIcon size={18} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-none">No links added yet</p>
          <p className="text-[10px] text-slate-300 mt-2 font-medium">Add your LinkedIn, GitHub, or Portfolio URL</p>
        </div>
      ) : (
        <div className="space-y-3">
          {links.map((link) => (
            <div key={link.id} className="flex gap-2 group animate-in fade-in slide-in-from-left-2 duration-300">
              <div className="w-[140px] relative">
                <select
                  value={link.platform}
                  onChange={(e) => updateLink(link.id, { platform: e.target.value })}
                  className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 outline-none transition-all appearance-none bg-white text-sm font-bold text-slate-700 shadow-sm"
                >
                  <option value="" disabled>Platform</option>
                  {platforms.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Plus size={14} className="rotate-45" />
                </div>
              </div>

              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <ExternalLink size={14} />
                </div>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateLink(link.id, { url: e.target.value })}
                  placeholder="https://..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium text-slate-600 shadow-sm"
                />
              </div>

              <button
                type="button"
                onClick={() => removeLink(link.id)}
                className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                title="Remove Link"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SocialLinksForm;
