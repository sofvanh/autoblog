import { Anthropic } from "@anthropic-ai/sdk";


interface AIResponse {
  text: string;
}

export async function fetchUserDescription(prompt: string): Promise<AIResponse> {
  try {
    const response = await fetch('/api/describe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate description');
    }

    const data = await response.json();
    return { text: data.text };
  } catch (error) {
    console.error('Error fetching user description:', error);
    return { text: '' };
  }
}

export async function fetchModifiedMarkdown(markdown: string, userPrompt: string): Promise<AIResponse> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ markdown, userPrompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate markdown');
    }

    const data = await response.json();
    return { text: data.text };
  } catch (error) {
    console.error('Error fetching modified markdown:', error);
    return { text: markdown };
  }
}