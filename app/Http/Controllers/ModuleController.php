<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            ->latest('published_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Dashboard', [
            'modules' => $modules,
            'filters' => [
                'search' => $search,
            ],
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
        abort(403, 'You must be logged in to like a module.');
    }

    $alreadyLiked = $module->likes()->where('user_id', $user->id)->first();

    if ($alreadyLiked) {
        $alreadyLiked->delete();
    } else {
        $module->likes()->create([
            'user_id' => $user->id,
        ]);
    }

    // Return JSON with updated like count for frontend
return redirect()->back();
}

public function show($slug)
{
    $module = Module::where('slug', $slug)->firstOrFail();

    // Load comments and likes  for display
    $module->load([
        'comments.user:id,name',
        'likes',
    ]);

    return Inertia::render('PostDetail', [
        'module' => $module,
        'likeCount' => $module->likes()->count(),
    ]);
}

}
