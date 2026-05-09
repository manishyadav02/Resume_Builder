import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Input, Textarea } from '../ui/Input';
import { useResumeStore } from '../../store/useResumeStore';

export default function PersonalInfoForm() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { register, watch } = useForm({
    defaultValues: resumeData.personalInfo
  });

  // Watch for all changes and update the global store for Live Preview
  const watchedData = watch();
  
  useEffect(() => {
    // In a real app we might debounce this if it causes performance issues,
    // but Zustand is usually fast enough for direct updates.
    updatePersonalInfo(watchedData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(watchedData), updatePersonalInfo]);

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-sm border border-slate-200">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Personal Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="First Name" {...register('firstName')} placeholder="John" />
        <Input label="Last Name" {...register('lastName')} placeholder="Doe" />
        <Input label="Email" type="email" {...register('email')} placeholder="john@example.com" />
        <Input label="Phone" {...register('phone')} placeholder="+1 234 567 890" />
        <Input label="GitHub URL" {...register('github')} placeholder="github.com/johndoe" />
        <Input label="LinkedIn URL" {...register('linkedin')} placeholder="linkedin.com/in/johndoe" />
      </div>
      <Textarea label="Professional Summary" {...register('summary')} placeholder="A brief summary of your professional background..." />
    </div>
  );
}
