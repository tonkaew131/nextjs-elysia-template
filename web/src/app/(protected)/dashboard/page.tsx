import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { authClient } from '@/libs/auth-client';

import UploadingTest from './_component/uploading-test';

export default async function Page() {
    const session = await authClient.getSession({
        fetchOptions: {
            headers: await headers(),
        },
    });

    if (session.error) {
        return redirect('/sign-in');
    }

    return (
        <div className="flex flex-wrap gap-4 p-4">
            <Card className="grid h-fit w-fit gap-2 p-4">
                <Label>Session</Label>
                <pre>{JSON.stringify(session, null, 4)}</pre>
            </Card>

            <UploadingTest />
        </div>
    );
}
