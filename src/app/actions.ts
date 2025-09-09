
'use server';

import { z } from 'zod';
import { aiHealthQA } from '@/ai/flows/ai-health-qa';
import { personalizedVaccineReminder } from '@/ai/flows/personalized-vaccine-reminders';

const healthQASchema = z.object({
  query: z.string().min(1, 'Query cannot be empty.'),
  language: z.string(),
});

export async function getHealthAnswer(query: string, language: string): Promise<{ answer: string | null; error: string | null }> {
  const validatedFields = healthQASchema.safeParse({ query, language });

  if (!validatedFields.success) {
    return {
      answer: null,
      error: 'Invalid input.',
    };
  }

  try {
    const result = await aiHealthQA({ query, language });
    return { answer: result.answer, error: null };
  } catch (error) {
    console.error(error);
    return { answer: null, error: 'An error occurred while fetching the answer.' };
  }
}

const reminderSchema = z.object({
  age: z.coerce.number().int().positive('Age must be a positive number.'),
});

type ReminderState = {
  reminder?: string | null;
  error?: string | null;
};

export async function getVaccineReminder(
  prevState: ReminderState,
  formData: FormData
): Promise<ReminderState> {
  const validatedFields = reminderSchema.safeParse({
    age: formData.get('age'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.age?.[0],
    };
  }

  try {
    const result = await personalizedVaccineReminder({ age: validatedFields.data.age });
    return { reminder: result.vaccineReminder };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to generate reminder. Please try again.' };
  }
}
