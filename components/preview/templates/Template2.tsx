import React from 'react';
import { CVData } from '@/types/cv';
import IconRenderer from '../IconRenderer';

const Template2: React.FC<{ data: CVData }> = ({ data }) => {
  const { personal, work, education, skills } = data;

  return (
    <div className="text-black font-serif leading-tight w-[210mm] min-h-[297mm] bg-white p-[20mm]">
      <header className="text-center mb-8 border-b-2 border-black pb-6">
        <h1 className="text-4xl font-bold uppercase tracking-widest mb-3">{personal.fullName || 'Full Name'}</h1>
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-1 text-[10pt] font-sans font-bold text-gray-600">
          {personal.email && (
            <div className="flex items-center gap-1.5 uppercase">
              <IconRenderer platform="mail" size={14} className="text-black" />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-1.5 uppercase">
              <IconRenderer platform="phone" size={14} className="text-black" />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.address && (
            <div className="flex items-center gap-1.5 uppercase">
              <IconRenderer platform="address" size={14} className="text-black" />
              <span>{personal.address}</span>
            </div>
          )}
          {(personal.links ?? []).map(link => (
            <div key={link.id} className="flex items-center gap-1.5 uppercase underline decoration-1">
              <IconRenderer platform={link.platform} size={14} className="text-black" />
              <span>{link.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </div>
          ))}
        </div>
      </header>

      {personal.photo && (
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 border-4 border-black p-1 grayscale bg-white shadow-sm">
            <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-bold uppercase border-b border-black mb-3 pb-0.5 tracking-tighter">Professional Profile</h2>
          <p className="text-[11pt] text-justify break-all leading-relaxed">{personal.summary}</p>
        </section>

        {work.length > 0 && (
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-black mb-4 pb-0.5 tracking-tighter">Experience</h2>
            <div className="space-y-6">
              {work.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[12pt] font-bold uppercase">{exp.position}</h3>
                    <span className="font-sans font-black text-[9pt] text-gray-400 uppercase tracking-widest">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <div className="text-[11pt] italic font-bold mb-2 text-gray-700">{exp.company}</div>
                  <ul className="list-disc ml-6 text-[10.5pt] space-y-1.5 break-all">
                    {exp.description.map((bullet, i) => (
                      <li key={i} className="pl-1">{bullet}</li>
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
              <h2 className="text-lg font-bold uppercase border-b border-black mb-4 pb-0.5 tracking-tighter">Education</h2>
              <div className="space-y-5">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h4 className="text-[11pt] font-bold uppercase leading-tight">{edu.degree}</h4>
                    <div className="text-[10pt] font-bold text-gray-600 mt-1">{edu.school}</div>
                    <div className="font-sans font-black text-[8pt] text-gray-400 mt-1 uppercase tracking-tighter">{edu.graduationDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase border-b border-black mb-4 pb-0.5 tracking-tighter">Expertise</h2>
              <div className="grid grid-cols-1 gap-y-2.5">
                {skills.map((skill, index) => (
                  <div key={typeof skill === 'string' ? index : (skill.id || index)} className="flex items-center gap-3 text-[10pt] font-bold uppercase tracking-tight">
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

export default Template2;
