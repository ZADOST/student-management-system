<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Principal Admin Account
        User::create([
            'name' => 'Admin Principal',
            'email' => 'admin@ims.edu',
            'password' => Hash::make('password123'),
            'role' => 'principal',
            'is_active' => true,
        ]);

        // Create a Mock Teacher
        User::create([
            'name' => 'Dr. Alan Turing',
            'email' => 'teacher@ims.edu',
            'password' => Hash::make('password123'),
            'role' => 'teacher',
            'is_active' => true,
        ]);

        // Create a Mock Student
        User::create([
            'name' => 'Sarah Ahmed',
            'email' => 'student@ims.edu',
            'password' => Hash::make('password123'),
            'role' => 'student',
            'is_active' => true,
        ]);
    }
}
