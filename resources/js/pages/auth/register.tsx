import AppLogoIcon from '@/components/app-logo-icon';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';

import RegisteredUserController from '@/actions/Laravel/Fortify/Http/Controllers/RegisteredUserController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

export default function Register() {
    const formProps = RegisteredUserController.store.form() as ReturnType<
        typeof RegisteredUserController.store.form
    > & { inert?: boolean | string };
    if (formProps.inert === 'true') {
        formProps.inert = true;
    } else if (formProps.inert === 'false') {
        formProps.inert = false;
    }
    const formPropsSafe = {
        ...formProps,
        inert:
            typeof formProps.inert === 'string'
                ? formProps.inert === 'true'
                : formProps.inert,
    } as Omit<typeof formProps, 'inert'> & { inert?: boolean };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50/50 p-6 selection:bg-black selection:text-white lg:p-10 dark:bg-black dark:selection:bg-white dark:selection:text-black">
            <Head title="Register" />

            <div className="w-full max-w-sm animate-in space-y-6 transition-all duration-700 fade-in slide-in-from-bottom-4">
                {/* Header */}
                <div className="flex flex-col items-center gap-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/5 p-2 ring-1 ring-black/10 dark:bg-white/10 dark:ring-white/20">
                        <AppLogoIcon className="h-full w-full text-black dark:text-white" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Create an account
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enter your details below to get started
                        </p>
                    </div>
                </div>

                {/* Form  */}
                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm backdrop-blur-xl dark:border-gray-800 dark:bg-gray-950/50">
                    <Form
                        {...formPropsSafe}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="space-y-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="name"
                                            placeholder="user name"
                                            className="h-10 border-gray-200 bg-transparent px-3 dark:border-gray-800 dark:bg-transparent"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            name="email"
                                            placeholder="name@example.com"
                                            className="h-10 border-gray-200 bg-transparent px-3 dark:border-gray-800 dark:bg-transparent"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">
                                            Password
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            name="password"
                                            placeholder="••••••••"
                                            className="h-10 border-gray-200 bg-transparent px-3 dark:border-gray-800 dark:bg-transparent"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password_confirmation">
                                            Confirm Password
                                        </Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            name="password_confirmation"
                                            placeholder="••••••••"
                                            className="h-10 border-gray-200 bg-transparent px-3 dark:border-gray-800 dark:bg-transparent"
                                        />
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="h-10 w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                        tabIndex={5}
                                        data-test="register-user-button"
                                        disabled={processing}
                                    >
                                        {processing && (
                                            <Spinner className="mr-2 h-4 w-4" />
                                        )}
                                        Sign up
                                    </Button>
                                </div>

                                <div className="pt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                    Already have an account?{' '}
                                    <TextLink
                                        href={login()}
                                        tabIndex={6}
                                        className="font-medium text-black underline-offset-4 hover:underline dark:text-white"
                                    >
                                        Log in
                                    </TextLink>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}
// before the ui
