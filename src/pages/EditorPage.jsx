import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonalInfoForm from '../components/editor/PersonalInfoForm';
import ExperienceForm from '../components/editor/ExperienceForm';
import EducationForm from '../components/editor/EducationForm';
import SkillsForm from '../components/editor/SkillsForm';
import ProjectsForm from '../components/editor/ProjectsForm';
import LivePreview from '../components/preview/LivePreview';
import { useResumeStore } from '../store/useResumeStore';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';
import { LogOut } from 'lucide-react';

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState('personal');
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [isFetching, setIsFetching] = useState(true);
  const { resumeData, setResumeData } = useResumeStore();
  const { user, logout } = useAuthStore();

  // Fetch initial data
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/resumes/${user.resumeId}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        
        // Populate store with fetched data
        if (data) {
          setResumeData({
            personalInfo: data.personalInfo || { firstName: '', lastName: '', email: '', phone: '', summary: '', github: '', linkedin: '' },
            experience: data.experience || [],
            projects: data.projects || [],
            education: data.education || [],
            skills: data.skills || ''
          });
        }
      } catch (error) {
        console.error("Error fetching resume", error);
      } finally {
        setIsFetching(false);
      }
    };
    if (user?.resumeId) {
      fetchResume();
    } else {
      setIsFetching(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Real Auto-Save
  useEffect(() => {
    setSaveStatus('Saving...');
    const handler = setTimeout(async () => {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/resumes/${user.resumeId}`, resumeData, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setSaveStatus('Saved');
      } catch (error) {
        console.error("Failed to auto-save", error);
        setSaveStatus('Error saving');
      }
    }, 2000);

    return () => clearTimeout(handler);
  }, [resumeData, user.resumeId, user.token]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center px-6 sticky top-0 z-10 justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          ResumeBuilder
        </h1>
        <div className="flex items-center gap-6">
          <div className="text-sm text-slate-500 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${saveStatus === 'Saving...' ? 'animate-ping bg-yellow-400' : saveStatus === 'Error saving' ? 'bg-red-400' : 'bg-green-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${saveStatus === 'Saving...' ? 'bg-yellow-500' : saveStatus === 'Error saving' ? 'bg-red-500' : 'bg-green-500'}`}></span>
            </span>
            {saveStatus}
          </div>
          <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
            <span className="text-sm font-medium text-slate-700">{user?.name}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-slate-500 hover:text-slate-800">
              <LogOut size={16} className="mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex h-[calc(100vh-4rem)]">
        {isFetching ? (
          <div className="w-full flex items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center gap-4">
              <span className="relative flex h-8 w-8">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-8 w-8 bg-blue-500"></span>
              </span>
              <p className="text-slate-500 font-medium animate-pulse">Loading your resume...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Editor Sidebar */}
            <div className="w-1/2 overflow-y-auto border-r border-slate-200 p-6 bg-slate-50">
              <div className="max-w-2xl mx-auto">
                {/* Tabs */}
                <div className="flex space-x-1 bg-slate-200/50 p-1 rounded-lg mb-6 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('personal')}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                      activeTab === 'personal' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Personal Info
                  </button>
                  <button
                    onClick={() => setActiveTab('skills')}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                      activeTab === 'skills' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Skills
                  </button>
                  <button
                    onClick={() => setActiveTab('experience')}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                      activeTab === 'experience' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => setActiveTab('projects')}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                      activeTab === 'projects' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Projects
                  </button>
                  <button
                    onClick={() => setActiveTab('education')}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                      activeTab === 'education' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Education
                  </button>
                </div>

                {/* Form Content */}
                {activeTab === 'personal' && <PersonalInfoForm />}
                {activeTab === 'skills' && <SkillsForm />}
                {activeTab === 'experience' && <ExperienceForm />}
                {activeTab === 'projects' && <ProjectsForm />}
                {activeTab === 'education' && <EducationForm />}
                
                <div className="mt-8 text-center text-sm text-slate-500">
                  <p>Form auto-saves as you type.</p>
                </div>
              </div>
            </div>

            {/* Live Preview Area */}
            <div className="w-1/2 bg-slate-200 p-6 overflow-hidden">
              <LivePreview />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
