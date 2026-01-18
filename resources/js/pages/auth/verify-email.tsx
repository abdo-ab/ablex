
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import { Form, Head, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }: { status?: string }) {
    const logoutForm = useForm({});

    return (
        <AuthLayout
            title="Verify your email"
            description="We’ve sent a verification link to your email. You need to verify it before accessing your dashboard. 
                Check your inbox and click the link we sent you."
        >
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 rounded-md bg-green-50 p-3 text-center text-sm font-medium text-green-700">
                    A new verification link has been sent to your email.
                </div>
            )}

            <Form {...send.form()} className="space-y-6 text-center">
                {({ processing }) => (
                    <>
                        <Button disabled={processing} variant="secondary">
                            {processing && <Spinner />}
                            Resend verification email
                        </Button>
                        <button
                            type="button"
                            onClick={() => logoutForm.post(logout())}
                            className="mx-auto block text-xs text-muted-foreground hover:underline"
                        >
                            Log out instead
                        </button>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
