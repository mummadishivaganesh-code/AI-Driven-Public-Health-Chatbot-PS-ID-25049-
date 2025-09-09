
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AlertTriangle,
  HeartPulse,
  LogOut,
  MessageSquare,
  Moon,
  PanelLeft,
  Settings,
  Stethoscope,
  Sun,
  Syringe,
  User,
} from 'lucide-react';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { useTheme } from 'next-themes';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenuItem onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span>{theme === 'light' ? 'Dark' : 'Light'} Mode</span>
    </DropdownMenuItem>
  );
}

function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="@user" />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">User</p>
            <p className="text-xs leading-none text-muted-foreground">
              user@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <ThemeToggle />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AppLogo() {
  const { open } = useSidebar();
  return (
    <Link href="/dashboard" className="flex items-center gap-2 p-2 overflow-hidden">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Stethoscope className="h-5 w-5" />
      </div>
      <span
        className={cn('font-headline text-lg font-bold', {
          'opacity-0 hidden': !open,
        })}
      >
        Swasthya AI
      </span>
    </Link>
  );
}

export default function DashboardLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', icon: MessageSquare, label: 'Chatbot' },
    {
      href: '/dashboard/symptom-checker',
      icon: HeartPulse,
      label: 'Symptom Checker',
    },
    { href: '/dashboard/alerts', icon: AlertTriangle, label: 'Outbreak Alerts' },
    { href: '/dashboard/reminders', icon: Syringe, label: 'Vaccine Reminders' },
    { href: '/dashboard/profile', icon: User, label: 'Profile' },
  ];

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon" className="border-r">
        <SidebarHeader>
          <AppLogo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} className="w-full">
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="flex" />
          </div>
          <UserNav />
        </header>
        <main className={cn('p-4 sm:p-6 lg:p-8', {
          'h-[calc(100vh-3.5rem)] p-0 sm:p-0 lg:p-0': pathname === '/dashboard'
        })}>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
