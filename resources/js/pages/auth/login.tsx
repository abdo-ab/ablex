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
        <div className="flex min-h-screen w-full bg-white dark:bg-black selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
            <Head title="Log in | Ablex" />

            {/* Left Side:  */}
            <div className="hidden lg:flex relative w-1/2 flex-col justify-between p-10 text-white dark:border-r border-white/10">
                <div className="absolute inset-0 bg-black">
                     <img 
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000" 
                        alt="Background" 
                        className="h-full w-full object-cover opacity-60" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                </div>

                <div className="relative z-20 flex items-center gap-2 font-medium text-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
                        <AppLogoIcon className="h-5 w-5" />
                    </div>
                    Ablex
                </div>

                <div className="relative z-20 space-y-4 max-w-lg">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Welcome back.
                    </h1>
                    <p className="text-lg text-gray-300 leading-relaxed">Enter your details to access your account and continue your learning journey.</p>
                </div>
                
                <div className="relative z-20 text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Ablex - The Feature of learning.
                </div>
            </div>

            {/* Right Side: */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:w-1/2">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
                    {/* Header for Mobile */}
                    <div className="lg:hidden flex flex-col items-center gap-4 text-center mb-8">
                        <div className="h-12 w-12 bg-black/5 dark:bg-white/10 rounded-xl p-2 flex items-center justify-center ring-1 ring-black/10 dark:ring-white/20">
                            <AppLogoIcon className="h-full w-full text-black dark:text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
                    </div>

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="space-y-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative group">
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                placeholder="name@example.com"
                                                className="h-11 border-gray-200 dark:border-gray-800 transition-all focus:border-black dark:focus:border-white"
                                            />
                                        </div>
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password">Password</Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="text-xs font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 underline-offset-4 hover:underline"
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
                                            className="h-11 border-gray-200 dark:border-gray-800 transition-all focus:border-black dark:focus:border-white"
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
                                        <Label htmlFor="remember" className="font-normal text-gray-500 dark:text-gray-400 cursor-pointer">
                                            Remember me
                                        </Label>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="h-12 w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 font-semibold shadow-lg shadow-black/5 dark:shadow-white/5 transition-all duration-300"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner className="mr-2 h-4 w-4" />}
                                        Log in
                                    </Button>
                                </div>

                                {canRegister && (
                                    <div className="pt-4 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-900 mt-6">
                                        Don&apos;t have an account?{' '}
                                        <TextLink
                                            href={register()}
                                            tabIndex={6}
                                            className="font-semibold text-black dark:text-white hover:underline underline-offset-4"
                                        >
                                            Sign up
                                        </TextLink>
                                    </div>
                                )}
                            </>
                        )}
                    </Form>

                    {status && (
                        <div className="rounded-lg bg-green-50 p-4 text-center text-sm font-medium text-green-600 dark:bg-green-900/20 dark:text-green-400 animate-in fade-in slide-in-from-top-2">
                            {status}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
