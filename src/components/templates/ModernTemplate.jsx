import React from 'react';

export default function ModernTemplate({ data }) {
  const { personalInfo, experience, projects, education, skills } = data;

  return (
    <div className="bg-white w-full h-full p-8 shadow-sm print:shadow-none min-h-[1056px] font-sans text-slate-800">
      {/* Header */}
      <header className="border-b-2 border-slate-800 pb-4 mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-wider text-slate-900">
          {personalInfo.firstName} <span className="text-blue-600">{personalInfo.lastName}</span>
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-slate-600 font-medium">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.github && (
            <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              GitHub
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <p className="text-slate-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Skills */}
      {skills && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 mb-4 border-b pb-1">Technical Skills</h2>
          <p className="text-sm text-slate-700 leading-relaxed">{skills}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 mb-4 border-b pb-1">Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-slate-800">{exp.position}</h3>
                    <div className="text-blue-600 font-medium">{exp.company}</div>
                  </div>
                  <div className="text-sm text-slate-500 font-medium whitespace-nowrap">
                    {exp.startDate} - {exp.endDate ? exp.endDate : 'Present'}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-sm text-slate-700 leading-relaxed mt-2 whitespace-pre-line">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 mb-4 border-b pb-1">Projects</h2>
          <div className="space-y-4">
            {projects.map((proj, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-slate-800">{proj.title}</h3>
                    {proj.techStack && (
                      <div className="text-blue-600 font-medium text-sm mt-0.5">
                        {proj.techStack}
                      </div>
                    )}
                  </div>
                </div>
                {proj.description && (
                  <div className="mt-2 p-3 bg-slate-50 border border-slate-100 rounded text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {proj.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 mb-4 border-b pb-1">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-800">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</h3>
                  <div className="text-slate-600 font-medium">{edu.institution}</div>
                </div>
                <div className="text-sm text-slate-500 font-medium whitespace-nowrap">
                  {edu.graduationDate}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
