import { Anthropic } from "@anthropic-ai/sdk";

const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
const model = 'claude-3-5-sonnet-20241022';

if (!anthropicApiKey) {
  throw new Error('API key is missing');
}

const anthropic = new Anthropic({
  apiKey: anthropicApiKey,
});

export async function generate(prompt: string, maxTokens: number) {
  try {
    const response = await anthropic.messages.create({
      model: model,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content[0].type === 'text' ? response.content[0].text : '';

    return new Response(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating text:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate text' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}