import React from 'react';
import { CVData } from '@/types/cv';
import IconRenderer from '../IconRenderer';

interface CreativeGradientProps {
  data: CVData;
}

const CreativeGradient: React.FC<CreativeGradientProps> = ({ data }) => {
  const { personal, work, education, skills } = data;

  return (
    <div className="text-black font-sans -m-[20mm] min-h-[297mm] bg-white">
      {/* Header */}
      <header className="bg-black text-white p-12 mb-10 flex justify-between items-center border-b-8 border-gray-200">
        <div>
          <h1 className="text-6xl font-black tracking-tighter mb-6 uppercase leading-none">
            {personal.fullName || 'Name Here'}
          </h1>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[10pt] font-black uppercase tracking-[0.2em] text-gray-400 items-center">
            {personal.email && (
              <div className="flex items-center gap-2 text-white">
                <IconRenderer platform="mail" size={16} />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2">
                <IconRenderer platform="phone" size={16} />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.links && personal.links.map(link => (
              <div key={link.id} className="flex items-center gap-2">
                <IconRenderer platform={link.platform} size={16} />
                <span className="underline decoration-2 underline-offset-4">{link.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            ))}
          </div>
        </div>
        {personal.photo && (
          <div className="w-32 h-32 border-4 border-white flex-shrink-0 grayscale shadow-lg bg-white">
            <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="p-12 pt-0 grid grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="col-span-8 space-y-16">
          {/* Experience */}
          {work.length > 0 && (
            <section>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-10 border-b-8 border-black pb-2 inline-block">Experience</h2>
              <div className="space-y-12">
                {work.map((exp, index) => (
                  <div key={index} className="relative group">
                    <div className="flex justify-between items-baseline mb-3">
                      <h3 className="text-2xl font-black text-black uppercase tracking-tight">{exp.position}</h3>
                      <span className="text-[10pt] font-black text-white bg-black px-4 py-1.5 uppercase tracking-widest leading-none">
                        {exp.startDate} // {exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11pt] font-black text-gray-400 mb-6 uppercase tracking-[0.2em] italic">{exp.company}</div>
                    <ul className="space-y-4 break-all">
                      {exp.description.map((bullet, i) => (
                        <li key={i} className="text-[11pt] leading-relaxed text-gray-800 flex items-start">
                          <span className="w-2 h-2 bg-black mt-2 mr-4 flex-shrink-0" />
                          <span className="font-bold">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Content */}
        <div className="col-span-4 space-y-16">
          {/* Summary */}
          {personal.summary && (
            <section className="bg-gray-100 p-8 border-l-8 border-black">
              <h2 className="text-[10pt] font-black uppercase text-gray-400 tracking-[0.3em] mb-4">Core Statement</h2>
              <p className="text-[11pt] leading-relaxed text-black font-black text-justify break-all">
                {personal.summary}
              </p>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-[10pt] font-black uppercase text-black tracking-[0.3em] mb-8 border-b-4 border-black pb-1">Mastery</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span 
                    key={typeof skill === 'string' ? index : (skill.id || index)} 
                    className="px-3 py-1.5 bg-black text-white text-[10pt] font-black uppercase tracking-widest"
                  >
                    {typeof skill === 'string' ? skill : skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-[10pt] font-black uppercase text-black tracking-[0.3em] mb-8 border-b-4 border-black pb-1">Education</h2>
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-gray-200 pl-4">
                    <h3 className="text-[11pt] font-black text-black uppercase mb-1 leading-tight tracking-tight">{edu.degree}</h3>
                    <div className="text-[10pt] text-gray-500 font-black uppercase tracking-widest mt-1">{edu.school}</div>
                    <div className="text-[9pt] text-black font-black mt-3 uppercase tracking-tighter bg-gray-100 px-2 py-1 inline-block">CLASS OF {edu.graduationDate}</div>
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

export default CreativeGradient;
