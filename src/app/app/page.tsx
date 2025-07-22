'use client';
import { useState } from 'react';
import BottomNav from '@/components/rios/BottomNav';
import SignersList from '@/components/rios/SignersList';
import CertificatesList from '@/components/rios/CertificatesList';
import IpaLibrary from '@/components/rios/IpaLibrary';
import Upload from '@/components/rios/Upload';
import Header from '@/components/rios/Header';

export default function Ri0SApp() {
    const [activeTab, setActiveTab] = useState('signers');

    const renderContent = () => {
        switch (activeTab) {
            case 'signers':
                return <SignersList />;
            case 'certificates':
                return <CertificatesList />;
            case 'library':
                return <IpaLibrary />;
            case 'upload':
                return <Upload />;
            default:
                return <SignersList />;
        }
    };

    return (
        <div className="bg-background dark:bg-black text-foreground min-h-screen">
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
