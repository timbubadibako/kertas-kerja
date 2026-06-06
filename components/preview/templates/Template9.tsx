import React from 'react';
import { CVData } from '@/types/cv';
import IconRenderer from '../IconRenderer';

const Template9: React.FC<{ data: CVData }> = ({ data }) => {
  const { personal, work, education, skills } = data;

  return (
    <div className="text-black font-sans leading-normal bg-white p-[20mm] w-[210mm] min-h-[297mm]">
      <header className="mb-10 flex flex-col items-center text-center">
        <h1 className="text-4xl font-black text-black mb-4 tracking-tighter uppercase leading-none">
          {personal.fullName || 'Identity.Name'}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10pt] font-black text-gray-500 uppercase tracking-widest items-center">
          {personal.email && (
            <div className="flex items-center gap-2">
              <IconRenderer platform="mail" size={14} className="text-black" />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-2">
              <IconRenderer platform="phone" size={14} className="text-black" />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.address && (
            <div className="flex items-center gap-2">
              <IconRenderer platform="address" size={14} className="text-black" />
              <span>{personal.address}</span>
            </div>
          )}
          {(personal.links ?? []).map(link => (
            <div key={link.id} className="flex items-center gap-2 underline decoration-2 text-black">
              <IconRenderer platform={link.platform} size={14} />
              <span>{link.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          ))}
        </div>
      </header>

      {personal.photo && (
        <div className="flex justify-center mb-10">
          <div className="w-28 h-28 rounded-full border-4 border-black overflow-hidden grayscale shadow-lg bg-white">
            <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <div className="space-y-12">
        {personal.summary && (
          <section className="bg-gray-50 p-8 border-y-2 border-black">
            <h2 className="text-xs uppercase font-black tracking-[0.3em] text-black mb-4 text-center leading-none">Professional Statement</h2>
            <p className="text-[10.5pt] leading-relaxed text-black font-bold text-center break-all italic">
              {personal.summary}
            </p>
          </section>
        )}

        {work.length > 0 && (
          <section>
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-black mb-8 border-b-2 border-black pb-2 text-center leading-none">Employment History</h2>
            <div className="space-y-10">
              {work.map((exp, index) => (
                <div key={index} className="relative">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-[12pt] font-black text-black uppercase tracking-tight">{exp.position}</h3>
                      <div className="text-[10pt] font-bold text-gray-500 uppercase tracking-widest mt-1">{exp.company}</div>
                    </div>
                    <span className="text-[9pt] font-black text-white bg-black px-3 py-1 uppercase tracking-[0.1em] leading-none">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <ul className="space-y-3 mt-4">
                    {exp.description.map((bullet, i) => (
                      <li key={i} className="text-[10pt] leading-relaxed text-gray-700 flex items-start">
                        <span className="text-black mr-4 mt-2 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" />
                        <span className="font-medium break-all">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-12">
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-black mb-6 border-b-2 border-black pb-2 leading-none">Academic</h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-[10.5pt] font-black text-black uppercase leading-tight tracking-tight">{edu.degree}</h3>
                    <div className="text-[9pt] font-bold text-gray-400 mb-1 uppercase tracking-tight">{edu.school}</div>
                    <div className="text-[8pt] font-black text-gray-300 uppercase tracking-widest leading-none mt-2 italic">{edu.graduationDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] text-black mb-6 border-b-2 border-black pb-2 leading-none">Expertise</h2>
              <div className="flex flex-wrap gap-2.5">
                {skills.map((skill, index) => (
                  <span 
                    key={typeof skill === 'string' ? index : (skill.id || index)} 
                    className="px-3 py-1.5 border-2 border-black text-[9pt] font-black uppercase text-black tracking-widest bg-gray-50"
                  >
                    {typeof skill === 'string' ? skill : skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template9;
