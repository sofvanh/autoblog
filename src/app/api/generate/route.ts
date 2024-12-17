import { generate } from "@/utils/anthropicClient";

export async function POST(request: Request) {
  const { markdown, userPrompt } = await request.json();
  const fullPrompt = `You will receive a markdown file, and you will make small changes based on the requirements:
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
${markdown}`
  const maxTokens = 8192;
  const response = await generate(fullPrompt, maxTokens);
  return response;
}