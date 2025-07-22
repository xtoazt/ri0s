import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-background/80 dark:bg-black/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary font-headline">
            Ri0S
          </Link>
        </div>
      </div>
    </header>
  );
}
