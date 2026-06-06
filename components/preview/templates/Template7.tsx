import React from 'react';
import { CVData } from '@/types/cv';
import IconRenderer from '../IconRenderer';

const Template7: React.FC<{ data: CVData }> = ({ data }) => {
  const { personal, work, education, skills } = data;

  return (
    <div className="flex h-full min-h-[297mm] w-[210mm] text-black font-sans bg-white">
      <aside className="w-[35%] bg-gray-100 p-10 border-r border-gray-200">
        <div className="mb-10 text-center">
          {personal.photo && (
            <div className="w-36 h-36 mx-auto mb-8 border-4 border-white shadow-lg overflow-hidden bg-white">
              <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover grayscale" />
            </div>
          )}
          <h1 className="text-3xl font-black leading-none mb-3 uppercase tracking-tighter">{personal.fullName || 'Identity'}</h1>
          <p className="text-gray-500 text-[10pt] font-black tracking-widest uppercase italic">
            {work[0]?.position || 'Professional'}
          </p>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-black mb-5 border-b-2 border-black pb-1 leading-none">Contact</h2>
            <div className="space-y-4 text-[9.5pt]">
              {personal.email && (
                <div className="flex items-start gap-3">
                  <IconRenderer platform="mail" size={14} className="mt-1 text-black" />
                  <div className="font-bold break-all uppercase tracking-tight leading-snug">{personal.email}</div>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-start gap-3">
                  <IconRenderer platform="phone" size={14} className="mt-1 text-black" />
                  <div className="font-bold uppercase tracking-tight leading-snug">{personal.phone}</div>
                </div>
              )}
              {personal.address && (
                <div className="flex items-start gap-3">
                  <IconRenderer platform="address" size={14} className="mt-1 text-black" />
                  <div className="font-bold uppercase tracking-tight leading-snug">{personal.address}</div>
                </div>
              )}
              {(personal.links ?? []).map(link => (
                <div key={link.id} className="flex items-start gap-3">
                  <IconRenderer platform={link.platform} size={14} className="mt-1 text-black" />
                  <div className="font-bold uppercase tracking-tight truncate underline decoration-1 leading-snug">
                    {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {skills.length > 0 && (
            <section>
              <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-black mb-5 border-b-2 border-black pb-1 leading-none">Expertise</h2>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, index) => (
                  <span 
                    key={typeof skill === 'string' ? index : (skill.id || index)} 
                    className="px-2.5 py-1 bg-white border border-gray-300 text-[8pt] font-black uppercase tracking-tight"
                  >
                    {typeof skill === 'string' ? skill : skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] text-black mb-5 border-b-2 border-black pb-1 leading-none">Academic</h2>
              <div className="space-y-5">
                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="text-[10pt] font-black uppercase leading-tight tracking-tight">{edu.degree}</div>
                    <div className="text-[9pt] text-gray-500 font-bold uppercase tracking-tight mt-1">{edu.school}</div>
                    <div className="text-[7.5pt] text-black mt-1 uppercase font-black tracking-widest bg-white inline-block px-1 border border-gray-200">{edu.graduationDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </aside>

      <main className="w-[65%] p-12 bg-white">
        {personal.summary && (
          <section className="mb-12">
            <h2 className="text-[12pt] font-black text-black uppercase tracking-[0.4em] mb-6 border-b-4 border-black pb-2 leading-none inline-block">Profile</h2>
            <p className="text-[11pt] text-gray-800 leading-relaxed text-justify italic font-medium break-all">
              "{personal.summary}"
            </p>
          </section>
        )}

        {work.length > 0 && (
          <section>
            <h2 className="text-[12pt] font-black text-black uppercase tracking-[0.4em] mb-8 border-b-4 border-black pb-2 leading-none inline-block">Employment</h2>
            <div className="space-y-10">
              {work.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-[11.5pt] font-black text-black uppercase tracking-tight">{exp.position}</h3>
                    <span className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-0.5">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <div className="text-[10pt] font-bold text-gray-500 mb-4 uppercase tracking-[0.1em]">{exp.company}</div>
                  <ul className="space-y-3">
                    {exp.description.map((bullet, i) => (
                      <li key={i} className="text-[10.5pt] text-gray-700 flex items-start">
                        <span className="w-1.5 h-1.5 bg-black mt-2 mr-4 flex-shrink-0" />
                        <span className="font-medium break-all">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Template7;
