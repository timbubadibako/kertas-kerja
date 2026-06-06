'use client';

import React from 'react';
import { useCVStore, useActiveCVData } from '@/store/useCVStore';
import { ChevronRight, RotateCcw, UserCircle } from 'lucide-react';
import PhotoUpload from './PhotoUpload';
import SocialLinksForm from './SocialLinksForm';
import { FormHeader, FormInput } from './FormComponents';

const PersonalInfoForm: React.FC = () => {
  const personal = useActiveCVData().personal;
  const updatePersonal = useCVStore((state) => state.updatePersonal);
  const setActiveSection = useCVStore((state) => state.setActiveSection);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updatePersonal({ [name]: value });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
      <FormHeader 
        title="Personal Identity" 
        subtitle="Define your professional brand and contact details."
        icon={UserCircle}
      />

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
          <PhotoUpload />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <FormInput
            label="Full Name"
            id="fullName"
            name="fullName"
            value={personal.fullName}
            onChange={handleChange}
            placeholder="e.g. Syifa Pajril Yaum"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Email Address"
              id="email"
              name="email"
              type="email"
              value={personal.email}
              onChange={handleChange}
              placeholder="hello@example.com"
            />
            <FormInput
              label="Phone Number"
              id="phone"
              name="phone"
              type="tel"
              value={personal.phone}
              onChange={handleChange}
              placeholder="+62..."
            />
          </div>

          <FormInput
            label="Current Location"
            id="address"
            name="address"
            value={personal.address}
            onChange={handleChange}
            placeholder="City, Country"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="Birth Date"
              id="dob"
              name="dob"
              value={personal.dob || ''}
              onChange={handleChange}
              placeholder="DD-MM-YYYY"
            />
            <FormInput
              label="Birth Place"
              id="pob"
              name="pob"
              value={personal.pob || ''}
              onChange={handleChange}
              placeholder="City"
            />
            <FormInput
              as="select"
              label="Gender"
              id="gender"
              name="gender"
              value={personal.gender || ''}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </FormInput>
          </div>
        </div>

        <SocialLinksForm />

        <FormInput
          as="textarea"
          label="Professional Bio"
          id="summary"
          name="summary"
          rows={5}
          value={personal.summary}
          onChange={handleChange}
          className="resize-none leading-relaxed"
          placeholder="Write a compelling summary of your professional journey..."
          helperText="* This summary is the first thing recruiters read. Keep it punchy."
        />

        <div className="pt-8 flex items-center justify-between border-t border-slate-100">
          <button
            type="button"
            onClick={() => updatePersonal({ fullName: '', email: '', phone: '', address: '', summary: '', links: [], photo: '', dob: '', pob: '', gender: '' })}
            className="group flex items-center gap-2 px-6 py-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-rose-500 transition-all"
          >
            <RotateCcw size={14} className="group-hover:rotate-[-45deg] transition-transform" />
            Reset Form
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('work')}
            className="group flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-all shadow-xl shadow-slate-100"
          >
            Continue to Experience
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
