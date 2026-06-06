import React from 'react';
import { CVData } from '@/types/cv';
import IconRenderer from '../IconRenderer';

const Template6: React.FC<{ data: CVData }> = ({ data }) => {
  const { personal, work, education, skills } = data;

  return (
    <div className="text-gray-800 font-sans tracking-tight leading-normal w-[210mm] min-h-[297mm] bg-white p-[20mm]">
      <header className="mb-10 flex justify-between items-center border-b-2 border-black pb-8">
        <div>
          <h1 className="text-4xl font-black text-black mb-3 tracking-tighter uppercase leading-none">
            {personal.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[10pt] font-black text-gray-500 items-center">
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
        </div>
        {personal.photo && (
          <div className="w-24 h-24 rounded-3xl border-2 border-black overflow-hidden flex-shrink-0 grayscale shadow-md bg-white">
            <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="space-y-12">
        {personal.summary && (
          <section className="bg-gray-100 p-8 border-l-8 border-black rounded-r-3xl">
            <h2 className="text-xs uppercase font-black tracking-[0.2em] text-gray-400 mb-4 uppercase leading-none">About Me</h2>
            <p className="text-[10pt] leading-relaxed text-black font-bold text-justify break-all">
              {personal.summary}
            </p>
          </section>
        )}

        {work.length > 0 && (
          <section>
            <h2 className="text-xs uppercase font-black tracking-[0.3em] text-black mb-8 border-b-2 border-black pb-1 leading-none">Professional Journey</h2>
            <div className="space-y-10">
              {work.map((exp, index) => (
                <div key={index} className="group">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-[11pt] font-black text-black uppercase leading-tight tracking-tight">{exp.position}</h3>
                      <div className="text-[10pt] font-bold text-gray-400 uppercase tracking-widest mt-1">{exp.company}</div>
                    </div>
                    <span className="text-[9pt] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <ul className="space-y-3 ml-1">
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
              <h2 className="text-xs uppercase font-black tracking-[0.3em] text-black mb-6 border-b-2 border-black pb-1 leading-none">Academic</h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-[10.5pt] font-black text-black uppercase leading-tight tracking-tight">{edu.degree}</h3>
                    <div className="text-[9.5pt] font-bold text-gray-400 mb-1 uppercase mt-1">{edu.school}</div>
                    <div className="text-[8pt] font-black text-gray-300 uppercase tracking-widest leading-none mt-2">{edu.graduationDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-xs uppercase font-black tracking-[0.3em] text-black mb-6 border-b-2 border-black pb-1 leading-none">Expertise</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span 
                    key={typeof skill === 'string' ? index : (skill.id || index)} 
                    className="px-3 py-1 border-2 border-black text-[9pt] font-black uppercase text-black tracking-widest bg-white rounded-lg"
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

export default Template6;
