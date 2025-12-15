import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, BellPlus, Lock, Menu, TimerIcon, X } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const features = [
        {
            title: 'Always Updated Content',
            desc: 'Fresh materials the moment they are released. Our dynamic content engine ensures you never learn from outdated books.',
            icon: <BellPlus className="h-6 w-6 text-amber-400" />,
        },
        {
            title: 'Learning Anytime, Anywhere',
            desc: 'Pick up lessons wherever you are. Everything stays synced in real time.',
            icon: <TimerIcon className="h-6 w-6 text-indigo-400" />,
        },
        {
            title: 'Your Data is Safe',
            desc: 'We use Secure, encrypted system to keep Your learning data protected.',
            icon: <Lock className="h-6 w-6 text-emerald-400" />,
        },
    ];

    const team = [
        {
            name: 'Abdo',
            role: 'CEO & Co-founder',
            image: 'images/ab.jpg',
        },
        {
            name: 'Mohammed',
            role: 'Lead Developer',
            image: 'images/mame.jpg',
        },
        {
            name: 'Kamil M.',
            role: 'Supervisor',
            image: 'images/kam.jpg',
        },
        {
            name: 'Abdurazak',
            role: 'Lecturer & school Director',
            image: 'images/Teacher_Abdo.jpg',
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200">
            <Head title="Ablex - The Future of Learning">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>

            {/* Background Effects */}
            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-600/20 blur-[128px]" />
                <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[128px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay brightness-100 contrast-150"></div>
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/" className="group flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-white">
                            Ablex
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden items-center gap-8 lg:flex">
                        <div className="flex gap-6 text-sm font-medium text-slate-400">
                            <a
                                href="/"
                                className="transition-colors hover:text-white"
                            >
                                Home
                            </a>
                            <a
                                href="#teams"
                                className="transition-colors hover:text-white"
                            >
                                Teams
                            </a>
                            <a
                                href="#features"
                                className="transition-colors hover:text-white"
                            >
                                Features
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-full border border-slate-700 bg-slate-800 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-slate-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 hover:shadow-indigo-500/40"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="p-2 text-slate-400 hover:text-white lg:hidden"
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-full border-b border-white/5 bg-slate-950 px-6 py-6 shadow-2xl lg:hidden">
                        <div className="flex flex-col gap-4">
                            <a href="/" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </a>
                            <a
                                href="#teams"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-slate-300 hover:text-white"
                            >
                                Teams
                            </a>
                            <a
                                href="#features"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-slate-300 hover:text-white"
                            >
                                Features
                            </a>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-indigo-600 py-3 text-center font-medium text-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <div className="mt-4 flex flex-col gap-3">
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg border border-slate-700 py-2.5 text-center font-medium text-slate-300"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-indigo-600 py-2.5 text-center font-medium text-white"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section
                id="home"
                className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-6 pt-24 pb-16 text-center"
            >
                <div className="animate-fade-in-up">
                    <h1 className="mt-8 max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
                        Level Up Your Learning with{' '}
                        <br className="hidden sm:block" />
                        <span className="bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
                            Ablex
                        </span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
                        Get smarter every day with real-time updates, fresh
                        materials, Relax and Read online built just for you.
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href={route('register')}
                            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-indigo-600 px-8 font-medium text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 hover:bg-indigo-500 hover:shadow-indigo-500/50"
                        >
                            <span className="mr-2">Start Learning Free</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <a
                            href="#features"
                            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 px-8 font-medium text-slate-300 backdrop-blur-sm transition-all hover:bg-slate-800 hover:text-white"
                        >
                            Explore Features
                        </a>
                    </div>
                </div>
            </section>
            {/* Features Section */}
            <section id="features" className="relative z-10 py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            What Make us Unique
                        </h2>
                        <p className="mt-4 text-lg text-slate-400">
                            Ablex gives you a constantly evolving learning
                            space. New content appears the moment it’s released,
                            your lessons sync across all your devices, and You
                            get freedom, flexibility, and peace of mind while
                            you learn.
                        </p>
                    </div>

                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3 lg:gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative rounded-2xl border border-white/5 bg-slate-900/40 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/30 hover:bg-slate-900/60 hover:shadow-2xl hover:shadow-indigo-500/10"
                            >
                                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg border border-white/5 bg-slate-800 shadow-inner">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-indigo-300">
                                    {feature.title}
                                </h3>
                                <p className="mt-3 leading-relaxed text-slate-400">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section id="teams" className="relative z-10 py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Know Who We Are
                        </h2>
                        <p className="mt-4 text-lg text-slate-400">
                            We’re a passionate team of educators, developers,
                            and lifelong learners building a smarter way to grow
                            your skills.
                        </p>
                        <p className="text-center text-lg text-slate-400">
                            {' '}
                            our mission is to make education dynamic — where
                            your materials, insights, and tools evolve with you
                            in real time.
                        </p>
                    </div>

                    {/* Team section  */}
                    <div className="mask-gradient relative mt-12 w-full overflow-hidden">
                        <div className="animate-infinite-scroll flex w-max gap-2 hover:[animation-play-state:paused]">
                            {[...team, ...team, ...team].map(
                                (member, index) => (
                                    <div
                                        key={index}
                                        className="group relative flex h-80 w-64 flex-shrink-0 flex-col items-center justify-center p-6 transition-all duration-300 hover:-translate-y-2"
                                    >
                                        <div className="relative mb-6 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 p-1 shadow-lg shadow-indigo-500/20 transition-shadow group-hover:shadow-indigo-500/40">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="h-full w-full rounded-full border-4 border-slate-900 object-cover"
                                            />
                                        </div>

                                        <div className="relative z-10 text-center">
                                            <h3 className="text-xl font-bold text-white transition-colors group-hover:text-indigo-300">
                                                {member.name}
                                            </h3>
                                            <p className="mt-1 text-sm font-medium text-slate-400">
                                                {member.role}
                                            </p>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>

                    <style>{`
                        @keyframes infinite-scroll {
                            from { transform: translateX(0); }
                            to { transform: translateX(-33.33%); }
                        }
                        .animate-infinite-scroll {
                            animation: infinite-scroll 30s linear infinite;
                        }
                    `}</style>
                </div>
            </section>

            {/* Footer */}
            <footer
                id="footer"
                className="relative z-10 border-t border-white/5 bg-slate-950 pt-16 pb-8"
            >
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div>
                            <div className="mb-4 flex items-center gap-2">
                                <span className="text-xl font-bold text-white">
                                    Ablex
                                </span>
                            </div>
                            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
                                Empowering the next generation of learners with
                                cutting-edge tools and a supportive community.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
                            <div>
                                <h3 className="text-sm font-semibold text-white">
                                    Quick Links
                                </h3>
                                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                                    <li>
                                        <a
                                            href="#home"
                                            className="hover:text-indigo-400"
                                        >
                                            Home
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#features"
                                            className="hover:text-indigo-400"
                                        >
                                            Features
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#teams"
                                            className="hover:text-indigo-400"
                                        >
                                            Teams
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-white">
                                    Connect
                                </h3>
                                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                                    <li className="flex items-center gap-2">
                                        Semara University
                                    </li>
                                    <li>Teams@ablex.com</li>
                                    <li>+251 937 848 785</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
                        <p className="text-sm text-slate-500">
                            &copy; {new Date().getFullYear()} Ablex. All rights
                            reserved.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://github.com/abdo-ab"
                                className="text-slate-400 transition-colors hover:text-white"
                            >
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/abdo-mohammed-3853aa397/"
                                className="text-slate-400 transition-colors hover:text-white"
                            >
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
