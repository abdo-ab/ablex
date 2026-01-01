<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Module extends Model
{
    protected $fillable = [
        'title',
        'description',
        'thumbnail_url',
        'file_url',
        'slug',
        'user_id',
        'author_name',
        'published_at',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($module) {
            $module->slug = Str::slug($module->title);
        });

        static::updating(function ($module) {
            $module->slug = Str::slug($module->title);
        });
    }

    // thumbnail url

   public function getThumbnailUrlAttribute(?string $value): ?string
    {
        if (! $value) {
            return null;
        }

        /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
        $disk = Storage::disk('r2');

        return $disk->url($value);
    }

    // file url
 public function getFileUrlAttribute(?string $value): ?string
    {
        if (! $value) {
            return null;
        }

        /** @var \Illuminate\Filesystem\FilesystemAdapter $disk */
        $disk = Storage::disk('r2');

        return $disk->url($value);
    }

   protected $appends = ['thumbnail_url', 'file_url'];
   public function comments() {
    return $this->morphMany(Comment::class, 'commentable')->latest();
}

//  relationship for likes
    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }
    
    public function likedByUser($userId)
    {
        return $this->likes()->where('user_id', $userId)->exists();
    }

    // Count total likes
    public function likesCount()
    {
        return $this->likes()->count();
    }
}
