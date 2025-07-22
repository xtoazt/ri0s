'use client';
import { FileBadge, Library, UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
    { id: 'certificates', label: 'Certificates', icon: FileBadge },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'upload', label: 'Upload', icon: UploadCloud },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-background/95 dark:bg-black/95 backdrop-blur-sm border-t z-50">
            <div className="container mx-auto h-full">
                <div className="flex justify-around items-center h-full">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-1 text-muted-foreground w-full h-full transition-colors duration-200",
                                    isActive ? "text-primary" : "hover:text-foreground"
                                )}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <Icon className={cn("h-6 w-6", isActive ? "text-primary" : "")} />
                                <span className="text-xs font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
