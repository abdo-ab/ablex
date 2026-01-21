import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

import RegisteredUserController from '@/actions/Laravel/Fortify/Http/Controllers/RegisteredUserController';
import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validations = {
        name: data.name.length >= 2,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email),
        password: data.password.length >= 8,
        password_confirmation: data.password_confirmation.length > 0 && data.password_confirmation === data.password,
    };

    const isFormValid = Object.values(validations).every(v => v === true);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(RegisteredUserController.store.url());
    };

    return (
        <div className="flex min-h-screen w-full bg-white dark:bg-black selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
            <Head title="Register | Ablex" />

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
                        Welcome to Ablex.
                    </h1>
                    <p className="text-lg text-gray-300 leading-relaxed">Join Ablex make your learning journey easier and more effective. </p>
                </div>
                
                <div className="relative z-20 text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} Ablex - The Feature of learning.
                </div>
            </div>

            {/* Right Side: Registration Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:w-1/2">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
                    {/* Header for Mobile */}
                    <div className="lg:hidden flex flex-col items-center gap-4 text-center mb-8">
                        <div className="h-12 w-12 bg-black/5 dark:bg-white/10 rounded-xl p-2 flex items-center justify-center ring-1 ring-black/10 dark:ring-white/20">
                            <AppLogoIcon className="h-full w-full text-black dark:text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h1>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-5">
                            {/* Name Input */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="name">Full Name</Label>
                                    {data.name.length > 0 && (
                                        <span className={`text-[10px] uppercase font-bold tracking-wider ${validations.name ? 'text-green-500' : 'text-amber-500'}`}>
                                            {validations.name ? 'Valid' : 'Minimum 2 characters'}
                                        </span>
                                    )}
                                </div>
                                <div className="relative group">
                                  <Input
                                      id="name"
                                      type="text"
                                      required
                                      autoFocus
                                      name="name"
                                      placeholder="Enter your name"
                                      value={data.name}
                                      onChange={(e) => setData('name', e.target.value)}
                                      className={`h-11 border-gray-200 dark:border-gray-800 transition-all ${data.name && !validations.name ? 'border-amber-300 dark:border-amber-900 bg-amber-50/10' : ''}`}
                                  />
                                  {data.name && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                      {validations.name ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-amber-500" />}
                                    </div>
                                  )}
                                </div>
                                <InputError message={errors.name} />
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="email">Email Address</Label>
                                    {data.email.length > 0 && (
                                        <span className={`text-[10px] uppercase font-bold tracking-wider ${validations.email ? 'text-green-500' : 'text-amber-500'}`}>
                                            {validations.email ? 'valid' : 'invalid format make sure including @'}
                                        </span>
                                    )}
                                </div>
                                <div className="relative group">
                                  <Input
                                      id="email"
                                      type="email"
                                      required
                                      name="email"
                                      placeholder="example@gmail.com"
                                      value={data.email}
                                      onChange={(e) => setData('email', e.target.value)}
                                      className={`h-11 border-gray-200 dark:border-gray-800 transition-all ${data.email && !validations.email ? 'border-amber-300 dark:border-amber-900 bg-amber-50/10' : ''}`}
                                  />
                                  {data.email && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                      {validations.email ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-amber-500" />}
                                    </div>
                                  )}
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {data.password.length > 0 && (
                                        <span className={`text-[10px] uppercase font-bold tracking-wider ${validations.password ? 'text-green-500' : 'text-amber-500'}`}>
                                            {validations.password ? 'Secure' : 'Minimum 8 characters'}
                                        </span>
                                    )}
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        name="password"
                                        placeholder="••••••••"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className={`h-11 border-gray-200 dark:border-gray-800 transition-all ${data.password && !validations.password ? 'border-amber-300 dark:border-amber-900 bg-amber-50/10' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            {/* Confirm Password Input */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password_confirmation">Confirm Password</Label>
                                    {data.password_confirmation.length > 0 && (
                                        <span className={`text-[10px] uppercase font-bold tracking-wider ${validations.password_confirmation ? 'text-green-500' : 'text-amber-500'}`}>
                                            {validations.password_confirmation ? 'password matched' : 'password not matched'}
                                        </span>
                                    )}
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password_confirmation"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        name="password_confirmation"
                                        placeholder="••••••••"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        className={`h-11 border-gray-200 dark:border-gray-800 transition-all ${data.password_confirmation && !validations.password_confirmation ? 'border-amber-300 dark:border-amber-900 bg-amber-50/10' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                    {data.password_confirmation && (
                                      <div className="absolute right-10 top-1/2 -translate-y-1/2">
                                        {validations.password_confirmation ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-amber-500" />}
                                      </div>
                                    )}
                                </div>
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    className={`h-12 w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 font-semibold shadow-lg group transition-all duration-300 ${!isFormValid ? 'opacity-40 grayscale pointer-events-none' : 'shadow-black/5 dark:shadow-white/5'}`}
                                    disabled={processing || !isFormValid}
                                >
                                    {processing ? (
                                        <Spinner className="mr-2 h-4 w-4" />
                                    ) : (
                                        <span className="flex items-center gap-2">
                                          Create account 
                                          <ChevronRight className={`w-4 h-4 transition-transform ${isFormValid ? 'group-hover:translate-x-1' : ''}`} />
                                        </span>
                                    )}
                                </Button>
                                {!isFormValid && (data.name || data.email || data.password || data.password_confirmation) && (
                                    <p className="text-center text-[10px] text-amber-600 dark:text-amber-400 mt-3 font-medium animate-pulse">
                                        Finish filling out the form to create an account.
                                    </p>
                                )}
                            </div>

                            <div className="text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-900 pt-6">
                                Already have an account?{' '}
                                <TextLink
                                    href={login()}
                                    className="font-semibold text-black dark:text-white hover:underline underline-offset-4"
                                >
                                    Sign in
                                </TextLink>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}