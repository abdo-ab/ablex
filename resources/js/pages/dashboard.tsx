import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

interface BreadcrumbItem {
    title: string;
    href: string;
}

interface ModuleType {
    id: number;
    title: string;
    slug: string;
    description: string;
    thumbnail_url: string;
    file_url: string;
    author?: {
        name: string;
    };
    published_at: string;
}

interface PageProps {
    [key: string]: unknown;
    modules: {
        data: ModuleType[];
        links: { url: string | null; label: string; active: boolean }[];
    };
    filters: {
        search: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: route('dashboard'),
    },
];

export default function dashboard() {
    const { props } = usePage<PageProps>();

    const searchFromServer = props.filters?.search ?? '';
    const [search, setSearch] = useState(searchFromServer);

    const modules = props.modules?.data ?? [];
    const links = props.modules?.links ?? [];

    useEffect(() => {
        const delay = setTimeout(() => {
            if (search !== (props.filters?.search ?? '')) {
                router.get(
                    route('dashboard'),
                    { search },
                    { preserveState: true, preserveScroll: true },
                );
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [search, props.filters?.search]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <section className="min-h-[80vh] rounded-xl bg-white py-6 shadow-xl sm:py-10 dark:border dark:border-gray-800 dark:bg-gray-950 dark:shadow-none">
                <div className="relative z-20 mx-auto max-w-screen-xl px-4">
                    <div className="mb-6 max-w-xl">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
                            Explore Learning Modules
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            Browse modules shared by lecturers across different subjects. Read the details, download resources, and learn at your own pace.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8 flex w-full justify-center md:justify-end">
                        <div className="relative w-full max-w-md">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search modules by title..."
                                className="w-full rounded-full border border-gray-300 bg-gray-50 px-5 py-3 pl-12 text-gray-800 shadow-sm transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-200"
                            />
                            <Search
                                size={20}
                                className="absolute top-1/2 left-4 -translate-y-1/2 transform text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Modules */}
                    {modules.length === 0 ? (
                        <div className="p-16 text-center text-gray-600 dark:text-gray-400">
                            <p className="text-xl font-medium">
                                No modules found.
                            </p>
                            <p className="mt-2 text-sm">
                                Try a different search term or check back later.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                                {modules.map((module) => (
                                    <Link
    key={module.id}
    href={route('modules.show', { slug: module.slug })}
    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border dark:border-gray-800 dark:bg-gray-900"
>
    {/* Thumbnail */}
    <div className="relative h-52 w-full overflow-hidden">
        <img
            src={module.thumbnail_url}
            alt={module.title}
            className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
    </div>

    {/* Content */}
    <div className="flex flex-1 flex-col p-5">
        <h2 className="line-clamp-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {module.title}
        </h2>

        <div
            className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
            dangerouslySetInnerHTML={{ __html: module.description }}
        />

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-5 text-sm">
            <span className="truncate text-gray-500 dark:text-gray-400">
                {module.author?.name ?? 'Unknown'}
            </span>

            <span className="font-semibold text-amber-500 transition group-hover:translate-x-1 dark:text-amber-400">
                View Module →
            </span>
        </div>
    </div>
</Link>

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
                                        className={`rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${
                                            link.active
                                                ? 'bg-indigo-600 text-white shadow-md'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                        } ${
                                            !link.url
                                                ? 'cursor-not-allowed opacity-50'
                                                : 'hover:scale-[1.05]'
                                        }`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}