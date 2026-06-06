import React from 'react';
import { CVData } from '@/types/cv';
import IconRenderer from '../IconRenderer';

interface ProfessionalCleanProps {
  data: CVData;
}

const ProfessionalClean: React.FC<ProfessionalCleanProps> = ({ data }) => {
  const { personal, work, education, skills } = data;

  return (
    <div className="text-black font-sans leading-normal">
      {/* Header */}
      <div className="border-b-4 border-black pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-black mb-3">{personal.fullName || 'Your Name'}</h1>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[9pt] font-bold text-gray-700 items-center">
            {personal.email && (
              <div className="flex items-center gap-1.5 uppercase tracking-tight">
                <IconRenderer platform="mail" size={14} className="text-black" />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-1.5 uppercase tracking-tight">
                <IconRenderer platform="phone" size={14} className="text-black" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.address && (
              <div className="flex items-center gap-1.5 uppercase tracking-tight">
                <IconRenderer platform="address" size={14} className="text-black" />
                <span>{personal.address}</span>
              </div>
            )}
            {personal.links && personal.links.map(link => (
              <div key={link.id} className="flex items-center gap-1.5 uppercase tracking-tight">
                <IconRenderer platform={link.platform} size={14} className="text-black" />
                <span className="underline">{link.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            ))}
          </div>
        </div>
        {personal.photo && (
          <div className="w-28 h-28 border border-black flex-shrink-0">
            <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover grayscale" />
          </div>
        )}
      </div>

      <div className="space-y-10">
        {/* Summary */}
        {personal.summary && (
          <section>
            <h2 className="text-lg font-black text-black border-b-2 border-black mb-3 pb-1 uppercase tracking-widest">Profile</h2>
            <p className="text-[10pt] text-gray-800 leading-relaxed text-justify break-all">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {work.length > 0 && (
          <section>
            <h2 className="text-lg font-black text-black border-b-2 border-black mb-4 pb-1 uppercase tracking-widest">Experience</h2>
            <div className="space-y-6">
              {work.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-md font-black text-black uppercase tracking-tight">{exp.position}</h3>
                    <span className="text-[9pt] font-bold text-gray-500 uppercase tracking-widest">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <div className="text-[10pt] font-bold text-gray-600 mb-2 uppercase tracking-tight">{exp.company}</div>
                  <ul className="list-disc ml-5 space-y-1.5 break-all">
                    {exp.description.map((bullet, i) => (
                      <li key={i} className="text-[10pt] text-gray-800 pl-1">{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h2 className="text-lg font-black text-black border-b-2 border-black mb-4 pb-1 uppercase tracking-widest">Education</h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="flex justify-between items-baseline">
                  <div>
                    <h3 className="text-[10pt] font-black text-black uppercase tracking-tight">{edu.degree}</h3>
                    <div className="text-[10pt] text-gray-600 font-bold uppercase tracking-tight">{edu.school}</div>
                  </div>
                  <span className="text-[9pt] font-bold text-gray-500 uppercase tracking-widest">{edu.graduationDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-lg font-black text-black border-b-2 border-black mb-3 pb-1 uppercase tracking-widest">Expertise</h2>
            <div className="grid grid-cols-3 gap-y-2 gap-x-4">
              {skills.map((skill, index) => (
                <div key={typeof skill === 'string' ? index : (skill.id || index)} className="flex items-center gap-2 text-[9pt] font-bold text-gray-700 uppercase tracking-tight">
                  <span className="w-1 h-1 bg-black rounded-full" />
                  {typeof skill === 'string' ? skill : skill.name}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProfessionalClean;
