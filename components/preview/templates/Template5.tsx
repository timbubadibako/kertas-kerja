import React from 'react';
import { CVData } from '@/types/cv';
import IconRenderer from '../IconRenderer';

const Template5: React.FC<{ data: CVData }> = ({ data }) => {
  const { personal, work, education, skills } = data;

  return (
    <div className="text-black font-mono leading-tight w-[210mm] min-h-[297mm] bg-white p-[20mm]">
      <header className="mb-12 border-4 border-black p-8 flex justify-between items-center bg-white shadow-[8px_8px_0px_rgba(0,0,0,1)]">
        <div>
          <h1 className="text-4xl font-black uppercase mb-4 tracking-tighter leading-none">{personal.fullName || 'User.Identity'}</h1>
          <div className="flex flex-col gap-2 text-[9pt] uppercase font-bold text-gray-700">
            <div className="flex items-center gap-3">
              <IconRenderer platform="mail" size={14} className="text-black" />
              <span>{personal.email || 'null'}</span>
            </div>
            <div className="flex items-center gap-3">
              <IconRenderer platform="phone" size={14} className="text-black" />
              <span>{personal.phone || 'null'}</span>
            </div>
            {(personal.links ?? []).map(link => (
              <div key={link.id} className="flex items-center gap-3 underline decoration-2">
                <IconRenderer platform={link.platform} size={14} className="text-black" />
                <span>{link.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            ))}
          </div>
        </div>
        {personal.photo && (
          <div className="w-28 h-28 border-4 border-black flex-shrink-0 grayscale">
            <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="space-y-12">
        {personal.summary && (
          <section>
            <h2 className="text-lg font-black bg-black text-white inline-block px-3 py-1 mb-6 uppercase tracking-tighter shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">Profile.sh</h2>
            <p className="text-[10pt] leading-relaxed max-w-2xl border-l-4 border-gray-200 pl-6 text-justify font-bold break-all">
              {personal.summary}
            </p>
          </section>
        )}

        {work.length > 0 && (
          <section>
            <h2 className="text-lg font-black bg-black text-white inline-block px-3 py-1 mb-8 uppercase tracking-tighter">Experience.log</h2>
            <div className="space-y-12">
              {work.map((exp, index) => (
                <div key={index} className="border-l-4 border-black pl-8 relative">
                  <div className="absolute -left-[10px] top-0 w-4 h-4 bg-black rounded-full outline-4 outline-white outline" />
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-[13pt] font-black uppercase tracking-tight">{exp.position}</h3>
                    <span className="text-[9pt] bg-black text-white px-3 py-1 font-bold tracking-widest leading-none">
                      [{exp.startDate} :: {exp.endDate}]
                    </span>
                  </div>
                  <div className="text-[10pt] font-black text-gray-500 mb-5 uppercase tracking-widest italic">{exp.company}</div>
                  <div className="space-y-3">
                    {exp.description.map((bullet, i) => (
                      <div key={i} className="text-[10pt] flex items-start">
                        <span className="mr-4 font-black text-black">$</span>
                        <span className="font-bold text-gray-800 break-all">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {education.length > 0 && (
            <section>
              <h2 className="text-lg font-black bg-black text-white inline-block px-3 py-1 mb-6 uppercase tracking-tighter">Edu.bin</h2>
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-gray-100 pl-6">
                    <h4 className="text-[11pt] font-black uppercase leading-tight tracking-tight">{edu.degree}</h4>
                    <div className="text-[10pt] text-gray-500 font-bold uppercase tracking-tight mt-1">{edu.school}</div>
                    <div className="text-[8pt] text-black font-black mt-3 uppercase"># TIMESTAMP: {edu.graduationDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-black bg-black text-white inline-block px-3 py-1 mb-6 uppercase tracking-tighter">Stack.env</h2>
              <div className="flex flex-wrap gap-3.5">
                {skills.map((skill, index) => (
                  <span 
                    key={typeof skill === 'string' ? index : (skill.id || index)} 
                    className="px-3 py-1.5 border-4 border-black text-[10pt] font-black uppercase tracking-widest bg-white"
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

export default Template5;
