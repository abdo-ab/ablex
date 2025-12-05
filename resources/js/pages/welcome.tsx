// import { cn } from '@/lib/utils';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BellPlus, LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <Head title="Learnx">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            {/* Navbar */}
            <nav className="fixed z-50 w-full border-gray-200 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-lg lg:px-6 dark:bg-gray-800/70">
                <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
                    <a href="/" className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            Ablex
                        </span>
                    </a>

                    <div className="flex items-center lg:order-2">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-gray-300 px-5 py-1.5 text-sm leading-normal text-gray-800 hover:border-gray-400 dark:border-gray-600 dark:text-gray-200 dark:hover:border-gray-400"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="mr-2 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 px-4 py-2 text-sm font-medium text-white hover:from-indigo-600 hover:to-blue-700 focus:ring-4 focus:ring-indigo-300"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none lg:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            {!isMenuOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5h14M3 10h14M3 15h14"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M6 6l8 8M6 14L14 6"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    <div
                        className={`${
                            isMenuOpen ? 'block' : 'hidden'
                        } w-full items-center justify-between lg:order-1 lg:flex lg:w-auto`}
                    >
                        <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
                            <li>
                                <a
                                    href="#"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#features"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .querySelector('#features')
                                            ?.scrollIntoView({
                                                behavior: 'smooth',
                                            });
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#teams"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .querySelector('#teams')
                                            ?.scrollIntoView({
                                                behavior: 'smooth',
                                            });
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white"
                                >
                                    Teams
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="w-full items-center justify-center overflow-hidden bg-[#101828] pt-24 pb-16 sm:pb-20">
                {/* mine bg start */}
                {/* <div
                    className={cn(
                        'absolute inset-0',
                        '[background-size:40px_40px]',
                        '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
                        'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]',
                    )}
                /> */}
                {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div> */}

                {/* end*/}
                <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white/50 sm:text-6xl">
                        Level Up Your Learning with{' '}
                        <span className="text-indigo-600 dark:text-indigo-400">
                            Ablex
                        </span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/50">
                        Get smarter every day with real-time updates, fresh
                        materials, and hands-on lessons built just for you.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <a
                            href="#features"
                            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-md transition hover:bg-indigo-50"
                        >
                            Explore Features
                        </a>
                        <Link
                            href={route('register')}
                            className="rounded-lg bg-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-800"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-[#101828] text-white/50">
                <div className="group flex transform cursor-pointer flex-col items-center p-8 transition-colors duration-300">
                    <h1 className="text-center text-2xl font-semibold text-gray-200 capitalize lg:text-3xl">
                        What make us Unique
                    </h1>
                    <p className="mx-auto my-6 max-w-2xl text-center text-gray-400">
                        Our platform gives you a constantly evolving learning
                        space. New content appears the moment it’s released,
                        your lessons sync across all your devices, and You get
                        freedom, flexibility, and peace of mind while you learn.
                    </p>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: 'Always Up-to-Date Content',
                                desc: 'Fresh materials the moment they’re released — from new books to trending topics.',
                                icon: <BellPlus />,
                            },
                            {
                                title: 'Learn Anytime',
                                desc: 'Pick up lessons wherever you are. Everything stays synced in real time.',
                                icon: (
                                    <path d="M10 3a7 7 0 100 14 7 7 0 000-14zM9 8a1 1 0 012 0v3a1 1 0 01-.293.707l-1 1a1 1 0 11-1.414-1.414L9 10.586V8z" />
                                ),
                            },
                            {
                                title: 'Your Data is Safe',
                                desc: 'We use secure, encrypted systems to keep your learning data protected.',
                                icon: <LockKeyhole />,
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group rounded-2xl border p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-gray-500 hover:shadow-2xl dark:border-gray-700 dark:hover:border-transparent"
                            >
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-900 text-white transition-transform duration-300 group-hover:scale-110">
                                    <svg
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        {feature.icon}
                                    </svg>
                                </div>
                                <h3 className="mb-3 text-2xl font-semibold text-white/50">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-300">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* About Us Section */}
            <section id="teams" className="bg-[#101828]">
                <div className="container mx-auto px-6 py-10">
                    <h1 className="text-center text-2xl font-semibold text-gray-200 capitalize lg:text-3xl">
                        Know Who we are
                    </h1>

                    <p className="mx-auto my-6 max-w-2xl text-center text-gray-400">
                        We’re a passionate team of educators, developers, and
                        lifelong learners building a smarter way to grow your
                        skills. At{' '}
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                            Ablex
                        </span>
                        , our mission is to make education dynamic — where your
                        materials, insights, and tools evolve with you in real
                        time.
                    </p>

                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-16 xl:grid-cols-4">
                        <div className="group flex transform cursor-pointer flex-col items-center rounded-xl border p-8 transition-colors duration-300 hover:border-transparent hover:bg-blue-600 dark:border-gray-700 dark:hover:border-transparent">
                            <img
                                className="h-32 w-32 rounded-full object-cover ring-4 ring-gray-300"
                                src="images/ab.jpg"
                                alt="Ceo image"
                            />

                            <h1 className="mt-4 text-2xl font-semibold text-white/50 capitalize group-hover:text-white dark:text-white">
                                ABDO
                            </h1>

                            <p className="mt-2 text-white/50 capitalize group-hover:text-gray-300 dark:text-gray-300">
                                Ceo and co-founder
                            </p>
                        </div>

                        <div className="group flex transform cursor-pointer flex-col items-center rounded-xl border p-8 transition-colors duration-300 hover:border-transparent hover:bg-blue-600 dark:border-gray-700 dark:hover:border-transparent">
                            <img
                                className="h-32 w-32 rounded-full object-cover ring-4 ring-gray-300"
                                src="images/mame.jpg"
                                alt="lead Developer's image"
                            />

                            <h1 className="mt-4 text-2xl font-semibold text-white/50 capitalize group-hover:text-white dark:text-white">
                                Mohammed.
                            </h1>

                            <p className="mt-2 text-gray-500 capitalize group-hover:text-gray-300 dark:text-gray-300">
                                Lead Developer
                            </p>
                        </div>

                        <div className="group flex transform cursor-pointer flex-col items-center rounded-xl border p-8 transition-colors duration-300 hover:border-transparent hover:bg-blue-600 dark:border-gray-700 dark:hover:border-transparent">
                            <img
                                className="h-32 w-32 rounded-full object-cover ring-4 ring-gray-300"
                                src="images/kam.jpg"
                                alt="content Writter phot"
                            />

                            <h1 className="mt-4 text-2xl font-semibold text-white/50 capitalize group-hover:text-white dark:text-white">
                                Kamil M.
                            </h1>

                            <p className="mt-2 text-white/50 capitalize group-hover:text-gray-300 dark:text-gray-300">
                                Super viser
                            </p>
                        </div>

                        <div className="group flex transform cursor-pointer flex-col items-center rounded-xl border p-8 transition-colors duration-300 hover:border-transparent hover:bg-blue-600 dark:border-gray-700 dark:hover:border-transparent">
                            <img
                                className="h-32 w-32 rounded-full object-cover ring-4 ring-gray-300"
                                src="images/lecturer.jpg"
                                alt="lecturer image"
                            />

                            <h1 className="mt-4 text-2xl font-semibold text-white/50 capitalize group-hover:text-white dark:text-white">
                                Temu
                            </h1>

                            <p className="mt-2 text-gray-500 capitalize group-hover:text-gray-300 dark:text-gray-300">
                                Lecturer and staff Leader
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Contact Section */}
            {/* <section id="contact" className="bg-[#101828]">
                <div className="mx-auto max-w-screen-xl bg-[#10182] px-6 text-center lg:px-8">
                    <h2 className="text-4xl font-extrabold text-white/50 sm:text-5xl">
                        Let's Connect
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-[#a2b0ab] dark:text-gray-400">
                        Got questions or ideas? We’re here to collaborate. Reach
                        out and let’s make something amazing together.
                    </p>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        <div className="group rounded-2xl border border-gray-100 bg-[#181D1C] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-700 text-[#a2b0ab]">
                                <PhoneCall />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-[#a2b0ab] dark:text-white">
                                Call Support
                            </h3>
                            <p className="text-[#a2b0ab] dark:text-gray-400">
                                +251 937 848 785
                            </p>
                        </div>


                        <div className="group rounded-2xl border border-gray-100 bg-[#181D1C] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-700 text-[#a2b0ab]">
                                <MailOpenIcon />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-[#a2b0ab] dark:text-white">
                                Email / Collaboration
                            </h3>
                            <p className="text-[#a2b0ab] dark:text-gray-400">
                                teams@ablex.com
                            </p>
                        </div>


                        <div className="group rounded-2xl border border-gray-100 bg-[#181D1C] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-700 text-[#a2b0ab]">
                                <MapPinIcon />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-[#a2b0ab] dark:text-white">
                                Location
                            </h3>
                            <p className="text-[#a2b0ab] dark:text-gray-400">
                                Ablex , semara University
                            </p>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Footer Section */}
            <section className="bg-gray-900 py-12 text-gray-300" id="footer">
                <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
                    {/* Top part: columns */}
                    <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* About */}
                        <div>
                            <h3 className="mb-4 text-xl font-bold text-white">
                                Ablex
                            </h3>
                            <p className="text-gray-400">
                                Empowering students with smarter tools,
                                personalized resources, and real-time updates.
                                Learning made simple, anywhere.
                            </p>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="mb-4 text-xl font-bold text-white">
                                Get in Touch
                            </h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <svg
                                        className="h-5 w-5 text-indigo-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M2 3a1 1 0 011-1h2a1 1 0 011 .883l.437 3.482a1 1 0 01-.27.857l-1.5 1.5a12.04 12.04 0 005.657 5.657l1.5-1.5a1 1 0 01.857-.27l3.482.437A1 1 0 0119 15v2a1 1 0 01-1 1h-1C8.477 18 2 11.523 2 4V3z" />
                                    </svg>
                                    <span>+251 937 848 785</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg
                                        className="h-5 w-5 text-indigo-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M2.94 6.94A1.5 1.5 0 014 6h12a1.5 1.5 0 011.06.44l-7.06 4.47-7.06-4.47zM2 7.882V14a2 2 0 002 2h12a2 2 0 002-2V7.882l-7.06 4.47a1 1 0 01-1.06 0L2 7.882z" />
                                    </svg>
                                    <span>support@Ablex.com</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg
                                        className="h-5 w-5 text-indigo-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.05 5.05a7 7 0 119.9 9.9l-4.95 4.95-4.95-4.95a7 7 0 010-9.9zM10 10a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>
                                        Semara university, Afar, Ethiopia
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom part: social + credit */}
                    <div className="flex flex-col items-center border-t border-gray-800 pt-6 text-sm text-gray-500 md:flex-row md:justify-between">
                        <p>
                            © {new Date().getFullYear()} Ablex. All rights
                            reserved.
                        </p>
                        <p className="mt-2 md:mt-0">
                            Design & Developed by DEV AB
                        </p>
                        <div className="mt-2 flex gap-4 md:mt-0">
                            <a
                                href="https://www.linkedin.com/in/abdo-mohammed-3853aa397/"
                                className="transition hover:text-indigo-500"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11.75 19h-3v-9h3v9zm-1.5-10.271c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.25 10.271h-3v-4.5c0-1.072-.928-2-2-2s-2 .928-2 2v4.5h-3v-9h3v1.25c.648-.983 2.258-1.25 3-1.25 2.206 0 4 1.794 4 4v5z" />
                                </svg>
                            </a>
                            <a
                                href="https://github.com/abdo-ab"
                                className="transition hover:text-indigo-500"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0C5.371 0 0 5.371 0 12c0 5.302 3.438 9.8 8.205 11.385.6.111.82-.261.82-.579 0-.286-.011-1.043-.017-2.05-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.761-1.605-2.665-.304-5.467-1.332-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.323 3.301 1.23a11.45 11.45 0 013.003-.404 11.45 11.45 0 013.003.404c2.292-1.553 3.299-1.23 3.299-1.23.653 1.653.242 2.873.118 3.176.77.84 1.236 1.911 1.236 3.221 0 4.61-2.807 5.625-5.479 5.921.43.37.814 1.102.814 2.222 0 1.604-.014 2.896-.014 3.286 0 .32.218.694.824.576C20.565 21.796 24 17.298 24 12c0-6.629-5.371-12-12-12z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
