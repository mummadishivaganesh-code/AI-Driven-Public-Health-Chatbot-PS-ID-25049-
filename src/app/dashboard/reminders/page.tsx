'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Syringe } from 'lucide-react';

import { getVaccineReminder } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Generating...' : 'Get Reminder'}
    </Button>
  );
}

export default function RemindersPage() {
  const initialState = { reminder: undefined, error: undefined };
  const [state, formAction] = useActionState(getVaccineReminder, initialState);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="font-headline text-3xl font-bold">
          Vaccine Reminders
        </h1>
        <p className="text-muted-foreground">
          Enter your age to get personalized vaccination recommendations from our
          AI.
        </p>
      </div>
      <Card className="shadow-lg">
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Personalized Reminder</CardTitle>
            <CardDescription>
              We'll suggest relevant vaccines based on the age provided.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="age">Age</Label>
              <Input
                type="number"
                id="age"
                name="age"
                placeholder="e.g., 5"
                required
              />
              {state?.error && (
                <p className="text-sm font-medium text-destructive">
                  {state.error}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state?.reminder && (
        <Card className="bg-primary/5 border-primary/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Syringe className="h-5 w-5 text-primary" />
              AI Recommendation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium text-primary">
              {state.reminder}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
