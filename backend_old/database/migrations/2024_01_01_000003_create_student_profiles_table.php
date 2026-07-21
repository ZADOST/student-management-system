<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('student_id_number', 30)->unique();
            $table->unsignedTinyInteger('stage')->default(1); // 1-5
            $table->decimal('gpa', 3, 2)->default(0);
            $table->unsignedSmallInteger('credits_earned')->default(0);
            $table->date('enrollment_date')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('address')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_profiles');
    }
};
