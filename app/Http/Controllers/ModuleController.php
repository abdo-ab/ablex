<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ModuleController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $modules = Module::with('author:id,name')
            ->select([
                'published_at',
                'id',
                'title',
                'slug',
                'description',
                'thumbnail_url',
                'user_id',
                'file_url'
            ])
            ->when($search, function ($query) use ($search) {
                $query->where('title', 'like', '%' . $search . '%');
            })
            ->orderBy('id', 'desc')
            ->paginate(6)
            ->withQueryString()
            ->through(function ($module) {
                return [
                    'id' => $module->id,
                    'title' => $module->title,
                    'slug' => $module->slug,
                    'description' => $module->description,
                    'thumbnail_url' => $module->thumbnail_url,
                    'file_url' => $module->file_url,
                    'author' => $module->author,
                    'published_at' => $module->published_at,
                ];
            });

        return Inertia::render('dashboard', [
            'modules' => $modules,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function read(Module $module)
    {
        if (!Auth::check()) {
            abort(403, 'Unauthorized');
        }

        // Get the raw file path 
        $filePath = $module->getAttributes()['file_url'];
        
        if (!$filePath) {
            abort(404, 'PDF file not found.');
        }

        // Check if file exists 
        if (!Storage::disk('r2')->exists($filePath)) {
            abort(404, 'PDF file not found in storage.');
        }

        // Stream the file 
        return response()->stream(function () use ($filePath) {
            $stream = Storage::disk('r2')->readStream($filePath);
            fpassthru($stream);
            fclose($stream);
        }, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . basename($filePath) . '"',
        ]);
    }
    public function viewer(Module $module)
    {
        if (!Auth::check()) {
            abort(403);
        }

        return Inertia::render('PdfViewer', [
            'module' => $module,
        ]);
    }

    public function storeComment(Request $request, Module $module)
    {
        $validated = $request->validate([
            'body' => 'required|string|max:2000',
        ]);

        $module->comments()->create([
            'user_id' => Auth::id(),
            'body' => $validated['body'],
        ]);

        return back()->with('success', 'Comment added!');
    }

    // LIKE LOGIC
    public function toggleLike(Module $module)
    {
        $user = Auth::user();
        if (!$user) {
            abort(403);
        }

        $existing = $module->likes()->where('user_id', $user->id)->first();

        if ($existing) {
            $existing->delete();
        } else {
            $module->likes()->create([
                'user_id' => $user->id,
            ]);
        }

        return back();
    }

    public function show($slug)
    {
        $module = Module::with([
            'comments.user:id,name',
            'author:id,name'
        ])
        ->where('slug', $slug)
        ->firstOrFail();

        return Inertia::render('PostDetail', [
            'module' => [
                'id' => $module->id,
                'title' => $module->title,
                'slug' => $module->slug,
                'description' => $module->description,
                'thumbnail_url' => $module->thumbnail_url,
                'file_url' => $module->file_url,
                'author_name' => $module->author?->name,
                'published_at' => $module->published_at,
                'comments' => $module->comments,
                'likes_count' => $module->likes()->count(),
            ],
            'auth' => [
                'user' => Auth::user()
            ],
            'isLiked' => Auth::check()
                ? $module->likes()->where('user_id', Auth::id())->exists()
                : false,
        ]);
    }
}
