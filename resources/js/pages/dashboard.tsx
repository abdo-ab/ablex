import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
];

interface ModuleType {
    id: number;
    title: string;
    slug: string;
    description: string;
    thumbnail_url: string;
    file_url: string;
    user_id: number;
    author?: {
        name: string;
    };
    published_at: string;
}

export default function Dashboard() {
    const { props } = usePage<{
        modules: {
            data: ModuleType[];
            links: { url: string | null; label: string; active: boolean }[];
        };
        filters: {
            search: string;
        };
    }>();

    const searchFromServer = props.filters?.search ?? '';
    const [search, setSearch] = useState(searchFromServer);

    const modules = props.modules?.data ?? [];
    const links = props.modules?.links ?? [];

    // Debounced search
    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                route('dashboard'),
                { search },
                { preserveState: true, preserveScroll: true },
            );
        }, 500);

        return () => clearTimeout(delay);
    }, [search]);
    // comment logic

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <section className="flex w-full items-center justify-center bg-white dark:bg-black">
                {modules.length === 0 ? (
                    <p className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-black">
                        No modules available now please come back later.
                    </p>
                ) : (
                    <div className="relative z-20 mx-auto max-w-screen-xl px-4 py-8">
                        {/* Search Bar */}
                        <div className="mx-auto mb-8 flex max-w-md items-center gap-3">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search modules by title..."
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
                            />
                        </div>

                        {/* Post Card */}
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {modules.map((module) => (
                                <article
                                    key={module.id}
                                    className="group rounded-xl bg-[#181D1C] p-6 shadow-sm"
                                >
                                    <div className="relative h-56 overflow-hidden rounded-lg">
                                        <img
                                            className="h-full w-full object-cover"
                                            src={module.thumbnail_url}
                                            alt={module.title}
                                        />
                                    </div>

                                    <h2 className="mt-4 text-xl font-semibold text-white">
                                        {module.title}
                                    </h2>

                                    <div className="mt-2 line-clamp-3 text-sm text-gray-400">
                                        {module.description}
                                    </div>

                                    <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
                                        <span>
                                            {module.author?.name ?? 'Unknown'}
                                        </span>

                                        <Link
                                            href={route('modules.show', {
                                                slug: module.slug,
                                            })}
                                            className="hover:underline"
                                        >
                                            Read more →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-10 flex justify-center space-x-2">
                            {links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    className={`rounded-lg px-4 py-2 text-sm transition ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                                    } ${
                                        !link.url
                                            ? 'cursor-not-allowed opacity-50'
                                            : 'hover:bg-blue-500 hover:text-white'
                                    } `}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </AppLayout>
    );
}
