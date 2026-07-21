<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Model
{
    protected $fillable = ['name_en', 'name_ku', 'name_ar', 'code', 'description', 'is_active'];

    protected $casts = ['is_active' => 'boolean'];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class);
    }

    public function localizedName(?string $lang = 'en'): string
    {
        return match ($lang) {
            'ku' => $this->name_ku ?? $this->name_en,
            'ar' => $this->name_ar ?? $this->name_en,
            default => $this->name_en,
        };
    }
}
