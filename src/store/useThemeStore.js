import { create } from "zustand";

// Get saved theme or default to light
const savedTheme = localStorage.getItem("preferred-theme") || "light";

// Apply theme to html element immediately
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

export const useThemeStore = create((set) => ({
  theme: savedTheme,
  setTheme: (theme) => {
    localStorage.setItem("preferred-theme", theme);
    if (typeof document !== 'undefined') {
      // Force theme application
      const html = document.documentElement;
      html.removeAttribute('data-theme');
      html.setAttribute('data-theme', theme);
      
      // Also apply to body as fallback
      const body = document.body;
      body.removeAttribute('data-theme');
      body.setAttribute('data-theme', theme);
      
      console.log('Theme changed to:', theme);
    }
    set({ theme });
  },
}));