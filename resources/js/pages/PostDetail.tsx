import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Download,
    Heart,
    MessageCircle,
    UserCircle,
} from 'lucide-react';
import { route } from 'ziggy-js';

interface CommentType {
    id: number;
    body: string;
    created_at: string;
    user: { id: number; name: string };
}
interface ModuleType {
    id: number;
    title: string;
    slug: string;
    description: string;
    thumbnail_url: string;
    file_url: string;
    user_id: number;
    author_name: string;
    published_at: string;
    comments: CommentType[];
    likes_count: number;
}
interface PageProps extends InertiaPageProps {
    module: ModuleType;
    auth: { user: { id: number; name: string } | null };
    likeCount?: number;
}
//  post detail component
export default function PostDetails() {
    const { props } = usePage<PageProps>();
    const { module, auth, likeCount: initialLikeCount } = props;

    // Derive the like count directly from props. This avoids extra state and re-renders.
    const likeCount = initialLikeCount ?? module.likes_count;
    // Form hook for the comment section
    const { data, setData, post, processing, reset } = useForm({
        body: '',
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        post(route('modules.comment', { module: module.id }), {
            preserveScroll: true,
            onSuccess: () => reset('body'),
        });
    }
    // like toggle
    function toggleLike() {
        router.post(
            route('modules.like.toggle', { module: module.id }),
            {},
            {
                preserveScroll: true,
                onError: () => {
                    // Optional: Add user feedback on error, e.g., a toast notification.
                },
            },
        );
    }

    //  image paths
    const fixedDescription = module.description.replace(
        /src="(?:\/)?storage\/([^"]+)"/g,
        (match, path) => `src="/storage/${path}"`,
    );

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatRelativeTime = (dateString: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.round((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) {
            return 'just now';
        }
        const minutes = Math.round(seconds / 60);
        if (minutes < 60) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        }
        const hours = Math.round(minutes / 60);
        if (hours < 24) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        }

        const days = Math.round(hours / 24);
        if (days < 7) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        }

        // For dates older than a week, fall back to the standard date format.
        return formatDate(dateString);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased transition-colors duration-300 dark:bg-gray-950">
            <Head title={module.title} />

            {/* Header with Back Button  */}
            <header className="sticky top-0 z-10 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/90">
                <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
                    <button
                        onClick={() => router.get(route('dashboard'))}
                        className="flex items-center gap-2 rounded-full p-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-indigo-400"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </button>
                </div>
            </header>

            {/* Main Article Container */}
            <main className="container mx-auto px-4 py-12">
                <article className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl dark:border dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
                    {/* Thumbnail Image*/}
                    <div className="relative aspect-video w-full overflow-hidden">
                        <img
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                            src={module.thumbnail_url}
                            alt={module.title}
                        />
                    </div>

                    {/* Article Content Area */}
                    <div className="p-6 sm:p-10 lg:p-12">
                        <div className="mb-8 border-b border-gray-100 pb-6 dark:border-gray-800">
                            {/* Author and Date */}
                            <div className="mb-2 flex items-center gap-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                    <UserCircle
                                        size={16}
                                        className="text-indigo-500"
                                    />
                                    <span>{module.author_name}</span>
                                </div>
                                <span className="text-gray-300 dark:text-gray-600">
                                    •
                                </span>
                                <time>
                                    {formatRelativeTime(module.published_at)}
                                </time>
                            </div>

                            {/* Main Title */}
                            <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                                {module.title}
                            </h1>
                        </div>

                        {/* Article Description - Using Prose */}
                        <div
                            className="prose dark:prose-invert prose-lg sm:prose-xl max-w-none space-y-6 text-gray-700 dark:text-gray-300"
                            dangerouslySetInnerHTML={{
                                __html: fixedDescription,
                            }}
                        />

                        {/* Footer Actions  */}
                        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-gray-100 pt-8 sm:flex-row dark:border-gray-800">
                            {/* Interaction Stats */}
                            <div className="flex items-center gap-6">
                                {/* Likes Button */}
                                <button
                                    onClick={toggleLike}
                                    className="flex items-center gap-2 rounded-full bg-red-50 p-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                                >
                                    <Heart
                                        size={20}
                                        className="fill-red-600 dark:fill-red-400"
                                    />
                                    <span>{likeCount} Likes</span>
                                </button>

                                {/* Comments Count */}
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                    <MessageCircle size={20} />
                                    <span className="text-sm font-medium">
                                        {module.comments.length} Comments
                                    </span>
                                </div>
                            </div>

                            {/*  Download Button  */}
                            {module.file_url && (
                                <a
                                    href={module.file_url}
                                    target="_blank"
                                    download
                                    className="flex w-full transform items-center justify-center gap-3 rounded-full bg-indigo-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-indigo-500/50 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-indigo-700 sm:w-auto"
                                >
                                    <Download size={20} />
                                    Download File
                                </a>
                            )}
                        </div>
                    </div>
                </article>

                {/* Comments Section */}
                <section className="mx-auto mt-12 max-w-4xl">
                    <h2 className="mb-6 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900 dark:border-gray-800 dark:text-white">
                        Write Your taught ({module.comments.length})
                    </h2>

                    {/* Comment Form */}
                    {auth.user ? (
                        <form
                            onSubmit={submit}
                            className="mb-8 rounded-xl bg-white p-6 shadow dark:border dark:border-gray-800 dark:bg-gray-900 dark:shadow-none"
                        >
                            <textarea
                                id="comment"
                                value={data.body}
                                onChange={(e) =>
                                    setData('body', e.target.value)
                                }
                                className="w-full resize-y rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                                rows={4}
                                placeholder="Write a comment..."
                                required
                            />
                            <button
                                disabled={
                                    processing || data.body.trim().length === 0
                                }
                                className="mt-4 rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-400"
                            >
                                {processing ? 'Posting...' : 'Post Comment'}
                            </button>
                        </form>
                    ) : (
                        <div className="mb-8 rounded-lg border border-dashed border-gray-300 bg-white p-4 text-center dark:border-gray-700 dark:bg-gray-900">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                You must be logged in to post a comment.
                            </p>
                        </div>
                    )}

                    {/* Display Comments */}
                    <div className="space-y-4">
                        {(module.comments ?? []).length > 0 ? (
                            module.comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="rounded-xl bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border dark:border-gray-800 dark:bg-gray-900 dark:shadow-none"
                                >
                                    <div className="mb-2 flex items-center justify-between">
                                        <p className="flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                            <UserCircle size={16} />
                                            {comment.user.name}
                                        </p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">
                                            {formatRelativeTime(
                                                comment.created_at,
                                            )}
                                        </p>
                                    </div>
                                    <p className="leading-relaxed text-gray-800 dark:text-gray-200">
                                        {comment.body}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="py-4 text-center text-base text-gray-500 italic">
                                Be the first to start the discussion!
                            </p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
