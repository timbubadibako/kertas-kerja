import React from 'react';
import { CVData } from '@/types/cv';
import IconRenderer from '../IconRenderer';

interface ModernMinimalProps {
  data: CVData;
}

const ModernMinimal: React.FC<ModernMinimalProps> = ({ data }) => {
  const { personal, work, education, skills } = data;

  return (
    <div className="text-black font-sans leading-tight">
      {/* Header */}
      <header className="mb-10 flex justify-between items-start border-b border-black pb-6">
        <div className="flex-1">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            {personal.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[9pt] font-bold text-gray-600 uppercase items-center">
            {personal.email && (
              <div className="flex items-center gap-1.5">
                <IconRenderer platform="mail" size={12} className="text-black" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-1.5">
                <IconRenderer platform="phone" size={12} className="text-black" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.address && (
              <div className="flex items-center gap-1.5">
                <IconRenderer platform="address" size={12} className="text-black" />
                <span>{personal.address}</span>
              </div>
            )}
            {personal.links && personal.links.map(link => (
              <div key={link.id} className="flex items-center gap-1.5">
                <IconRenderer platform={link.platform} size={12} className="text-black" />
                <span className="underline">{link.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            ))}
          </div>
        </div>
        {personal.photo && (
          <div className="w-24 h-24 bg-gray-100 border border-black ml-8">
            <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 gap-8">
        {/* Summary */}
        {personal.summary && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-black mb-3 pb-1 text-gray-400">Profile</h2>
            <p className="text-[10pt] leading-normal text-black text-justify break-all">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {work.length > 0 && (
          <section>
            <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-black mb-4 pb-1 text-gray-400">Experience</h2>
            <div className="space-y-6">
              {work.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-black uppercase tracking-tight">{exp.position}</h3>
                    <span className="text-[9pt] font-black text-gray-400">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <div className="text-[10pt] font-bold text-gray-600 mb-2 uppercase tracking-tight">{exp.company}</div>
                  <ul className="space-y-1.5 break-all">
                    {exp.description.map((bullet, i) => (
                      <li key={i} className="text-[10pt] text-black flex items-start">
                        <span className="mr-3 font-bold">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-black mb-4 pb-1 text-gray-400">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-[10pt] font-bold text-black uppercase">{edu.degree}</h3>
                    <div className="text-[9pt] text-gray-600 font-bold uppercase">{edu.school}</div>
                    <div className="text-[8pt] text-gray-400 mt-0.5 font-bold uppercase tracking-tighter">{edu.graduationDate}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] border-b border-black mb-4 pb-1 text-gray-400">Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={typeof skill === 'string' ? index : (skill.id || index)} 
                    className="px-2 py-0.5 border border-black text-[9pt] font-bold uppercase tracking-tight"
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

export default ModernMinimal;
