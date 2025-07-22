import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Info, Server, Globe, ShieldCheck, Lightbulb } from 'lucide-react';

const credits = [
  { role: 'DNS', name: 'Pork the Jork', icon: Globe },
  { role: 'Original Base', name: 'Skibidi Tech', icon: Server },
  { role: 'Certificates', name: 'WSF', icon: ShieldCheck },
  { role: 'Site/Idea', name: 'Rohan', icon: Lightbulb },
];

export default function Header() {
  return (
    <header className="bg-background/50 dark:bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary font-headline">
            Ri0S
          </Link>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-5 w-5" />
                <span className="sr-only">Credits</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Credits</h4>
                  <p className="text-sm text-muted-foreground">
                    This project was made possible by the following contributors.
                  </p>
                </div>
                <div className="grid gap-2">
                  {credits.map((credit) => {
                    const Icon = credit.icon;
                    return (
                      <div
                        key={credit.name}
                        className="grid grid-cols-[25px_1fr] items-start pb-2 last:pb-0 last:border-b-0 border-b"
                      >
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" >
                          <Icon className="h-4 w-4 -translate-x-1 -translate-y-1" />
                        </span>
                        <div className="grid gap-1">
                          <p className="text-sm font-medium leading-none">
                            {credit.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {credit.role}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
