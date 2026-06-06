import React from 'react';
import { CVData } from '@/types/cv';
import IconRenderer from '../IconRenderer';

interface CompactAcademicProps {
  data: CVData;
}

const CompactAcademic: React.FC<CompactAcademicProps> = ({ data }) => {
  const { personal, work, education, skills } = data;

  return (
    <div className="text-black font-serif text-[11pt] leading-[1.3] text-justify">
      {/* Header */}
      <header className="mb-6 border-b border-black pb-4 flex justify-between items-center">
        <div className="flex-1 text-center">
          <h1 className="text-2xl font-bold mb-1 uppercase tracking-tight">
            {personal.fullName || 'Researcher Name'}
          </h1>
          <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 text-[9pt] font-sans font-bold text-gray-600">
            {personal.address && <span>{personal.address}</span>}
            {personal.phone && <span>• {personal.phone}</span>}
            {personal.email && <span>• {personal.email}</span>}
            {personal.links && personal.links.map(link => (
              <span key={link.id}>• {link.url.replace(/^https?:\/\/(www\.)?/, '')}</span>
            ))}
          </div>
        </div>
        {personal.photo && (
          <div className="w-20 h-20 border border-black ml-4 flex-shrink-0 grayscale">
            <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      <div className="space-y-6">
        {/* Summary */}
        {personal.summary && (
          <section>
            <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b border-black mb-2 font-sans">Research Profile</h2>
            <p className="indent-8 text-gray-800 break-all">
              {personal.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {work.length > 0 && (
          <section>
            <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b border-black mb-3 font-sans">Professional Appointments</h2>
            <div className="space-y-4">
              {work.map((exp, index) => (
                <div key={index}>
                  <div className="flex justify-between items-baseline font-bold italic text-black">
                    <span>{exp.company}</span>
                    <span className="font-sans font-bold text-[9pt] not-italic text-gray-500">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div className="font-bold text-[10pt] mb-1 uppercase tracking-tight">{exp.position}</div>
                  <ul className="list-disc ml-8 space-y-1 break-all">
                    {exp.description.map((bullet, i) => (
                      <li key={i} className="pl-1 text-gray-800">{bullet}</li>
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
            <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b border-black mb-3 font-sans">Education</h2>
            <div className="space-y-3">
              {education.map((edu, index) => (
                <div key={index} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-black">{edu.school}</span>, <span className="italic">{edu.degree}</span>
                  </div>
                  <span className="font-sans font-bold text-[9pt] text-gray-500 uppercase">{edu.graduationDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 className="text-[10pt] font-bold uppercase tracking-wider border-b border-black mb-2 font-sans">Technical Expertise</h2>
            <p className="text-[10pt] text-gray-800">
              <span className="italic font-bold">Skills & Competencies:</span> {skills.join('; ')}.
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default CompactAcademic;
