import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { SpecialZoomLevel, Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {
    ArrowLeft,
    BookOpen,
    Download,
    Heart,
    MessageCircle,
    UserCircle,
    X,
} from 'lucide-react';
import * as pdfjs from 'pdfjs-dist';
import React, { useState } from 'react';
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
    comments: CommentType[] | null;
    likes_count: number;
}
interface PageProps extends InertiaPageProps {
    module: ModuleType;
    auth: { user: { id: number; name: string } | null };
    likeCount?: number;
    isLiked: boolean;
}

// --- PDF MODAL COMPONENT ---
interface PdfModalProps {
    fileUrl: string;
    title: string;
    isOpen: boolean;
    onClose: () => void;
}

const PdfModal: React.FC<PdfModalProps> = ({
    fileUrl,
    title,
    isOpen,
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <div className="bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-gray-900 p-4 backdrop-blur-sm">
            {/* Modal container */}
            <div className="relative h-full w-full max-w-7xl rounded-xl bg-white md:h-[90%] md:w-[90%] dark:bg-gray-950">
                <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
                    <h2 className="truncate text-lg font-semibold text-gray-900 dark:text-white">
                        Reading: {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>
                {/* PDF Viewer takes up remaining height */}
                <div className="h-[calc(100%-65px)] p-2">
                    <Worker
                        workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
                    >
                        <Viewer
                            fileUrl={fileUrl}
                            defaultScale={SpecialZoomLevel.PageFit}
                        />
                    </Worker>
                </div>
            </div>
        </div>
    );
};

// --- POST DETAILS COMPONENT ---
export default function PostDetails() {
    const { props } = usePage<PageProps>();
    const {
        module,
        auth,
        likeCount: initialLikeCount,
        isLiked: initialIsLiked,
    } = props;
    const [pdfModalOpen, setPdfModalOpen] = useState(false);

    // Like
    const [likeCount, setLikeCount] = useState(
        initialLikeCount ?? module?.likes_count ?? 0,
    );
    const [isLiked, setIsLiked] = useState(initialIsLiked ?? false);

    // Form hook for the comment section
    const { data, setData, post, processing, reset } = useForm({
        body: '',
    });
    if (!module) {
        return (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                Module not found.
            </div>
        );
    }

    //  for comments array
    const safeComments = module.comments ?? [];

    function submit(e: React.FormEvent) {
        e.preventDefault();
        if (!auth.user) return;

        post(route('modules.comment', { module: module.id }), {
            preserveScroll: true,
            onSuccess: () => {
                reset('body');
            },
            onError: (errors) => {
                console.error('Comment submission error:', errors);
            },
        });
    }

    // like logic

    function toggleLike() {
        if (!auth.user) {
            alert('You must be logged in to like a module.');
            return;
        }

        const newIsLiked = !isLiked;
        const newLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;

        setIsLiked(newIsLiked);
        setLikeCount(newLikeCount);

        router.post(
            route('modules.like.toggle', { module: module.id }),
            {},
            {
                preserveScroll: true,
                onError: (errors) => {
                    setIsLiked(!newIsLiked);
                    setLikeCount(
                        !newIsLiked ? newLikeCount + 1 : newLikeCount - 1,
                    );
                    alert('An error occurred while liking/unliking.');
                    console.error('Like toggle error:', errors);
                },
            },
        );
    }

    //  TinyMCE description content
    const fixedDescription = module.description.replace(
        /src="(?:\/)?storage\/([^"]+)"/g,
        (match, path) => `src="/storage/${path}"`,
    );

    // Date formatting functions
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

        if (seconds < 60) return 'just now';
        const minutes = Math.round(seconds / 60);
        if (minutes < 60)
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        const hours = Math.round(minutes / 60);
        if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        const days = Math.round(hours / 24);
        if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
        return formatDate(dateString);
    };

    //  RENDER LOGIC
    return (
        <div className="min-h-screen bg-gray-50 font-sans antialiased transition-colors duration-300 dark:bg-gray-950">
            <Head title={module.title} />

            {/* PDF Viewer Modal */}
            <PdfModal
                fileUrl={route('modules.read', { module: module.id })}
                title={module.title}
                isOpen={pdfModalOpen}
                onClose={() => setPdfModalOpen(false)}
            />

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

            <main className="container mx-auto px-4 py-12">
                <article className="mx-auto max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl dark:border dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
                    <div className="relative aspect-video w-full overflow-hidden">
                        <img
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                            src={module.thumbnail_url}
                            alt={module.title}
                        />
                    </div>

                    <div className="p-6 sm:p-10 lg:p-12">
                        <div className="mb-8 border-b border-gray-100 pb-6 dark:border-gray-800">
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

                            <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                                {module.title}
                            </h1>
                        </div>

                        {/* Description content  */}
                        <div
                            className="prose dark:prose-invert prose-lg sm:prose-xl max-w-none space-y-6 text-gray-700 dark:text-gray-300"
                            dangerouslySetInnerHTML={{
                                __html: fixedDescription,
                            }}
                        />

                        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-gray-100 pt-8 sm:flex-row dark:border-gray-800">
                            <div className="flex items-center gap-6">
                                {/* Likes Button */}
                                <button
                                    onClick={toggleLike}
                                    className={`flex items-center gap-2 rounded-full p-3 text-sm font-semibold transition-colors hover:scale-[1.05] disabled:cursor-not-allowed disabled:opacity-50 ${
                                        isLiked
                                            ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400'
                                            : 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <Heart
                                        size={20}
                                        className={
                                            isLiked
                                                ? 'fill-red-600 dark:fill-red-400'
                                                : 'fill-none'
                                        }
                                    />
                                    <span>{likeCount} Likes</span>
                                </button>

                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                    <MessageCircle size={20} />
                                    <span className="text-sm font-medium">
                                        {safeComments.length} Comments
                                    </span>
                                </div>
                            </div>

                            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                                {module.file_url && (
                                    <>
                                        {/* Read Online Button: Opens the Modal */}
                                        <button
                                            onClick={() =>
                                                setPdfModalOpen(true)
                                            }
                                            className="flex w-full transform items-center justify-center gap-3 rounded-full bg-indigo-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-indigo-500/50 transition-all duration-300 hover:scale-[1.02] hover:bg-indigo-700 sm:w-auto"
                                        >
                                            <BookOpen size={20} />
                                            Read Online
                                        </button>

                                        {/* Download button remains */}
                                        <a
                                            href={route('modules.read', {
                                                module: module.id,
                                            })}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download
                                            className="flex w-full transform items-center justify-center gap-3 rounded-full border border-indigo-600 bg-transparent px-6 py-3 text-base font-bold text-indigo-600 transition-all duration-300 hover:scale-[1.02] hover:bg-indigo-50 sm:w-auto dark:text-indigo-400 dark:hover:bg-gray-800"
                                        >
                                            <Download size={20} />
                                            Download
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </article>

                {/* COMMENTS SECTION */}
                <section className="mx-auto mt-12 max-w-4xl">
                    <h2 className="mb-8 text-xl font-bold text-gray-900 dark:text-white">
                        {safeComments.length} Comments
                    </h2>

                    {/* Comment Form */}
                    {auth.user ? (
                        <div className="mb-10 flex gap-4">
                            <div className="flex-shrink-0">
                                {auth.user.name ? (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                ) : (
                                    <UserCircle
                                        size={40}
                                        className="text-gray-400"
                                    />
                                )}
                            </div>
                            <form className="w-full" onSubmit={submit}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={data.body}
                                        onChange={(e) =>
                                            setData('body', e.target.value)
                                        }
                                        className="w-full border-b border-gray-300 bg-transparent py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-indigo-600 focus:outline-none focus:ring-0 dark:border-gray-700 dark:text-white dark:focus:border-indigo-400"
                                        placeholder="Add a comment..."
                                        required
                                    />
                                </div>
                                <div className={`mt-3 flex justify-end gap-2 transition-opacity duration-200 ${data.body.trim().length > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                                    <button
                                        type="button"
                                        onClick={() => reset('body')}
                                        className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        disabled={processing || data.body.trim().length === 0}
                                        className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 disabled:bg-gray-300 dark:disabled:bg-gray-700"
                                    >
                                        Comment
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="mb-10 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-900/50">
                            <p className="text-gray-600 dark:text-gray-400">
                                <a href={route('login')} className="font-semibold text-indigo-600 hover:underline dark:text-indigo-400">Log in</a> to join the discussion.
                            </p>
                        </div>
                    )}

                    {/* Display Comments */}
                    <div className="space-y-8">
                        {safeComments.length > 0 ? (
                            safeComments.map((comment) => (
                                <div key={comment.id} className="group flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                            {comment.user.name.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                                {comment.user.name}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                {formatRelativeTime(comment.created_at)}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm leading-relaxed text-gray-800 dark:text-gray-200">
                                            {comment.body}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="py-8 text-center text-gray-500 dark:text-gray-400">
                                No comments yet. Be the first to share your thoughts!
                            </p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
