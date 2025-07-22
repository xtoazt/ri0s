'use client';
import { useState, useRef } from 'react';
import { UploadCloud, File, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface UploadedFile {
    id: string; // This will now be the ID from the signing server
    name: string;
    size: number;
    status: 'uploading' | 'success' | 'error' | 'signing' | 'signed' | 'installing';
    progress: number;
    errorMessage?: string;
    selectedCert: string;
}

export interface SignedFile {
    id: string;
    name: string;
    size: number;
}

interface UploadProps {
    onFileSigned: (file: SignedFile) => void;
}

export default function Upload({ onFileSigned }: UploadProps) {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const handleFileSelect = (selectedFiles: FileList | null) => {
        if (!selectedFiles) return;

        const ipaFiles = Array.from(selectedFiles).filter(file => file.name.endsWith('.ipa'));
        
        if (ipaFiles.length !== selectedFiles.length) {
            toast({
                title: 'Invalid File Type',
                description: 'Only .ipa files are allowed.',
                variant: 'destructive'
            });
        }
        
        if (ipaFiles.length > 0) {
            uploadFiles(ipaFiles);
        }
    };
    
    const uploadFiles = (filesToUpload: File[]) => {
        const formData = new FormData();
        filesToUpload.forEach(file => {
            formData.append('files[]', file);
        });

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://sign.skibiditech.co/upload_ipa.php', true);

        const tempId = `temp-${Date.now()}`;
        const tempFile: UploadedFile = {
            id: tempId,
            name: filesToUpload.map(f => f.name).join(', '),
            size: filesToUpload.reduce((acc, f) => acc + f.size, 0),
            status: 'uploading',
            progress: 0,
            selectedCert: '1',
        };
        setFiles(prev => [tempFile, ...prev]);

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                setFiles(prev => prev.map(f => f.id === tempId ? { ...f, progress: percentComplete } : f));
            }
        };

        xhr.onload = () => {
            setFiles(prev => prev.filter(f => f.id !== tempId)); // Remove temporary entry
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.success && response.data && response.data.uploaded_files) {
                        const newFiles: UploadedFile[] = response.data.uploaded_files.map((file: any) => ({
                            id: file.name, // The server returns the ID in the 'name' field
                            name: file.original_name,
                            size: file.size,
                            status: 'success',
                            progress: 100,
                            selectedCert: '1',
                        }));
                        setFiles(prev => [...newFiles, ...prev]);
                        toast({ title: "Upload complete", description: "Your files are ready to be signed." });
                    } else {
                        const errorMsg = response.data?.errors?.join(', ') || 'Unknown upload error.';
                        toast({ title: 'Upload Failed', description: errorMsg, variant: 'destructive' });
                    }
                } catch (e) {
                    toast({ title: 'Upload Failed', description: 'Invalid response from server.', variant: 'destructive' });
                }
            } else {
                toast({ title: 'Upload Failed', description: `Server returned status ${xhr.status}`, variant: 'destructive' });
            }
        };

        xhr.onerror = () => {
            setFiles(prev => prev.filter(f => f.id !== tempId));
            toast({ title: 'Upload Error', description: 'Could not connect to the server.', variant: 'destructive' });
        };
        
        xhr.send(formData);
    };

    const handleSign = async (fileId: string) => {
        const fileToSign = files.find(f => f.id === fileId);
        if (!fileToSign) return;

        setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'signing' } : f));

        try {
            await fetch(`https://sign.skibiditech.co/sign.php?app=${fileId}&cert=${fileToSign.selectedCert}&rid=${Math.random()}`, { 
                method: "POST",
                mode: 'no-cors' 
            });

            // Since we can't read the response in no-cors mode, we assume success and proceed.
            setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'signed' } : f));
            onFileSigned({ id: fileToSign.id, name: fileToSign.name, size: fileToSign.size });
            toast({
                title: "Signing Complete",
                description: `${fileToSign.name} has been signed. You can now install it.`,
            });
        } catch (error) {
            // This catch block will now only catch true network errors (e.g., DNS failure, no internet)
            setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'error', errorMessage: 'Network error during signing.' } : f));
            toast({ title: "Signing Failed", description: 'Could not connect to the signing server. Please check your network connection.', variant: 'destructive' });
        }
    };
    
    const handleInstall = (fileId: string) => {
        const fileToInstall = files.find(f => f.id === fileId);
        if (!fileToInstall) return;

        toast({
            title: "Installation Started",
            description: `Your device will now ask for confirmation to install ${fileToInstall.name}.`,
        });

        const manifestUrl = `https://sign.skibiditech.co/generate_plist.php?app=${fileId}&rid=${Math.random()}`;
        window.location.href = `itms-services://?action=download-manifest&url=${encodeURIComponent(manifestUrl)}`;
        
        setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: 'installing' } : f));
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    
    const handleCertChange = (fileId: string, value: string) => {
        setFiles(prev => prev.map(f => f.id === fileId ? { ...f, selectedCert: value } : f));
    };


    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 font-headline">Upload & Sign</h1>
            <Card 
                className={cn(
                    "border-2 border-dashed transition-all dark:bg-card",
                    isDragging ? "border-primary bg-primary/10" : "border-border"
                )}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFileSelect(e.dataTransfer.files); }}
            >
                <CardContent className="p-8 text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Drag & drop or click to upload</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Select .ipa files to sign</p>
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        accept=".ipa" 
                        multiple 
                        className="hidden"
                        onChange={(e) => handleFileSelect(e.target.files)}
                    />
                    <Button variant="outline" className="mt-4">Choose Files</Button>
                </CardContent>
            </Card>

            {files.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Uploads</h2>
                    <div className="space-y-4">
                        {files.map(file => (
                            <Card key={file.id} className="dark:bg-card">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <File className="h-8 w-8 text-primary" />
                                    <div className="flex-1">
                                        <p className="font-semibold truncate">{file.name}</p>
                                        <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                                        {(file.status === 'uploading' || file.status === 'signing') && <Progress value={file.progress} className="mt-2 h-2" />}
                                        {file.status === 'error' && <p className="text-sm text-destructive">{file.errorMessage}</p>}
                                    </div>
                                    <div className="flex items-center gap-2 min-w-[220px]">
                                        {file.status === 'success' && (
                                            <>
                                                <Select value={file.selectedCert} onValueChange={(value) => handleCertChange(file.id, value)}>
                                                    <SelectTrigger className="w-[120px]">
                                                        <SelectValue placeholder="Certificate" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1">Vietnam</SelectItem>
                                                        <SelectItem value="2">Vietnam 2</SelectItem>
                                                        <SelectItem value="3">Vietnam 3</SelectItem>
                                                        <SelectItem value="4">Vietnam 4</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Button onClick={() => handleSign(file.id)}>Sign</Button>
                                            </>
                                        )}
                                        {file.status === 'signing' && <><Loader2 className="h-5 w-5 animate-spin text-muted-foreground" /> <span>Signing...</span></>}
                                        {(file.status === 'signed' || file.status === 'installing') && <Button onClick={() => handleInstall(file.id)} className="bg-accent hover:bg-accent/90">Install</Button>}
                                        {file.status === 'uploading' && <span className="text-sm text-muted-foreground">{Math.round(file.progress)}%</span>}
                                        {file.status === 'error' && <Button variant="destructive" onClick={() => handleSign(file.id)}>Retry</Button>}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
