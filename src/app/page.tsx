import Header from '@/components/rios/Header';
import Tutorial from '@/components/rios/Tutorial';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-black">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <Image
            src="/logo.png"
            alt="Ri0S Logo"
            width={128}
            height={128}
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4 font-headline">
            Set Up Ri0S on Your Device
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Follow this simple step-by-step guide to install the required
            profile and get started with the Ri0S App Store.
          </p>
        </div>
        
        <Tutorial />
        
        <div className="text-center mt-16">
            <Link href="/app" passHref>
                <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-shadow">
                    Go to Ri0S App
                </Button>
            </Link>
        </div>
      </main>
      <footer className="py-4 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Ri0S Installer. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
