'use client';
import { useState } from 'react';
import BottomNav from '@/components/rios/BottomNav';
import CertificatesList from '@/components/rios/CertificatesList';
import IpaLibrary from '@/components/rios/IpaLibrary';
import Upload, { type SignedFile } from '@/components/rios/Upload';
import Header from '@/components/rios/Header';

export default function Ri0SApp() {
    const [activeTab, setActiveTab] = useState('certificates');
    const [signedFiles, setSignedFiles] = useState<SignedFile[]>([]);

    const handleFileSigned = (file: SignedFile) => {
        setSignedFiles(prev => [...prev, file]);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'certificates':
                return <CertificatesList />;
            case 'library':
                return <IpaLibrary signedFiles={signedFiles} />;
            case 'upload':
                return <Upload onFileSigned={handleFileSigned} />;
            default:
                return <CertificatesList />;
        }
    };

    return (
        <div className="bg-background dark:bg-black text-foreground min-h-screen">
            <div id="particles" className="fixed inset-0 -z-10"></div>
            <div className="sticky top-0 z-20">
              <Header />
            </div>
            <div className="relative pb-28">
              <main className="container mx-auto px-2 sm:px-4 py-6">
                  {renderContent()}
              </main>
              <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
        </div>
    );
}
