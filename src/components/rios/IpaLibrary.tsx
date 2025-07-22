'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Library, File } from "lucide-react";
import { type SignedFile } from './Upload';
import { useToast } from "@/hooks/use-toast";

interface IpaLibraryProps {
    signedFiles: SignedFile[];
}

export default function IpaLibrary({ signedFiles }: IpaLibraryProps) {
    const { toast } = useToast();

    const handleInstall = (fileName: string) => {
        toast({
            title: "Installation Started",
            description: `Preparing to install ${fileName}.`,
        });
        // This is a mock install link
        window.location.href = `itms-services://?action=download-manifest&url=https://example.com/mock-install.plist`;
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 font-headline">IPA Library</h1>
            {signedFiles.length === 0 ? (
                <Card className="text-center py-20 dark:bg-card">
                    <CardContent className="flex flex-col items-center justify-center">
                        <Library className="w-16 h-16 text-muted-foreground mb-4" />
                        <h2 className="text-2xl font-semibold text-muted-foreground">No Signed Apps</h2>
                        <p className="text-muted-foreground mt-2">Upload and sign an IPA to see it here.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {signedFiles.map(file => (
                        <Card key={file.id} className="dark:bg-card">
                            <CardContent className="p-4 flex items-center gap-4">
                                <File className="h-8 w-8 text-primary" />
                                <div className="flex-1">
                                    <p className="font-semibold truncate">{file.name}</p>
                                    <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                                </div>
                                <Button onClick={() => handleInstall(file.name)} className="bg-accent hover:bg-accent/90">Reinstall</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
