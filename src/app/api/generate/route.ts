import { generate } from "@/utils/anthropicClient";


export async function POST(request: Request) {
  const { markdown, selectedOptions, customPrompt } = await request.json();
  const fullPrompt = `You will receive a markdown file, and you will make mostly small changes based on the requirements:
- Keep all the links and quotes as they are (you're allowed to move them around, or translate quotes and link titles, if the user wished so)
  - [[Example of a markdown-to-markdown link]]
  - [Example of an external link](https://example.com)
  > Example of a quote
- Retain the style of the original as much as possible, including formatting and structure, but fix typos, unclear and very informal language, etc. Unless the user has asked for big changes, in which case you can make more drastic changes.
- Try not to exclude content that seems important to the original author
- Print nothing but the modified markdown! What you return will be directly used as markdown, so make sure it's valid markdown, and nothing else.
- Do minor cleaning so that it's fit for viewing online, and suitable for the current viewer
  - By default, always explain or remove jargon, unless the user has indicated they don't mind it.
  - The user has selected the following 0+ options of interests, descriptors, preferences etc: ${selectedOptions}
  - The user has written the following description of themselves or their preferences: ${customPrompt}
- Always fulfill the author's inline wishes, and don't show the wish itself in the output (unless the use or author has explicitly asked for it)
  - {{Example of an inline wish}}

          
Markdown: 
${markdown}`
  const maxTokens = 8192;
  const response = await generate(fullPrompt, maxTokens);
  return response;
}