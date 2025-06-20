import { Anthropic } from "@anthropic-ai/sdk";

const model = 'claude-sonnet-4-20250514';

export async function generate(prompt: string, maxTokens: number) {
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

  if (!anthropicApiKey) {
    return new Response(JSON.stringify({ error: 'API key is missing' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const anthropic = new Anthropic({
    apiKey: anthropicApiKey,
  });

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