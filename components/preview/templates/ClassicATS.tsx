import React from 'react';
import { CVData } from '@/types/cv';
import IconRenderer from '../IconRenderer';

interface ClassicATSProps {
  data: CVData;
}

const ClassicATS: React.FC<ClassicATSProps> = ({ data }) => {
  const { personal, work, education, skills } = data;

  return (
    <div className="text-black font-serif">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold uppercase tracking-wide">{personal.fullName || 'Your Name'}</h1>
          <div className="flex gap-x-4 gap-y-1 text-[10pt] mt-2 flex-wrap text-black items-center">
            {personal.email && (
              <div className="flex items-center gap-1">
                <IconRenderer platform="mail" size={12} />
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-1">
                <IconRenderer platform="phone" size={12} />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.address && (
              <div className="flex items-center gap-1">
                <IconRenderer platform="address" size={12} />
                <span>{personal.address}</span>
              </div>
            )}
            {personal.links && personal.links.map(link => (
              <div key={link.id} className="flex items-center gap-1">
                <IconRenderer platform={link.platform} size={12} />
                <span className="underline">{link.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
              </div>
            ))}
          </div>
        </div>
        {personal.photo && (
          <div className="w-24 h-24 border border-black ml-6">
            <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover grayscale" />
          </div>
        )}
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Professional Summary</h2>
          <p className="text-sm leading-relaxed whitespace-pre-line text-justify break-all">{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {work.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Work Experience</h2>
          <div className="space-y-4">
            {work.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between font-bold">
                  <span>{exp.company}</span>
                  <span className="font-sans text-[9pt]">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="italic text-sm font-bold">{exp.position}</div>
                <ul className="list-disc ml-5 mt-1 text-sm space-y-1 break-all">
                  {exp.description.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Education</h2>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <div className="font-bold">{edu.school}</div>
                  <div className="text-sm italic">{edu.degree}</div>
                </div>
                <div className="text-sm font-bold font-sans">{edu.graduationDate}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b border-black mb-2">Skills</h2>
          <div className="text-sm">
            <span className="font-bold uppercase tracking-tight">Technical Skills: </span>
            {skills.join(', ')}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassicATS;
