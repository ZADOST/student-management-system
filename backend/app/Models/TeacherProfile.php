<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TeacherProfile extends Model
{
    protected $fillable = [
        'user_id', 'employee_id', 'salary', 'hire_date',
        'specialization', 'late_count',
    ];

    protected $casts = [
        'salary' => 'decimal:2',
        'hire_date' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function payrollRecords(): HasMany
    {
        return $this->hasMany(PayrollRecord::class, 'teacher_id', 'user_id');
    }

    public function attendanceLogs(): HasMany
    {
        return $this->hasMany(TeacherAttendance::class, 'teacher_id', 'user_id');
    }
}
