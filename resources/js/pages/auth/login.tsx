import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <section className="bg-white dark:bg-gray-900">
            <Head title="Log in" />

            <div className="container mx-auto flex min-h-screen items-center justify-center px-6">
                <div className="w-full max-w-md">
                    <div className="mb-8 flex flex-col items-center justify-center gap-2 text-center">

                        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Log in to Ablex
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enter your details to access your account
                        </p>
                    </div>

                    <>
                        {/* form start */}
                        <Form
                            {...store.form()}
                            resetOnSuccess={['password']}
                            className="flex flex-col gap-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">
                                                Email address
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="email@example.com"
                                                className="dark:bg-gray-900 dark:text-gray-300"
                                            />
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <div className="flex items-center">
                                                <Label htmlFor="password">
                                                    Password
                                                </Label>

                                                {canResetPassword && (
                                                    <TextLink
                                                        href={request()}
                                                        className="ml-auto text-sm"
                                                        tabIndex={5}
                                                    >
                                                        Forgot password?
                                                    </TextLink>
                                                )}
                                            </div>

                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                required
                                                tabIndex={2}
                                                autoComplete="current-password"
                                                placeholder="Password"
                                                className="dark:bg-gray-900 dark:text-gray-300"
                                            />
                                            <InputError
                                                message={errors.password}
                                            />
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                tabIndex={3}
                                            />
                                            <Label htmlFor="remember">
                                                Remember me
                                            </Label>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="mt-4 w-full"
                                            tabIndex={4}
                                            disabled={processing}
                                            data-test="login-button"
                                        >
                                            {processing && <Spinner />}
                                            Log in
                                        </Button>
                                    </div>

                                    {canRegister && (
                                        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                                            Don’t have an account?{' '}
                                            <TextLink
                                                href={register()}
                                                tabIndex={5}
                                            >
                                                Sign up
                                            </TextLink>
                                        </div>
                                    )}
                                </>
                            )}
                        </Form>

                        {status && (
                            <div className="mt-4 text-center text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}
                    </>
                </div>
            </div>
        </section>
    );
}
