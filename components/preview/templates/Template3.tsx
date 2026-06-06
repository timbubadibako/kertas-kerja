import React from 'react';
import { CVData } from '@/types/cv';
import IconRenderer from '../IconRenderer';

const Template3: React.FC<{ data: CVData }> = ({ data }) => {
  const { personal, work, education, skills } = data;

  return (
    <div className="text-black font-sans leading-snug min-h-[297mm] w-[210mm] flex flex-col bg-white">
      <header className="bg-black text-white p-10 flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-5xl font-black tracking-tighter uppercase leading-none mb-4 italic">{personal.fullName || 'Full Name'}</h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[9pt] font-black uppercase tracking-widest text-gray-400">
            {personal.email && (
              <div className="flex items-center gap-2 text-white">
                <IconRenderer platform="mail" size={14} />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2">
                <IconRenderer platform="phone" size={14} />
                <span>{personal.phone}</span>
              </div>
            )}
            {(personal.links ?? []).map(link => (
              <div key={link.id} className="flex items-center gap-2 underline decoration-2 underline-offset-4">
                <IconRenderer platform={link.platform} size={14} />
                <span>{link.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            ))}
          </div>
        </div>
        {personal.photo && (
          <div className="w-28 h-28 border-4 border-white flex-shrink-0 grayscale ml-8 shadow-2xl">
            <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="p-10 flex-1 bg-white">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-8 space-y-12">
            {work.length > 0 && (
              <section>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-8 border-b-4 border-black pb-2 inline-block">Work Log</h2>
                <div className="space-y-10">
                  {work.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="text-xl font-bold uppercase tracking-tight text-black">{exp.position}</h3>
                        <span className="text-[10pt] font-black text-white bg-black px-3 py-1 uppercase tracking-widest leading-none">
                          {exp.startDate} // {exp.endDate}
                        </span>
                      </div>
                      <div className="text-[11pt] font-bold text-gray-500 mb-4 uppercase tracking-[0.1em]">{exp.company}</div>
                      <ul className="space-y-3">
                        {exp.description.map((bullet, i) => (
                          <li key={i} className="text-[10pt] leading-relaxed text-gray-800 flex items-start">
                            <span className="w-1.5 h-1.5 bg-black mt-1.5 mr-4 flex-shrink-0" />
                            <span className="font-medium">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="col-span-4 space-y-12">
            {personal.summary && (
              <section className="bg-gray-50 p-6 border-l-8 border-black">
                <h2 className="text-[10pt] font-black uppercase text-gray-400 tracking-[0.3em] mb-4 uppercase">Core Profile</h2>
                <p className="text-[10pt] leading-relaxed text-black font-bold text-justify break-all italic">
                  "{personal.summary}"
                </p>
              </section>
            )}

            {skills.length > 0 && (
              <section>
                <h2 className="text-[10pt] font-black uppercase text-black tracking-[0.3em] mb-6 border-b-4 border-black pb-1">Mastery</h2>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill, index) => (
                    <span 
                      key={typeof skill === 'string' ? index : (skill.id || index)} 
                      className="px-3 py-1.5 bg-black text-white text-[9pt] font-black uppercase tracking-widest leading-none"
                    >
                      {typeof skill === 'string' ? skill : skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <h2 className="text-[10pt] font-black uppercase text-black tracking-[0.3em] mb-6 border-b-4 border-black pb-1">Academic</h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-gray-200 pl-4">
                      <h4 className="text-[10pt] font-bold text-black uppercase leading-tight">{edu.degree}</h4>
                      <div className="text-[9pt] text-gray-500 font-bold uppercase mt-1">{edu.school}</div>
                      <div className="text-[8pt] text-black font-black mt-2 uppercase tracking-tighter italic">Class of {edu.graduationDate}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template3;
