
import React from 'react';
import { Link } from '@inertiajs/react';
import { User, ChevronRight } from 'lucide-react';
import { route } from 'ziggy-js';

interface ModuleType {
    id: number;
    title: string;
    slug: string;
    description: string;
    thumbnail_url: string;
    author?: {
        name: string;
    };
}

export const ModuleCard: React.FC<{ module: ModuleType }> = ({ module }) => {
    return (
        <div className="group flex flex-col h-full bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700/50 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-1">
            {/* 1. Thumbnail */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                    src={module.thumbnail_url}
                    alt={module.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-col flex-grow p-7 lg:p-8">
                {/* 2. Title */}
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                    {module.title}
                </h2>

                {/* 3. Description */}
                <div
                    className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3 mb-8 flex-grow"
                    dangerouslySetInnerHTML={{ __html: module.description }}
                />

                {/* 4. Author Name */}
                <div className="flex items-center gap-3 mb-8 pt-6 border-t border-slate-50 dark:border-slate-700/50">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center ring-1 ring-indigo-500/10">
                        <User size={16} className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">Author</span>
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                            {module.author?.name ?? 'Anonymous'}
                        </span>
                    </div>
                </div>

                {/* 5. Read More Button */}
                <Link
                    href={route('modules.show', { slug: module.slug })}
                    className="w-full inline-flex items-center justify-center px-6 py-4 bg-slate-900 dark:bg-slate-700 text-white text-sm font-bold rounded-2xl hover:bg-indigo-600 dark:hover:bg-indigo-600 transform active:scale-95 transition-all shadow-xl shadow-slate-200 dark:shadow-none group/btn"
                >
                    Read Module
                    <div className="ml-3 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                        <ChevronRight size={14} />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export const ModuleCardSkeleton: React.FC = () => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700/50 overflow-hidden animate-pulse">
        <div className="aspect-[16/10] bg-slate-100 dark:bg-slate-900" />
        <div className="p-8 space-y-4">
            <div className="h-6 bg-slate-100 dark:bg-slate-700 rounded-lg w-3/4" />
            <div className="space-y-2">
                <div className="h-4 bg-slate-50 dark:bg-slate-700/50 rounded w-full" />
                <div className="h-4 bg-slate-50 dark:bg-slate-700/50 rounded w-5/6" />
            </div>
            <div className="pt-6 border-t border-slate-50 dark:border-slate-700/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700" />
                <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-1/3" />
            </div>
            <div className="h-14 bg-slate-100 dark:bg-slate-700 rounded-2xl w-full" />
        </div>
    </div>
);
