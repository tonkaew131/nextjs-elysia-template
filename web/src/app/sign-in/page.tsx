'use client';

import { useRouter } from 'next/navigation';

import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { authClient } from '@/libs/auth-client';

const useSignInWithEmailAndPassword = () => {
    return useMutation({
        mutationFn: async (
            data: Parameters<typeof authClient.signIn.email>[0]
        ) => {
            return authClient.signIn.email(data);
        },
    });
};

export default function Page() {
    const router = useRouter();
    const signInMutation = useSignInWithEmailAndPassword();

    const form = useForm({
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: ({ value }) => {
            signInMutation.mutate(
                {
                    email: value.email,
                    password: value.password,
                    rememberMe: value.rememberMe,
                },
                {
                    onSuccess: ({ error }) => {
                        if (error) {
                            toast.error('An error occurred', {
                                description: error.message,
                            });
                            return;
                        }

                        toast.success('Signed in successfully');
                        router.push('/dashboard');
                    },
                }
            );
        },
    });

    return (
        <main className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-sm p-4">
                <form
                    className="grid gap-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                >
                    <form.Field name="email">
                        {(field) => (
                            <div className="grid gap-2">
                                <Label htmlFor={field.name}>Email</Label>
                                <Input
                                    id={field.name}
                                    type="email"
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                />
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="password">
                        {(field) => (
                            <div className="grid gap-2">
                                <Label htmlFor={field.name}>Password</Label>
                                <Input
                                    id={field.name}
                                    type="password"
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                />
                            </div>
                        )}
                    </form.Field>

                    <form.Field name="rememberMe">
                        {(field) => (
                            <div className="flex items-center gap-1 text-xs">
                                <Checkbox
                                    id={field.name}
                                    checked={field.state.value}
                                    onCheckedChange={(checked) =>
                                        field.handleChange(!!checked)
                                    }
                                />
                                <Label htmlFor={field.name}>Remember me?</Label>
                            </div>
                        )}
                    </form.Field>

                    <Button
                        className="mt-4"
                        disabled={signInMutation.isPending}
                    >
                        Sign In
                    </Button>
                </form>
            </Card>
        </main>
    );
}
