import { create } from 'zustand';

// Check if user is already logged in via localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

export const useAuthStore = create((set) => ({
  user: userInfoFromStorage,
  
  login: (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    set({ user: userData });
  },
  
  logout: () => {
    localStorage.removeItem('userInfo');
    set({ user: null });
  }
}));
