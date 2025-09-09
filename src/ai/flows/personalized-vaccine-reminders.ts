// src/ai/flows/personalized-vaccine-reminders.ts
'use server';
/**
 * @fileOverview Personalized vaccine reminders based on user age.
 *
 * - personalizedVaccineReminder - A function that suggests relevant vaccines based on the user's age.
 * - PersonalizedVaccineReminderInput - The input type for the personalizedVaccineReminder function.
 * - PersonalizedVaccineReminderOutput - The return type for the personalizedVaccineReminder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedVaccineReminderInputSchema = z.object({
  age: z.number().describe('The age of the user in years.'),
});
export type PersonalizedVaccineReminderInput = z.infer<
  typeof PersonalizedVaccineReminderInputSchema
>;

const PersonalizedVaccineReminderOutputSchema = z.object({
  vaccineReminder: z
    .string()
    .describe('A reminder message for relevant vaccines.'),
});
export type PersonalizedVaccineReminderOutput = z.infer<
  typeof PersonalizedVaccineReminderOutputSchema
>;

export async function personalizedVaccineReminder(
  input: PersonalizedVaccineReminderInput
): Promise<PersonalizedVaccineReminderOutput> {
  return personalizedVaccineReminderFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedVaccineReminderPrompt',
  input: {schema: PersonalizedVaccineReminderInputSchema},
  output: {schema: PersonalizedVaccineReminderOutputSchema},
  prompt: `Based on the user's age, provide a personalized vaccine reminder.

If the user is a child (under 18 years old), suggest relevant childhood vaccines.
If the user is an adult (18 years or older), suggest relevant adult vaccines.

Consider the following:
- Polio vaccine is typically administered to children.
- Flu vaccine is recommended annually for all ages.
- Tdap vaccine is recommended for adults.

User's age: {{{age}}}

Provide a concise vaccine reminder message.`,
});

const personalizedVaccineReminderFlow = ai.defineFlow(
  {
    name: 'personalizedVaccineReminderFlow',
    inputSchema: PersonalizedVaccineReminderInputSchema,
    outputSchema: PersonalizedVaccineReminderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
