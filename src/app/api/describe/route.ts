import { generate } from "@/utils/anthropicClient";

export async function POST(request: Request) {
  const { prompt } = await request.json();
  const fullPrompt = `Describe this person in 2-4 words, print nothing but the description: ${prompt}`;
  const maxTokens = 40;
  const response = await generate(fullPrompt, maxTokens);
  return response;
}
