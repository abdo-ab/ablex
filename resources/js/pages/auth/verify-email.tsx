
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import { Head, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }: { status?: string }) {
    const logoutForm = useForm({});

    return (
        <AuthLayout
            title="Email verification disabled"
            description="Email verification has been disabled. Please log in to access your dashboard."
        >
            <Head title="Email verification" />

            <div className="space-y-6 text-center">
                <p className="text-sm text-muted-foreground">
                    You can now access your dashboard directly without email verification.
                </p>
                <button
                    type="button"
                    onClick={() => logoutForm.post(logout())}
                    className="mx-auto block text-xs text-muted-foreground hover:underline"
                >
                    Log out and return to login
                </button>
            </div>
        </AuthLayout>
    );
}
