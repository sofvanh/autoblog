import { Anthropic } from '@anthropic-ai/sdk';
import React, { createContext, useState, ReactNode, useEffect } from 'react';


const anthropicApiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

interface UserContextProps {
  prompt: string;
  userDescription: string;
  setPrompt: (prompt: string) => void;
  setUserDescription: (description: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [userDescription, setUserDescription] = useState<string>('');

  useEffect(() => {
    if (prompt) {
      console.log('prompt', prompt);
      console.log('anthropicApiKey', anthropicApiKey);

      if (!anthropicApiKey) {
        console.error('API key is missing');
        return;
      }

      const anthropic = new Anthropic({
        apiKey: anthropicApiKey,
        dangerouslyAllowBrowser: true,
      });

      anthropic.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 150,
        messages: [
          {
            role: 'user',
            content: `Describe this person in 2-4 words, print nothing but the description: ${prompt}`,
          },
        ],
      })
        .then(response => {
          const text = response.content[0].type === 'text' ? response.content[0].text : '';
          if (text) {
            setUserDescription(text);
          } else {
            console.error('No text found in response!', response);
          }
        })
        .catch(error => {
          console.error('Error fetching user description:', error);
        });
    }
  }, [prompt]);

  return (
    <UserContext.Provider value={{ prompt, userDescription, setPrompt, setUserDescription }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
