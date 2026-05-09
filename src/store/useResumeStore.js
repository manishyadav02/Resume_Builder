import { create } from 'zustand';

const initialResumeData = {
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    summary: 'A highly motivated and experienced professional...',
    github: '',
    linkedin: ''
  },
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Developer',
      startDate: '2020-01',
      endDate: 'Present',
      current: true,
      description: 'Led development of highly scalable microservices...'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'B.S. Computer Science',
      fieldOfStudy: 'Computer Science',
      graduationDate: '2019-05'
    }
  ],
  projects: [
    {
      id: '1',
      title: 'Project Management System',
      techStack: 'MERN Stack, Tailwind CSS, JWT, RBAC',
      description: 'A full-stack application to manage projects, tasks, and users with role-based access control.'
    }
  ],
  skills: 'React, Node.js, MongoDB, Tailwind CSS'
};

export const useResumeStore = create((set) => ({
  resumeData: initialResumeData,
  templateId: 'modern',
  
  updatePersonalInfo: (data) => set((state) => ({
    resumeData: { ...state.resumeData, personalInfo: { ...state.resumeData.personalInfo, ...data } }
  })),
  
  updateExperience: (data) => set((state) => ({
    resumeData: { ...state.resumeData, experience: data }
  })),
  
  updateEducation: (data) => set((state) => ({
    resumeData: { ...state.resumeData, education: data }
  })),

  updateProjects: (data) => set((state) => ({
    resumeData: { ...state.resumeData, projects: data }
  })),

  updateSkills: (skills) => set((state) => ({
    resumeData: { ...state.resumeData, skills }
  })),

  setTemplateId: (id) => set({ templateId: id }),

  // Full state replacement if needed (e.g., loading from server)
  setResumeData: (data) => set({ resumeData: data }),
}));
