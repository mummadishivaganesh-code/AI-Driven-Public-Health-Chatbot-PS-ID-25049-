import Link from 'next/link';
import { Stethoscope, MoveRight } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Swasthya AI</span>
        </div>

        <div className="max-w-md">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            AI-Powered Health Insights
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your personal health companion for disease awareness, symptom checking, and vaccination reminders.
          </p>
          <Button asChild className="mt-8 rounded-full" size="lg">
            <Link href="/login">
              Let's Chat
              <MoveRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Swasthya AI. All rights reserved.
        </div>
      </div>
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="https://picsum.photos/1200/1800"
          alt="Healthcare professional using a tablet"
          fill
          className="h-full w-full object-cover"
          data-ai-hint="health technology"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent"></div>
      </div>
    </div>
  );
}
