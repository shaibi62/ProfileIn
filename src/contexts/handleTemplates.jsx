import { createContext, useContext } from 'react';
import axios from 'axios';

const TemplateContext = createContext();

export function TemplateProvider({ children }) {
  const Baseurl = 'http://localhost/Profilein-Backend/';

  const getTemplates = async () => {
    try {
      const res = await axios.get(`${Baseurl}Templates.php`);
      if (res.data.success) {
        return res.data.templates;
      } else {
        console.error("Error fetching templates:", res.data.message);
        return [];
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      return [];
    }
  };

  const value = { getTemplates };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
}

// Custom hook to use the TemplateContext
export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};
