import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Textarea } from '../ui/Input';
import { useResumeStore } from '../../store/useResumeStore';

export default function SkillsForm() {
  const { resumeData, updateSkills } = useResumeStore();
  const { register, watch } = useForm({
    defaultValues: {
      skills: resumeData.skills
    }
  });

  const watchedData = watch('skills');
  
  useEffect(() => {
    updateSkills(watchedData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedData, updateSkills]);

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Skills</h2>
      <p className="text-sm text-slate-500 mb-4">
        Enter your skills separated by commas (e.g., React, Node.js, Project Management).
      </p>
      <Textarea 
        label="Technical & Soft Skills" 
        {...register('skills')} 
        placeholder="React, Node.js, TypeScript, etc..." 
        rows={6}
      />
    </div>
  );
}
