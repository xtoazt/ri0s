import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Library } from "lucide-react";

export default function IpaLibrary() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 font-headline">IPA Library</h1>
            <Card className="text-center py-20 dark:bg-card">
                <CardContent className="flex flex-col items-center justify-center">
                    <Library className="w-16 h-16 text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-semibold text-muted-foreground">Coming Soon!</h2>
                    <p className="text-muted-foreground mt-2">This section is under construction.</p>
                </CardContent>
            </Card>
        </div>
    );
}
