'use client';

import React from 'react';
import { useCVStore } from '@/store/useCVStore';
import { useAppStore } from '@/store/useAppStore';
import { Plus, Briefcase, Copy, Trash2, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { versions, createVersion, loadVersion, cloneVersion, deleteVersion } = useCVStore();
  const { setView } = useAppStore();
  const [now, setNow] = React.useState<number | null>(null);

  React.useEffect(() => {
    setNow(Date.now());
  }, []);

  const handleCreateNew = () => {
    const name = window.prompt('Nama CV Baru:', 'Untitled CV');
    if (name) {
      createVersion(name);
      setView('editor');
    }
  };

  const handleEdit = (id: string) => {
    loadVersion(id);
    setView('editor');
  };

  const handleClone = (id: string, currentName: string) => {
    const newName = window.prompt('Nama CV Duplikat:', `${currentName} (Copy)`);
    if (newName) {
      cloneVersion(id, newName);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Yakin mau hapus CV "${name}"?`)) {
      deleteVersion(id);
    }
  };

  const formatLastEdited = (timestamp: number) => {
    if (!now) return 'Loading...';
    const diff = now - timestamp;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navigation */}
      <nav className="h-20 bg-white border-b flex items-center justify-between px-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-100">K</div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Kertas<span className="text-indigo-600">Kerja</span></h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 pr-6 border-r">
            <div className="text-right">
              <p className="text-xs font-bold text-indigo-600">PREMIUM USER</p>
              <p className="text-sm font-semibold text-slate-900">Syifa Pajril Yaum</p>
            </div>
            <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pajril" alt="avatar" />
            </div>
          </div>
          <button className="text-slate-500 hover:text-rose-600 transition-colors font-semibold text-sm flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-12 px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Daftar Kertas Lo</h2>
            <p className="text-slate-500 mt-2">Kloning dan sesuaikan CV lo buat tiap loker biar HRD auto-lirik.</p>
          </div>
          <button 
            onClick={handleCreateNew}
            className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Bikin Versi Baru
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {versions.map((version) => (
            <div 
              key={version.id}
              className="group bg-white rounded-[32px] p-8 border border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-100">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 truncate pr-4">{version.name}</h3>
                <p className="text-sm text-slate-400 mb-6">Last edited {formatLastEdited(version.updatedAt)}</p>
                
                <div className="flex items-center gap-2 mb-8">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100 uppercase">Score: 85</span>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full border border-indigo-100 uppercase">
                    {(version.templateId || 'classic-ats').split('-').join(' ')}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleEdit(version.id)}
                    className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all"
                  >
                    Edit Kertas
                  </button>
                  <button 
                    onClick={() => handleClone(version.id, version.name)}
                    className="w-12 h-12 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-indigo-600 transition-all" 
                    title="Duplicate"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(version.id, version.name)}
                    className="w-12 h-12 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all" 
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* New Version Card / Empty State */}
          <div 
            onClick={handleCreateNew}
            className="group bg-slate-50 rounded-[32px] p-8 border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-4 min-h-[320px]"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-indigo-600 shadow-sm transition-all">
              <Plus className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-slate-400 group-hover:text-indigo-900">Tambah Versi Baru</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-[150px]">Kloning dari yang udah ada atau bikin dari nol.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
