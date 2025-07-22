'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StarRating from './StarRating';
import { FileBadge } from 'lucide-react';

export interface AppItemProps {
    name: string;
    category: string;
    rating: number;
    ratingCount: string;
    price: string;
    link: string;
}

export default function AppItem({ name, category, rating, ratingCount, price, link }: AppItemProps) {
    const handleGet = () => {
        window.location.href = link;
    };
    
    return (
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] dark:bg-card/30">
            <CardContent className="p-4 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 shadow-md">
                    <FileBadge className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-lg">{name}</h3>
                    <p className="text-sm text-muted-foreground">{category}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <StarRating rating={rating} />
                        <span className="text-xs text-muted-foreground">({ratingCount})</span>
                    </div>
                </div>
                <Button onClick={handleGet} variant="ghost" className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-6 font-bold">
                    {price === "Free" ? "GET" : price}
                </Button>
            </CardContent>
        </Card>
    );
}
