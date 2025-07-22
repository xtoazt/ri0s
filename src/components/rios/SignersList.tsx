import AppItem, { type AppItemProps } from './AppItem';
import appsData from '@/data/apps.json';

export default function SignersList() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 font-headline">Signers</h1>
            <div className="grid grid-cols-1 gap-4">
                {appsData.map((app, index) => (
                    <AppItem key={index} {...(app as AppItemProps)} />
                ))}
            </div>
        </div>
    );
}
