import { login } from '@/routes';
import { email } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <section className="bg-white dark:bg-gray-900">
            <Head title="Forgot password" />

            <div className="container mx-auto flex min-h-screen items-center justify-center px-6">
                <div className="w-full max-w-md">
                    <div className="mb-8 flex flex-col items-center justify-center gap-2 text-center">

                        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Forgot password
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enter your email to receive a password reset link
                        </p>
                    </div>

                    <Form {...email.form()} className="flex flex-col gap-6">
                        {({ processing, errors }) => (
                            <>
                                {status && (
                                    <div className="mb-4 text-center text-sm font-medium text-green-600">
                                        {status}
                                    </div>
                                )}

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoComplete="off"
                                        autoFocus
                                        placeholder="email@example.com"
                                        className="dark:bg-gray-900 dark:text-gray-300"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <Button
                                    type="submit"
                                    className="mt-4 w-full"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    )}
                                    Email password reset link
                                </Button>

                                <div className="mt-4 text-center text-sm text-muted-foreground">
                                    Or, return to{' '}
                                    <TextLink href={login()}>log in</TextLink>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </section>
    );
}
