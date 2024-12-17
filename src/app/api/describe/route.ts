import { Anthropic } from "@anthropic-ai/sdk";

const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

if (!anthropicApiKey) {
  throw new Error('API key is missing');
}

const anthropic = new Anthropic({
  apiKey: anthropicApiKey,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return new Response('Missing prompt', { status: 400 });
    }

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

    return new Response(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating description:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate description' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}