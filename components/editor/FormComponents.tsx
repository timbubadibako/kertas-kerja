import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  action?: React.ReactNode;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ title, subtitle, icon: Icon, action }) => (
  <div className="mb-10 flex items-start gap-4">
    <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-100">
      <Icon className="text-white" size={24} />
    </div>
    <div className="flex-1 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-500 text-sm mt-1 font-medium">{subtitle}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  </div>
);

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  label: string;
  as?: 'input' | 'textarea' | 'select';
  error?: string;
  helperText?: string;
  rows?: number;
}

export const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  as = 'input', 
  error, 
  helperText, 
  className = '', 
  ...props 
}) => {
  const baseClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all text-sm font-medium text-slate-700 placeholder:text-slate-300 bg-white shadow-sm";
  const labelClasses = "text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1.5";
  
  const Component = as as any;

  return (
    <div className="flex flex-col">
      <label className={labelClasses}>{label}</label>
      <Component className={`${baseClasses} ${className} ${error ? 'border-rose-300' : ''}`} {...props} />
      {helperText && <p className="text-[10px] text-slate-400 mt-1.5 font-medium italic">{helperText}</p>}
      {error && <p className="text-xs text-rose-500 mt-1 font-bold">{error}</p>}
    </div>
  );
};

export const FormSection: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <div className="bg-white rounded-[32px] p-0 space-y-6">
    {title && <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight mb-2">{title}</h3>}
    {children}
  </div>
);
