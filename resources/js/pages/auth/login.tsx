import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLogoIcon from '@/components/app-logo-icon';
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
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50/50 p-6 selection:bg-black selection:text-white dark:bg-black dark:selection:bg-white dark:selection:text-black lg:p-10">
            <Head title="Log in" />

            <div className="w-full max-w-sm space-y-6 transition-all duration-700 animate-in fade-in slide-in-from-bottom-4">
                {/* Header */}
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 p-2 ring-1 ring-black/10 dark:bg-white/10 dark:ring-white/20">
                        <AppLogoIcon className="h-full w-full text-black dark:text-white" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Welcome back
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enter your details to access your account
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/50">
                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="space-y-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="name@example.com"
                                            className="h-10 border-gray-200 bg-transparent px-3 dark:border-gray-800 dark:bg-transparent"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">Password</Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="text-xs font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
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
                                            placeholder="••••••••"
                                            className="h-10 border-gray-200 bg-transparent px-3 dark:border-gray-800 dark:bg-transparent"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                            className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:text-white dark:border-gray-700 dark:data-[state=checked]:bg-white dark:data-[state=checked]:text-black"
                                        />
                                        <Label htmlFor="remember" className="font-normal text-gray-500 dark:text-gray-400">
                                            Remember me
                                        </Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="h-10 w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner className="mr-2 h-4 w-4" />}
                                        Log in
                                    </Button>
                                </div>

                                {canRegister && (
                                    <div className="pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                        Don&apos;t have an account?{' '}
                                        <TextLink
                                            href={register()}
                                            tabIndex={6}
                                            className="font-medium text-black underline-offset-4 hover:underline dark:text-white"
                                        >
                                            Sign up
                                        </TextLink>
                                    </div>
                                )}
                            </>
                        )}
                    </Form>

                    {status && (
                        <div className="mt-4 rounded-md bg-green-50 p-3 text-center text-sm font-medium text-green-600 dark:bg-green-900/20 dark:text-green-400">
                            {status}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
