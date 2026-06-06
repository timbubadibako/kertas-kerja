import React from 'react';
import { CVData } from '@/types/cv';
import IconRenderer from '../IconRenderer';

const Template4: React.FC<{ data: CVData }> = ({ data }) => {
  const { personal, work, education, skills } = data;

  return (
    <div className="text-black font-serif leading-snug w-[210mm] min-h-[297mm] bg-white p-[20mm]">
      <header className="flex justify-between items-center mb-8 border-b-4 border-black pb-8">
        <div className="flex-1">
          <h1 className="text-4xl font-light tracking-[0.3em] uppercase mb-6 text-black leading-none">{personal.fullName || 'Full Name'}</h1>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[10pt] font-sans font-black uppercase tracking-widest text-gray-500 items-center">
            {personal.email && (
              <div className="flex items-center gap-2 text-black">
                <IconRenderer platform="mail" size={14} />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2 text-black">
                <IconRenderer platform="phone" size={14} />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.address && (
              <div className="flex items-center gap-2 text-black">
                <IconRenderer platform="address" size={14} />
                <span>{personal.address}</span>
              </div>
            )}
            {(personal.links ?? []).map(link => (
              <div key={link.id} className="flex items-center gap-2 text-black underline decoration-1 underline-offset-4">
                <IconRenderer platform={link.platform} size={14} />
                <span>{link.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            ))}
          </div>
        </div>
        {personal.photo && (
          <div className="w-32 h-32 border-4 border-black ml-10 p-1 grayscale bg-white shadow-lg">
            <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="space-y-12">
        {personal.summary && (
          <section className="px-12 border-l-8 border-black">
            <h2 className="text-[11pt] font-sans font-black uppercase tracking-[0.5em] text-gray-400 mb-4">Statement</h2>
            <p className="text-[12pt] leading-relaxed italic text-gray-800 text-justify break-all">
              {personal.summary}
            </p>
          </section>
        )}

        {work.length > 0 && (
          <section>
            <h2 className="text-[13pt] font-sans font-black uppercase tracking-[0.6em] text-black border-b-2 border-black mb-8 pb-1">
              Professional Journey
            </h2>
            <div className="space-y-10">
              {work.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold uppercase tracking-tight text-black leading-none">{exp.position}</h3>
                    <span className="text-[10pt] font-sans font-black text-gray-400 uppercase tracking-widest leading-none">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11pt] font-sans font-black text-gray-500 mb-4 tracking-widest uppercase italic">{exp.company}</div>
                  <ul className="space-y-3 ml-6">
                    {exp.description.map((bullet, i) => (
                      <li key={i} className="text-[11pt] leading-relaxed text-gray-700 list-disc pl-2 marker:text-black break-all">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-16 pt-4">
          {education.length > 0 && (
            <section>
              <h2 className="text-[11pt] font-sans font-black uppercase tracking-[0.4em] text-black border-b-2 border-black mb-6 pb-1">
                Background
              </h2>
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-[12pt] font-bold uppercase text-black mb-1 leading-tight">{edu.degree}</h3>
                    <div className="text-[11pt] text-gray-600 italic font-bold uppercase tracking-tight">{edu.school}</div>
                    <div className="text-[9pt] font-sans font-black text-gray-400 mt-2 uppercase tracking-[0.2em]">{edu.graduationDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-[11pt] font-sans font-black uppercase tracking-[0.4em] text-black border-b-2 border-black mb-6 pb-1">
                Core Expertise
              </h2>
              <div className="grid grid-cols-1 gap-y-3.5">
                {skills.map((skill, index) => (
                  <div 
                    key={typeof skill === 'string' ? index : (skill.id || index)} 
                    className="text-[11pt] font-sans font-black text-gray-600 uppercase tracking-widest flex items-center gap-3"
                  >
                    <span className="w-2 h-2 bg-black rounded-full" />
                    {typeof skill === 'string' ? skill : skill.name}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template4;
