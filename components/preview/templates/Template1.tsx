import React from 'react';
import { CVData } from '@/types/cv';

const Template1: React.FC<{ data: CVData }> = ({ data }) => {
  const { personal, work, education, skills, interests = [] } = data;

  const fallbackInterests = interests.length > 0 ? interests : [];
  const fallbackDOB = personal.dob || '';
  const fallbackPOB = personal.pob || '';
  const fallbackGender = personal.gender || '';

  return (
    <div className="w-[210mm] text-black font-sans bg-white relative">
      {/* 1. FIXED SIDEBAR BACKGROUND */}
      <div className="hidden print:block fixed top-0 left-0 w-[32%] h-full bg-[#E5E7EB] z-0" />

      {/* 2. THE PRINT TABLE (Handles multi-page headers/margins naturally) */}
      <table className="w-full border-collapse relative z-10">
        <thead className="hidden print:table-header-group">
          <tr>
            <td>
              {/* This height creates the margin on Page 2, 3, etc. */}
              <div className="h-[25mm] w-full flex items-center justify-between px-10 text-[7.5pt] text-gray-400">
                <span className="font-bold uppercase tracking-widest">{personal.fullName || 'Resume'} — KertasKerja</span>
                <span>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            </td>
          </tr>
        </thead>
        
        <tbody>
          <tr>
            <td>
              <div className="flex flex-col min-h-[297mm]">
                {/* 3. MAIN HEADER (Covers the THEAD area on Page 1) */}
                <div className="relative z-[100] bg-white print:mt-[-25mm]">
                  <div className="flex h-[180px] border-b-2 border-black bg-white overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-[32%] h-full bg-[#E5E7EB]" />
                    <div className="w-[180px] h-full border-r-2 border-black flex-shrink-0 relative z-10">
                      {personal.photo ? (
                        <img src={personal.photo} alt={personal.fullName} className="w-full h-full object-cover grayscale" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] font-black uppercase tracking-widest bg-gray-100">Photo</div>
                      )}
                    </div>
                    <div className="flex-1 flex items-center justify-center px-10 relative z-10 bg-white">
                      <h1 className="text-4xl font-bold tracking-[0.25em] text-center uppercase leading-none text-black">
                        {personal.fullName || 'Your Full Name'}
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 relative z-20">
                  {/* SIDEBAR CONTENT */}
                  <div className="w-[32%] flex flex-col pt-10 pb-10 bg-[#E5E7EB] print:bg-transparent">
                    <div className="px-8 space-y-8">
                      <section className="break-avoid">
                        <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-4 border-b border-gray-400 pb-1 text-gray-500">Personal</h2>
                        <div className="space-y-4 text-[9pt]">
                          <div>
                            <p className="font-bold">Name</p>
                            <p className="text-gray-700 leading-tight">{personal.fullName || '—'}</p>
                          </div>
                          <div>
                            <p className="font-bold">Address</p>
                            <p className="text-gray-700 leading-tight break-all">{personal.address || '—'}</p>
                          </div>
                          <div>
                            <p className="font-bold">Phone number</p>
                            <p className="text-gray-700 leading-tight">{personal.phone || '—'}</p>
                          </div>
                          <div>
                            <p className="font-bold">Email</p>
                            <p className="text-gray-700 leading-tight break-all">{personal.email || '—'}</p>
                          </div>
                          {fallbackDOB && (
                            <div>
                              <p className="font-bold">Date of birth</p>
                              <p className="text-gray-700 leading-tight">{fallbackDOB}</p>
                            </div>
                          )}
                          {fallbackPOB && (
                            <div>
                              <p className="font-bold">Place of birth</p>
                              <p className="text-gray-700 leading-tight">{fallbackPOB}</p>
                            </div>
                          )}
                          {fallbackGender && (
                            <div>
                              <p className="font-bold">Gender</p>
                              <p className="text-gray-700 leading-tight">{fallbackGender}</p>
                            </div>
                          )}
                          {(personal.links ?? []).map(link => (
                            <div key={link.id}>
                              <p className="font-bold">{link.platform}</p>
                              <p className="text-gray-700 leading-tight break-all underline italic">
                                {link.url.replace(/^https?:\/\/(www\.)?/, '')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </section>

                      {fallbackInterests.length > 0 && (
                        <section className="break-avoid pt-4">
                          <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-4 border-b border-gray-400 pb-1 text-gray-500">Interests</h2>
                          <ul className="space-y-3">
                            {fallbackInterests.map((interest, i) => (
                              <li key={i} className="flex items-center gap-3 text-[10pt]">
                                <span className="w-2 h-2 bg-black rounded-none flex-shrink-0" />
                                <span className="text-gray-700 font-bold tracking-tight">{interest}</span>
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}
                    </div>
                  </div>

                  {/* MAIN CONTENT */}
                  <div className="w-[68%] p-10 bg-white space-y-10 z-10">
                    {personal.summary && (
                      <section className="break-avoid">
                        <p className="text-[10.5pt] leading-relaxed text-gray-800 text-justify break-all font-medium">
                          {personal.summary}
                        </p>
                      </section>
                    )}

                    {work.length > 0 && (
                      <section>
                        <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-6 border-b border-black pb-1 leading-none text-black">Work Experience</h2>
                        <div className="space-y-10">
                          {work.map((exp, index) => (
                            <div key={index} className="break-avoid">
                              <div className="flex justify-between items-baseline mb-1">
                                <h3 className="text-[11.5pt] font-black uppercase tracking-tight text-black">{exp.position}</h3>
                                <span className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest leading-none">
                                  {exp.startDate} — {exp.endDate}
                                </span>
                              </div>
                              <div className="text-[10pt] font-bold text-gray-500 mb-4 uppercase tracking-tight leading-none italic">{exp.company}</div>
                              <div className="text-[10pt] leading-relaxed text-gray-800 text-justify break-all font-medium">
                                {exp.description.join(' ')}
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {education.length > 0 && (
                      <section>
                        <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-6 border-b border-black pb-1 leading-none text-black">Education and Qualifications</h2>
                        <div className="space-y-10">
                          {education.map((edu, index) => (
                            <div key={index} className="break-avoid">
                              <div className="flex justify-between items-baseline mb-2">
                                <h3 className="text-[11pt] font-black uppercase tracking-tight leading-tight text-black">{edu.degree}</h3>
                                <span className="text-[8.5pt] font-black text-gray-400 uppercase tracking-widest leading-none">{edu.graduationDate}</span>
                              </div>
                              <div className="text-[10.5pt] font-bold text-gray-500 uppercase tracking-tight leading-none italic">{edu.school}</div>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}

                    {skills.length > 0 && (
                      <section className="break-inside-avoid">
                        <h2 className="text-lg font-black uppercase tracking-[0.2em] mb-8 border-b border-black pb-1 leading-none text-black">Skills</h2>
                        <div className="grid grid-cols-1 gap-y-6 max-w-sm">
                          {skills.map((skill, index) => {
                            const name = typeof skill === 'string' ? skill : (skill?.name || '');
                            if (!name) return null;
                            return (
                              <div key={typeof skill === 'string' ? index : skill.id} className="flex items-center justify-between group">
                                <span className="text-[10.5pt] font-black uppercase tracking-tight text-gray-800">{name}</span>
                                <div className="flex gap-2">
                                  {[1, 2, 3, 4, 5].map((dot) => (
                                    <div 
                                      key={dot} 
                                      className={`w-2.5 h-2.5 rounded-full ${dot <= (typeof skill === 'string' ? 3 : (skill?.level || 3)) ? 'bg-black' : 'bg-gray-300'}`} 
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
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Template1;
