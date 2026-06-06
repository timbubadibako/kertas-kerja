import React from 'react';
import { CVData } from '@/types/cv';
import IconRenderer from '../IconRenderer';

interface TechMinimalistProps {
  data: CVData;
}

const TechMinimalist: React.FC<TechMinimalistProps> = ({ data }) => {
  const { personal, work, education, skills } = data;

  return (
    <div className="text-black font-mono leading-tight">
      {/* Header */}
      <header className="mb-12 border-4 border-black p-6 flex justify-between items-center bg-white">
        <div>
          <h1 className="text-4xl font-black uppercase mb-3 tracking-tighter text-black">
            {personal.fullName || 'USER_UNDEFINED'}
          </h1>
          <div className="flex flex-col gap-2 text-[9pt] uppercase font-bold text-gray-700">
            {personal.email && (
              <div className="flex items-center gap-2">
                <span className="text-black font-black">[MAIL]</span>
                <span className="text-black underline">{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2">
                <span className="text-black font-black">[CELL]</span>
                <span className="text-black">{personal.phone}</span>
              </div>
            )}
            {personal.links && personal.links.map(link => (
              <div key={link.id} className="flex items-center gap-2 underline">
                <span className="text-black font-black">[{link.platform.toUpperCase() || 'LINK'}]</span>
                <span className="text-black">{link.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            ))}
          </div>
        </div>
        {personal.photo && (
          <div className="w-24 h-24 border-4 border-black flex-shrink-0 grayscale">
            <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="space-y-12">
        {/* Summary */}
        {personal.summary && (
          <section>
            <h2 className="text-md font-black bg-black text-white inline-block px-2 mb-4 uppercase tracking-tighter">Profile.sh</h2>
            <p className="text-[10pt] leading-normal max-w-2xl border-l-4 border-gray-200 pl-4 text-justify text-black font-bold break-all">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {work.length > 0 && (
          <section>
            <h2 className="text-md font-black bg-black text-white inline-block px-2 mb-6 uppercase tracking-tighter">Experience.log</h2>
            <div className="space-y-10">
              {work.map((exp, index) => (
                <div key={index} className="border-l-4 border-black pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-black rounded-full" />
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-lg font-black uppercase tracking-tight text-black">{exp.position}</h3>
                    <span className="text-[8pt] bg-black text-white px-3 py-0.5 font-bold tracking-widest leading-none">
                      [{exp.startDate} :: {exp.endDate}]
                    </span>
                  </div>
                  <div className="text-[10pt] font-black text-gray-500 mb-4 uppercase tracking-widest italic">{exp.company}</div>
                  <div className="space-y-2.5 break-all">
                    {exp.description.map((bullet, i) => (
                      <div key={i} className="text-[10pt] flex items-start">
                        <span className="mr-3 font-black text-black">#</span>
                        <span className="text-black font-bold">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-md font-black bg-black text-white inline-block px-2 mb-6 uppercase tracking-tighter">Edu.bin</h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-gray-200 pl-4">
                    <h3 className="text-[10pt] font-black uppercase leading-tight text-black">{edu.degree}</h3>
                    <div className="text-[9pt] text-gray-500 font-bold uppercase tracking-tight mt-1">{edu.school}</div>
                    <div className="text-[8pt] text-black font-black mt-2 uppercase">TIMESTAMP: {edu.graduationDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-md font-black bg-black text-white inline-block px-2 mb-6 uppercase tracking-tighter">Stack.env</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span 
                    key={typeof skill === 'string' ? index : (skill.id || index)} 
                    className="px-3 py-1 border-2 border-black text-[9pt] font-black uppercase tracking-widest text-black"
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

export default TechMinimalist;
