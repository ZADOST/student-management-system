<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentProfile extends Model
{
    protected $fillable = [
        'user_id', 'student_id_number', 'stage', 'gpa',
        'credits_earned', 'enrollment_date', 'date_of_birth', 'address',
    ];

    protected $casts = [
        'gpa' => 'decimal:2',
        'enrollment_date' => 'date',
        'date_of_birth' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
