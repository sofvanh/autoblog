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
          content: `Here is a markdown file that hasn't been polished for viewing. Making as few changes as possible, modify it so that it's fit for viewing online, and consider personalizing it slightly for this particular viewer using the following prompt: ${userPrompt}. Try to retain the style of the original as much as possible, including any links and other formatting. Don't exclude content that seems important to the original author. Print nothing but the modified markdown. Don't address the viewer directly, unless so is done in the original. The background of the viewer is only relevant as far as presenting the information in a way that is legible to the viewer.
          Markdown: ${markdown}`,
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