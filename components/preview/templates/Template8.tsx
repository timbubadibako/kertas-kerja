import React from 'react';
import { CVData } from '@/types/cv';
import IconRenderer from '../IconRenderer';

const Template8: React.FC<{ data: CVData }> = ({ data }) => {
  const { personal, work, education, skills, interests = [] } = data;

  const fallbackInterests = interests.length > 0 ? interests : [];
  const fallbackDOB = personal.dob || '';
  const fallbackPOB = personal.pob || '';
  const fallbackGender = personal.gender || '';

  return (
    <div className="flex h-full min-h-[297mm] w-[210mm] text-black font-sans bg-white overflow-hidden p-0">
      {/* SIDEBAR (Left - 35%) */}
      <div className="w-[35%] bg-[#F3F4F6] flex flex-col pt-0 pb-10 relative">
        {/* HEADER AREA (Navy) */}
        <div className="bg-[#2D3154] pt-12 pb-20 px-6 text-center relative">
          <h1 className="text-xl font-bold tracking-[0.15em] uppercase text-white leading-tight break-words">
            {personal.fullName || 'Your Full Name'}
          </h1>
          
          {/* Decorative Wave SVG */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="h-20 w-full">
              <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className="fill-[#F3F4F6]"></path>
              <path d="M0,0 C150,100 350,-50 500,50 L500,0 L0,0 Z" className="fill-[#2D3154] opacity-20 translate-y-1"></path>
            </svg>
          </div>
        </div>

        {/* Profile Photo (Circle, Overlapping) */}
        <div className="relative -mt-16 self-center z-10">
          <div className="w-32 h-32 rounded-full border-[6px] border-white shadow-lg overflow-hidden bg-gray-200">
            {personal.photo ? (
              <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px] font-black uppercase tracking-widest">Photo</div>
            )}
          </div>
        </div>

        {/* PERSONAL Section */}
        <div className="px-8 mt-10 space-y-6 flex-1 text-gray-600">
          <section>
            <h2 className="text-xl font-bold text-gray-400 mb-6 border-b border-gray-300 pb-1 uppercase tracking-tighter">Personal</h2>
            <div className="space-y-4">
              {personal.address && (
                <div className="flex items-start gap-3">
                  <IconRenderer platform="address" size={16} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-[9pt] font-bold text-gray-800 uppercase tracking-tight">Address</p>
                    <p className="text-[9pt] leading-snug break-words">{personal.address}</p>
                  </div>
                </div>
              )}

              {personal.phone && (
                <div className="flex items-start gap-3">
                  <IconRenderer platform="phone" size={16} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-[9pt] font-bold text-gray-800 uppercase tracking-tight">Phone</p>
                    <p className="text-[9pt] leading-snug">{personal.phone}</p>
                  </div>
                </div>
              )}

              {personal.email && (
                <div className="flex items-start gap-3">
                  <IconRenderer platform="mail" size={16} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-[9pt] font-bold text-gray-800 uppercase tracking-tight">Email</p>
                    <p className="text-[9pt] leading-snug break-all">{personal.email}</p>
                  </div>
                </div>
              )}

              {fallbackDOB && (
                <div className="flex items-start gap-3">
                  <IconRenderer platform="calendar" size={16} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-[9pt] font-bold text-gray-800 uppercase tracking-tight">Date of birth</p>
                    <p className="text-[9pt] leading-snug">{fallbackDOB}</p>
                  </div>
                </div>
              )}

              {fallbackPOB && (
                <div className="flex items-start gap-3">
                  <IconRenderer platform="map" size={16} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-[9pt] font-bold text-gray-800 uppercase tracking-tight">Place of birth</p>
                    <p className="text-[9pt] leading-snug">{fallbackPOB}</p>
                  </div>
                </div>
              )}

              {fallbackGender && (
                <div className="flex items-start gap-3">
                  <IconRenderer platform="user" size={16} className="text-gray-400 mt-1" />
                  <div>
                    <p className="text-[9pt] font-bold text-gray-800 uppercase tracking-tight">Gender</p>
                    <p className="text-[9pt] leading-snug">{fallbackGender}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* INTERESTS Section */}
          {fallbackInterests.length > 0 && (
            <section className="mt-auto pt-10">
              <h2 className="text-xl font-bold text-gray-400 mb-4 border-b border-gray-300 pb-1 uppercase tracking-tighter">Interests</h2>
              <ul className="space-y-3">
                {fallbackInterests.map((interest, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-gray-400 flex-shrink-0" />
                    <span className="text-[10pt] font-medium">{interest}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      {/* MAIN CONTENT (Right - 65%) */}
      <div className="w-[65%] p-12 bg-white space-y-12">
        {/* Summary */}
        {personal.summary && (
          <section>
            <p className="text-[10.5pt] leading-relaxed text-gray-800 text-justify break-words font-medium">
              {personal.summary}
            </p>
          </section>
        )}

        {/* WORK EXPERIENCE */}
        {work.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2 uppercase tracking-tighter text-black">Work experience</h2>
            <div className="space-y-10">
              {work.map((exp, index) => (
                <div key={index} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[11.5pt] font-bold text-black">{exp.position}</h3>
                    <span className="text-[9pt] font-bold text-gray-400">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="text-[10pt] font-bold text-gray-500 mb-3 uppercase tracking-widest leading-none">{exp.company}</div>
                  <p className="text-[10pt] leading-relaxed text-gray-800 text-justify break-words font-medium">
                    {exp.description.join(' ')}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {education.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2 uppercase tracking-tighter text-black">Education</h2>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[11.5pt] font-bold text-black">{edu.degree}</h3>
                    <span className="text-[9pt] font-bold text-gray-400">{edu.graduationDate}</span>
                  </div>
                  <div className="text-[10pt] font-bold text-gray-500 uppercase tracking-widest leading-none">{edu.school}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS with Dots (Move entire section) */}
        {skills.length > 0 && (
          <section className="break-inside-avoid">
            <h2 className="text-xl font-bold text-gray-800 mb-8 border-b border-gray-100 pb-2 uppercase tracking-tighter text-black">Skills</h2>
            <div className="grid grid-cols-1 gap-y-6">
              {skills.map((skill, index) => {
                const name = typeof skill === 'string' ? skill : (skill?.name || '');
                if (!name) return null;
                return (
                  <div key={typeof skill === 'string' ? index : skill.id} className="flex items-center justify-between group max-w-sm">
                    <span className="text-[10.5pt] font-bold text-gray-800 uppercase tracking-tight">{name}</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div 
                          key={dot} 
                          className={`w-3 h-3 rounded-full ${dot <= (typeof skill === 'string' ? 3 : (skill?.level || 3)) ? 'bg-[#2D3154]' : 'bg-gray-200'}`} 
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Template8;
