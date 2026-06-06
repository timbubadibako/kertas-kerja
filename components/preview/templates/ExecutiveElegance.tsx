import React from 'react';
import { CVData } from '@/types/cv';
import IconRenderer from '../IconRenderer';

interface ExecutiveEleganceProps {
  data: CVData;
}

const ExecutiveElegance: React.FC<ExecutiveEleganceProps> = ({ data }) => {
  const { personal, work, education, skills } = data;

  return (
    <div className="text-black font-serif">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 border-b-2 border-black pb-8">
        <div className="flex-1">
          <h1 className="text-4xl font-light tracking-[0.2em] uppercase mb-6 text-black">
            {personal.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[9pt] font-sans font-black uppercase tracking-widest text-gray-500 items-center">
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
            {personal.links && personal.links.map(link => (
              <div key={link.id} className="flex items-center gap-2">
                <IconRenderer platform={link.platform} size={14} className="text-black" />
                <span className="underline">{link.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            ))}
          </div>
        </div>
        {personal.photo && (
          <div className="w-28 h-28 grayscale ml-8 border-2 border-black">
            <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="space-y-12">
        {/* Summary */}
        {personal.summary && (
          <section className="px-10 border-l-8 border-black">
            <h2 className="text-[10pt] font-sans font-black uppercase tracking-[0.4em] text-gray-400 mb-4">Statement</h2>
            <p className="text-[11pt] leading-relaxed italic text-gray-800 text-justify break-all">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {work.length > 0 && (
          <section>
            <h2 className="text-[12pt] font-sans font-black uppercase tracking-[0.5em] text-black border-b-2 border-black mb-8 pb-1">
              Experience
            </h2>
            <div className="space-y-10">
              {work.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold uppercase tracking-tight text-black">{exp.position}</h3>
                    <span className="text-[9pt] font-sans font-black text-gray-400 uppercase tracking-widest">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <div className="text-[10pt] font-sans font-black text-gray-500 mb-4 tracking-widest uppercase italic">{exp.company}</div>
                  <ul className="space-y-2.5 ml-4 break-all">
                    {exp.description.map((bullet, i) => (
                      <li key={i} className="text-[11pt] leading-relaxed text-gray-800 list-disc pl-2 marker:text-black">
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
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-[10pt] font-sans font-black uppercase tracking-[0.3em] text-black border-b-2 border-black mb-6 pb-1">
                Academic
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-[11pt] font-bold uppercase text-black mb-1 leading-tight">{edu.degree}</h3>
                    <div className="text-[10pt] text-gray-600 italic font-bold uppercase tracking-tight">{edu.school}</div>
                    <div className="text-[8pt] font-sans font-black text-gray-400 mt-2 uppercase tracking-widest">{edu.graduationDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-[10pt] font-sans font-black uppercase tracking-[0.3em] text-black border-b-2 border-black mb-6 pb-1">
                Expertise
              </h2>
              <div className="grid grid-cols-1 gap-y-3">
                {skills.map((skill, index) => (
                  <div 
                    key={typeof skill === 'string' ? index : (skill.id || index)} 
                    className="text-[10pt] font-sans font-black text-gray-600 uppercase tracking-widest flex items-center gap-3"
                  >
                    <span className="w-1.5 h-1.5 bg-black rounded-full" />
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

export default ExecutiveElegance;
