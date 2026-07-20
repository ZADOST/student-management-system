<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\User;

class DashboardController extends Controller
{
    public function student(Request $request)
    {
        // Mock data structure matching the React frontend
        return response()->json([
            'stats' => [
                'gpa' => 3.8,
                'total_courses' => 6,
                'attendance_rate' => 95,
                'late_hours' => 2
            ],
            'chart_data' => [
                ['month' => 'Sep', 'attendance' => 100, 'grades' => 85],
                ['month' => 'Oct', 'attendance' => 95, 'grades' => 88],
                ['month' => 'Nov', 'attendance' => 90, 'grades' => 86],
                ['month' => 'Dec', 'attendance' => 98, 'grades' => 92],
            ],
            'courses' => [
                ['id' => 'CS101', 'name' => 'Intro to Computer Science', 'teacher' => 'Dr. Alan Turing', 'grade' => 95, 'attendance' => '100%']
            ]
        ]);
    }

    public function teacher(Request $request)
    {
        return response()->json([
            'students' => [
                ['id' => 'STU-1001', 'name' => 'Ahmad Mohammed', 'grade' => 92, 'attendance' => 95, 'avatar' => 'A'],
                ['id' => 'STU-1002', 'name' => 'Sarah Ahmed', 'grade' => 88, 'attendance' => 90, 'avatar' => 'S']
            ]
        ]);
    }

    public function principal(Request $request)
    {
        return response()->json([
            'stats' => [
                'total_students' => 1230,
                'total_teachers' => 85,
                'departments' => 8,
                'pending_payroll' => 45000
            ],
            'department_data' => [
                ['name' => 'CS Dept', 'students' => 400],
                ['name' => 'Math Dept', 'students' => 300]
            ]
        ]);
    }
}
