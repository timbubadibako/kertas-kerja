'use client';

import React from 'react';
import { User, Briefcase, GraduationCap, Sparkles, Layout } from 'lucide-react';
import { useCVStore } from '@/store/useCVStore';

const Sidebar = () => {
  const activeSection = useCVStore((state) => state.activeSection);
  const setActiveSection = useCVStore((state) => state.setActiveSection);

  const navItems = [
    { id: 'templates', label: 'Templates', icon: Layout },
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'work', label: 'Work Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Sparkles },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-64px)] editor-sidebar no-print">
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon 
                size={20} 
                className={isActive ? 'text-indigo-600' : 'text-gray-400'} 
              />
              <span className={`font-medium ${isActive ? 'text-indigo-600' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />
              )}
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-100">
        <div className="p-4 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl text-white shadow-md">
          <p className="text-xs font-medium opacity-80 uppercase tracking-wider mb-1">Current Version</p>
          <p className="text-sm font-bold">Standard ATS v1.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
