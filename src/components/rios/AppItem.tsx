'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import StarRating from './StarRating';

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
    
    // Generate a placeholder hint from the app name
    const aiHint = name.split(' ').slice(0, 2).join(' ').toLowerCase();

    return (
        <Card className="hover:shadow-md transition-shadow dark:bg-card">
            <CardContent className="p-4 flex items-center gap-4">
                <Image
                    src={`https://placehold.co/64x64.png`}
                    data-ai-hint={aiHint}
                    alt={`${name} Icon`}
                    width={64}
                    height={64}
                    className="rounded-xl"
                />
                <div className="flex-1">
                    <h3 className="font-semibold text-lg">{name}</h3>
                    <p className="text-sm text-muted-foreground">{category}</p>
                    <div className="flex items-center gap-2 mt-1">
                        <StarRating rating={rating} />
                        <span className="text-xs text-muted-foreground">({ratingCount})</span>
                    </div>
                </div>
                <Button onClick={handleGet} variant="ghost" className="bg-primary/10 text-primary hover:bg-primary/20 rounded-full px-6">
                    {price === "Free" ? "GET" : price}
                </Button>
            </CardContent>
        </Card>
    );
}
