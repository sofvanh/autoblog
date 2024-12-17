import { generate } from "@/utils/anthropicClient";

export async function POST(request: Request) {
  const { selectedOptions, customPrompt } = await request.json();
  const fullPrompt = `You will reveive 0+ selected options and a (potentially empty) self-written description given by the user. Describe this person in 2-4 words, print nothing but the description.
   Selected options: ${selectedOptions}
   User description: ${customPrompt}`
  const maxTokens = 40;
  const response = await generate(fullPrompt, maxTokens);
  return response;
}
