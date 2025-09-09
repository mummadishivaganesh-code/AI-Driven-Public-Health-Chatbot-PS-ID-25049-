'use server';

/**
 * @fileOverview A health Q&A AI agent.
 *
 * - aiHealthQA - A function that answers health-related questions.
 * - AIHealthQAInput - The input type for the aiHealthQA function.
 * - AIHealthQAOutput - The return type for the aiHealthQA function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIHealthQAInputSchema = z.object({
  query: z.string().describe('The user query about health topics.'),
  language: z.string().describe('The language in which the response should be provided.'),
});
export type AIHealthQAInput = z.infer<typeof AIHealthQAInputSchema>;

const AIHealthQAOutputSchema = z.object({
  answer: z.string().describe('The answer to the user query in the specified language.'),
});
export type AIHealthQAOutput = z.infer<typeof AIHealthQAOutputSchema>;

export async function aiHealthQA(input: AIHealthQAInput): Promise<AIHealthQAOutput> {
  return aiHealthQAFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiHealthQAPrompt',
  input: {schema: AIHealthQAInputSchema},
  output: {schema: AIHealthQAOutputSchema},
  prompt: `You are a multilingual AI chatbot designed to answer questions about health topics.

  User Query: {{{query}}}

  Respond to the query in the following language: {{{language}}}.

  Provide accurate and informative answers based on your training data.
  If you don't know the answer, respond politely that you don't know the answer.`,
});

const aiHealthQAFlow = ai.defineFlow(
  {
    name: 'aiHealthQAFlow',
    inputSchema: AIHealthQAInputSchema,
    outputSchema: AIHealthQAOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
