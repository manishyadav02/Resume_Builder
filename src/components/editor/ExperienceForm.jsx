import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Input, Textarea } from '../ui/Input';
import { Button } from '../ui/Button';
import { useResumeStore } from '../../store/useResumeStore';

export default function ExperienceForm() {
  const { resumeData, updateExperience } = useResumeStore();
  const { register, control, watch } = useForm({
    defaultValues: {
      experience: resumeData.experience
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience'
  });

  const watchedData = watch('experience');
  
  useEffect(() => {
    updateExperience(watchedData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watchedData), updateExperience]);

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Experience</h2>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => append({ company: '', position: '', startDate: '', endDate: '', description: '' })}
          className="flex items-center gap-2"
        >
          <Plus size={16} /> Add Experience
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
            <Input label="Company" {...register(`experience.${index}.company`)} placeholder="Company Name" />
            <Input label="Job Title" {...register(`experience.${index}.position`)} placeholder="Software Engineer" />
            <Input label="Start Date" type="month" {...register(`experience.${index}.startDate`)} />
            <Input label="End Date" type="month" {...register(`experience.${index}.endDate`)} />
          </div>
          <Textarea 
            label="Description" 
            {...register(`experience.${index}.description`)} 
            placeholder="Describe your responsibilities and achievements..." 
          />
        </div>
      ))}
    </div>
  );
}
