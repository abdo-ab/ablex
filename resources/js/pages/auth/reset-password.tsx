import { update } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

interface ResetPasswordProps {
    token: string;
    email: string;
}

export default function ResetPassword({ token, email }: ResetPasswordProps) {
    return (
        <section className="bg-white dark:bg-gray-900">
            <Head title="Reset password" />

            <div className="container mx-auto flex min-h-screen items-center justify-center px-6">
                <div className="w-full max-w-md">
                    {/* Logo + Heading */}
                    <div className="mb-8 flex flex-col items-center justify-center gap-2 text-center">

                        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Reset your password
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enter a new password to regain access
                        </p>
                    </div>

                    <>
                        <Form
                            {...update.form()}
                            transform={(data) => ({ ...data, token, email })}
                            resetOnSuccess={[
                                'password',
                                'password_confirmation',
                            ]}
                        >
                            {({ processing, errors }) => (
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            value={email}
                                            readOnly
                                            className="dark:bg-gray-900 dark:text-gray-300"
                                        />
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            autoComplete="new-password"
                                            autoFocus
                                            placeholder="Password"
                                            className="dark:bg-gray-900 dark:text-gray-300"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">
                                            Confirm password
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            autoComplete="new-password"
                                            placeholder="Confirm password"
                                            className="dark:bg-gray-900 dark:text-gray-300"
                                        />
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                            className="mt-2"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-4 w-full"
                                        disabled={processing}
                                        data-test="reset-password-button"
                                    >
                                        {processing && <Spinner />}
                                        Reset password
                                    </Button>
                                </div>
                            )}
                        </Form>
                    </>
                </div>
            </div>
        </section>
    );
}
