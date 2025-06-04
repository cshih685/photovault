"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Camera, 
  Image, 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function NavigationBar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', href: '/', icon: <Camera className="h-4 w-4 mr-2" /> },
    { name: 'Gallery', href: '/gallery', icon: <Image className="h-4 w-4 mr-2" /> },
    { name: 'Marketplace', href: '/marketplace', icon: <ShoppingCart className="h-4 w-4 mr-2" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Camera className="h-6 w-6" />
            <span className="hidden sm:inline-block font-bold">PhotoVault</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          {isSearchOpen ? (
            <div className="relative w-full max-w-sm md:max-w-md flex items-center">
              <input 
                type="text" 
                placeholder="Search photos..." 
                className="w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button 
                variant="ghost" 
                className="absolute right-0" 
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          
          <nav className="hidden sm:flex space-x-2">
            <Link href="/auth/signin">
              <Button variant="outline">Sign in</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Join</Button>
            </Link>
          </nav>
          
          <ThemeToggle />
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="sm:max-w-xs">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center py-2 text-base font-medium transition-colors hover:text-primary",
                      pathname === item.href
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
                <Link 
                  href="/auth/signin" 
                  className="flex items-center py-2 text-base font-medium transition-colors hover:text-primary"
                >
                  <User className="h-4 w-4 mr-2" />
                  Sign in
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}