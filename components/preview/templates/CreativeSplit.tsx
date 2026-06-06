import React from 'react';
import { CVData } from '@/types/cv';
import IconRenderer from '../IconRenderer';

interface CreativeSplitProps {
  data: CVData;
}

const CreativeSplit: React.FC<CreativeSplitProps> = ({ data }) => {
  const { personal, work, education, skills } = data;

  return (
    <div className="flex h-full min-h-[257mm] text-black font-sans -m-[20mm]">
      {/* Sidebar (Left) */}
      <aside className="w-1/3 bg-gray-100 p-8 border-r border-gray-200">
        <div className="mb-10 text-center">
          {personal.photo && (
            <div className="w-32 h-32 mx-auto mb-6 border-2 border-white shadow-sm overflow-hidden bg-white">
              <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover grayscale" />
            </div>
          )}
          <h1 className="text-2xl font-black leading-tight mb-2 uppercase tracking-tighter">{personal.fullName || 'Your Name'}</h1>
          <p className="text-gray-500 text-[9pt] font-black tracking-[0.2em] uppercase">
            {work[0]?.position || 'Professional'}
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-black mb-4 border-b-2 border-black pb-1">Contact</h2>
            <div className="space-y-4 text-[9pt]">
              {personal.email && (
                <div className="flex items-start gap-3">
                  <IconRenderer platform="mail" size={14} className="mt-0.5 text-black" />
                  <div className="font-bold break-all uppercase tracking-tight">{personal.email}</div>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-start gap-3">
                  <IconRenderer platform="phone" size={14} className="mt-0.5 text-black" />
                  <div className="font-bold uppercase tracking-tight">{personal.phone}</div>
                </div>
              )}
              {personal.address && (
                <div className="flex items-start gap-3">
                  <IconRenderer platform="address" size={14} className="mt-0.5 text-black" />
                  <div className="font-bold uppercase tracking-tight">{personal.address}</div>
                </div>
              )}
              {personal.links && personal.links.map(link => (
                <div key={link.id} className="flex items-start gap-3">
                  <IconRenderer platform={link.platform} size={14} className="mt-0.5 text-black" />
                  <div className="font-bold uppercase tracking-tight truncate underline">
                    {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-black mb-4 border-b-2 border-black pb-1">Mastery</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={typeof skill === 'string' ? index : (skill.id || index)} 
                    className="px-2 py-1 bg-white border border-black text-[8pt] font-black uppercase tracking-tight"
                  >
                    {typeof skill === 'string' ? skill : skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-black mb-4 border-b-2 border-black pb-1">Learning</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <div className="text-[9pt] font-black uppercase leading-tight tracking-tight">{edu.degree}</div>
                    <div className="text-[8pt] text-gray-500 font-bold uppercase tracking-tight">{edu.school}</div>
                    <div className="text-[7pt] text-gray-400 mt-1 uppercase font-black tracking-widest">{edu.graduationDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </aside>

      {/* Main Content (Right) */}
      <main className="w-2/3 p-10 bg-white">
        {personal.summary && (
          <section className="mb-10">
            <h2 className="text-sm font-black text-black uppercase tracking-[0.3em] mb-4 border-b-4 border-black pb-2">Profile</h2>
            <p className="text-[10pt] text-gray-800 leading-relaxed text-justify italic break-all">
              "{personal.summary}"
            </p>
          </section>
        )}

        {work.length > 0 && (
          <section>
            <h2 className="text-sm font-black text-black uppercase tracking-[0.3em] mb-8 border-b-4 border-black pb-2">History</h2>
            <div className="space-y-8">
              {work.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[10pt] font-black text-black uppercase tracking-tight">{exp.position}</h3>
                    <span className="text-[8pt] font-black text-gray-400 uppercase tracking-widest">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <div className="text-[9pt] font-bold text-gray-500 mb-3 uppercase tracking-widest">{exp.company}</div>
                  <ul className="space-y-2 break-all">
                    {exp.description.map((bullet, i) => (
                      <li key={i} className="text-[10pt] text-gray-800 flex items-start">
                        <span className="w-1.5 h-1.5 bg-black mt-1.5 mr-3 flex-shrink-0" />
                        <span>{bullet}</span>
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

export default CreativeSplit;
