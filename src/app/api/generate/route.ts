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
    const { markdown, userPrompt } = await request.json();

    if (!markdown || !userPrompt) {
      return new Response('Missing required fields', { status: 400 });
    }

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

    return new Response(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating markdown:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate markdown' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}