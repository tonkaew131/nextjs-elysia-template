import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { authClient } from '@/libs/auth-client';

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
        <>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </>
    );
}
