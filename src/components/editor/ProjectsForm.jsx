import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { useResumeStore } from '../../store/useResumeStore';

export default function ProjectsForm() {
  const { resumeData, updateProjects } = useResumeStore();
  const { register, control, watch } = useForm({
    defaultValues: {
      projects: resumeData.projects || []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects'
  });

  const watchedData = watch('projects');
  
  useEffect(() => {
    updateProjects(watchedData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watchedData), updateProjects]);

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Projects</h2>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => append({ title: '', techStack: '', description: '' })}
          className="flex items-center gap-2"
        >
          <Plus size={16} /> Add Project
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-slate-100 rounded-md bg-slate-50 relative">
          <div className="absolute top-4 right-4">
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={() => remove(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
            >
              <Trash2 size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <Input label="Project Title" {...register(`projects.${index}.title`)} placeholder="Project Management System" />
            <Input label="Tech Stack" {...register(`projects.${index}.techStack`)} placeholder="MERN Stack, Tailwind CSS, JWT" />
          </div>
          <Textarea 
            label="Description" 
            {...register(`projects.${index}.description`)} 
            placeholder="Describe the project, your role, and key features..." 
          />
        </div>
      ))}
    </div>
  );
}
