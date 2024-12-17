'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { fetchUserDescription } from '@/utils/aiApiConnector';

interface UserContextProps {
  customPrompt: string;
  userDescription: string;
  selectedOptions: string[];
  setCustomPrompt: (prompt: string) => void;
  setUserDescription: (description: string) => void;
  setSelectedOptions: (options: string[]) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [userDescription, setUserDescription] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    const savedPrompt = localStorage.getItem('prompt') || '';
    const savedDescription = localStorage.getItem('userDescription') || '';
    const savedOptions = JSON.parse(localStorage.getItem('selectedOptions') || '[]');
    setCustomPrompt(savedPrompt);
    setUserDescription(savedDescription);
    setSelectedOptions(savedOptions);
  }, []);

  useEffect(() => {
    const previousPrompt = localStorage.getItem('prompt');
    const previousOptions = JSON.parse(localStorage.getItem('selectedOptions') || '[]');
    if (customPrompt === previousPrompt && selectedOptions === previousOptions) {
      return;
    }

    localStorage.setItem('prompt', customPrompt);
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    if (selectedOptions.length > 0 || customPrompt) {
      setUserDescription('loading...');
      fetchUserDescription(selectedOptions, customPrompt).then(response => {
        setUserDescription(response.text);
        localStorage.setItem('userDescription', response.text);
      }).catch(error => {
        console.error('Error fetching user description:', error);
        setUserDescription('(error)');
      });
    } else {
      setUserDescription('');
      localStorage.removeItem('userDescription');
    }
  }, [customPrompt, selectedOptions]);

  return (
    <UserContext.Provider value={{ customPrompt, userDescription, selectedOptions, setCustomPrompt, setUserDescription, setSelectedOptions }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}