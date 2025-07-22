import AppItem, { type AppItemProps } from './AppItem';
import certsData from '@/data/certs.json';

export default function CertificatesList() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 font-headline">Certificates</h1>
            <div className="grid grid-cols-1 gap-4">
                {certsData.map((cert, index) => (
                    <AppItem key={index} {...(cert as AppItemProps)} />
                ))}
            </div>
        </div>
    );
}
