'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { fetchUserDescription } from '@/utils/aiApiConnector';


interface UserContextProps {
  customPrompt: string;
  userDescription: string;
  selectedOptions: string[];
  userHasWishes: boolean;
  updateUserWishes: (newOptions: string[], newCustomPrompt: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [userDescription, setUserDescription] = useState<string>('');
  const [userHasWishes, setUserHasWishes] = useState<boolean>(false);

  useEffect(() => {
    const options = localStorage.getItem('selectedOptions') || '[]';
    const prompt = localStorage.getItem('prompt') || '';
    const description = localStorage.getItem('userDescription') || '';
    setSelectedOptions(JSON.parse(options));
    setCustomPrompt(prompt);
    setUserDescription(description);
  }, []);

  useEffect(() => {
    setUserHasWishes(selectedOptions.length > 0 || customPrompt !== '');
  }, [selectedOptions, customPrompt]);

  const optionsChanged = (newOptions: string[], oldOptions: string[]): boolean => {
    const changed = JSON.stringify(newOptions) !== JSON.stringify(oldOptions);
    return changed;
  }

  const updateUserWishes = (newOptions: string[], newCustomPrompt: string) => {
    let changed = false;
    if (optionsChanged(newOptions, selectedOptions)) {
      setSelectedOptions(newOptions);
      localStorage.setItem('selectedOptions', JSON.stringify(newOptions));
      changed = true;
    }
    if (newCustomPrompt !== customPrompt) {
      setCustomPrompt(newCustomPrompt);
      localStorage.setItem('prompt', newCustomPrompt);
      changed = true;
    }
    if (changed) {
      if (newOptions.length > 0 || newCustomPrompt) {
        console.log(newOptions, newCustomPrompt)
        setUserDescription('loading...');
        fetchUserDescription(newOptions, newCustomPrompt).then(response => {
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
    }
  }

  return (
    <UserContext.Provider value={{ customPrompt, userDescription, selectedOptions, userHasWishes, updateUserWishes }}>
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