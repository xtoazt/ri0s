import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-background/50 dark:bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-lg">
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
