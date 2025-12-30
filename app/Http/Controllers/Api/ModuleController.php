<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ModuleController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $modules = Module::with('author:id,name')
            ->select([
                'id',
                'title',
                'slug',
                'description',
                'thumbnail_url',
                'user_id',
                'published_at'
            ])
            ->when($search, function ($query) use ($search) {
                $query->where('title', 'like', '%' . $search . '%');
            })
            ->orderBy('id', 'desc')
            ->paginate(10);

        return response()->json($modules);
    }

    public function show($id)
    {
        $module = Module::with([
            'comments.user:id,name',
            'author:id,name'
        ])->findOrFail($id);

        return response()->json([
            'id' => $module->id,
            'title' => $module->title,
            'slug' => $module->slug,
            'description' => $module->description,
            'thumbnail_url' => $module->thumbnail_url,
            'file_url' => $module->file_url, // Expose file URL
            'author' => $module->author,
            'published_at' => $module->published_at,
            'comments' => $module->comments,
            'likes_count' => $module->likes()->count(),
            'is_liked' => $module->likes()->where('user_id', Auth::id())->exists(),
        ]);
    }

    public function like($id)
    {
        $module = Module::findOrFail($id);
        $user = Auth::user();

        $existing = $module->likes()->where('user_id', $user->id)->first();

        if ($existing) {
            $existing->delete();
            $message = 'Unliked';
        } else {
            $module->likes()->create([
                'user_id' => $user->id,
            ]);
            $message = 'Liked';
        }

        return response()->json([
            'message' => $message,
            'likes_count' => $module->likes()->count(),
            'is_liked' => !$existing
        ]);
    }

    public function comment(Request $request, $id)
    {
        $module = Module::findOrFail($id);

        $validated = $request->validate([
            'body' => 'required|string|max:2000',
        ]);

        $comment = $module->comments()->create([
            'user_id' => Auth::id(),
            'body' => $validated['body'],
        ]);

        return response()->json([
            'message' => 'Comment added',
            'comment' => $comment->load('user:id,name')
        ]);
    }
}
