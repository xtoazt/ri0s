'use client';
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from 'next/link';

const tutorialSteps = [
    {
        title: "Download Profile",
        description: "Click the button below to download the required configuration profile for your iOS device. This is the first and most important step.",
        image: "https://placehold.co/800x400",
        dataAiHint: "download cloud",
        action: "download"
    },
    {
        title: "Open Settings",
        description: "After the download is complete, navigate to and open the 'Settings' app on your iPhone or iPad.",
        image: "https://placehold.co/800x400",
        dataAiHint: "mobile settings",
    },
    {
        title: "Locate Profile",
        description: "At the top of the Settings menu, you should see a new option labeled 'Profile Downloaded'. Tap on it to proceed with the installation.",
        image: "https://placehold.co/800x400",
        dataAiHint: "user profile",
    },
    {
        title: "Install the Profile",
        description: "Tap 'Install' in the top-right corner. You may be asked to enter your device passcode to authorize the installation.",
        image: "https://placehold.co/800x400",
        dataAiHint: "security shield",
    },
    {
        title: "All Set!",
        description: "Congratulations! The Ri0S profile is now installed. The shortcut that's downloaded is unnecessary, so you can ignore or delete it. Once you're finished, come back here to continue.",
        image: "https://placehold.co/800x400",
        dataAiHint: "success checkmark",
        action: "proceed"
    }
];

export default function Tutorial() {
  return (
    <Card className="w-full max-w-4xl shadow-xl dark:bg-card/30 border-white/10">
        <CardContent className="p-0">
             <Carousel className="w-full">
                <CarouselContent>
                    {tutorialSteps.map((step, index) => (
                        <CarouselItem key={index}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                                <div className="relative h-64 md:h-full min-h-[300px]">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                                        data-ai-hint={step.dataAiHint}
                                    />
                                </div>
                                <div className="p-8 flex flex-col justify-center">
                                    <h3 className="text-2xl font-bold mb-4 font-headline text-primary">Step {index + 1}: {step.title}</h3>
                                    <p className="text-muted-foreground mb-6">{step.description}</p>
                                    {step.action === 'download' && (
                                        <a href="/signed_khoindvn.mobileconfig" download>
                                            <Button className="shadow-lg hover:shadow-xl transition-shadow">
                                                <Download className="mr-2 h-4 w-4" />
                                                Download Profile
                                            </Button>
                                        </a>
                                    )}
                                    {step.action === 'proceed' && (
                                        <Link href="/app" passHref>
                                            <Button className="bg-accent hover:bg-accent/90 shadow-lg hover:shadow-xl transition-shadow">
                                                Proceed to App
                                                <ChevronRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex left-4 text-white bg-black/30 hover:bg-black/50 border-white/20" />
                <CarouselNext className="hidden sm:flex right-4 text-white bg-black/30 hover:bg-black/50 border-white/20" />
            </Carousel>
        </CardContent>
    </Card>
  );
}
