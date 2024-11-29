import { Anthropic } from "@anthropic-ai/sdk";


const anthropicApiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

if (!anthropicApiKey) {
  throw new Error('API key is missing');
}

interface AIResponse {
  text: string;
}

const anthropic = new Anthropic({
  apiKey: anthropicApiKey,
  dangerouslyAllowBrowser: true,
});

export async function fetchUserDescription(prompt: string): Promise<AIResponse> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 40,
      messages: [
        {
          role: 'user',
          content: `Describe this person in 2-4 words, print nothing but the description: ${prompt}`,
        },
      ],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    if (text) {
      return { text };
    } else {
      console.error('No text found in response!', response);
      return { text: '' };
    }
  } catch (error) {
    console.error('Error fetching user description:', error);
    return { text: '' };
  }
}

export async function fetchModifiedMarkdown(markdown: string, userPrompt: string): Promise<AIResponse> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-latest',
      max_tokens: 8192,
      messages: [
        {
          role: 'user',
          content:
            `You will receive a markdown file, and you will make small changes based on the requirements:
- Keep all the links and quotes as they are (you're allowed to move them around)
  - [[Example of a markdown-to-markdown link]]
  - [Example of an external link](https://example.com)
  > Example of a quote
- Retain the style of the original as much as possible, including formatting and structure, but fix typos, unclear and very informal language, etc.
- Don't exclude content that seems important to the original author
- Print nothing but the modified markdown! What you return will be directly used as markdown, so make sure it's valid markdown, and nothing else.
- Do minor cleaning so that it's fit for viewing online, and suitable for the current viewer, for example by removing or quickly explaining jargon
  - The description of the viewer is: ${userPrompt}
- Always fulfill the author's inline wishes, and don't show the wish itself in the output.
  - {{Example of an inline wish}}

          
Markdown: 
${markdown}`,
        },
      ],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';
    if (text) {
      return { text };
    } else {
      console.error('No text found in response!', response);
      return { text: '' };
    }
  } catch (error) {
    console.error('Error fetching modified markdown:', error);
    return { text: markdown };
  }
}