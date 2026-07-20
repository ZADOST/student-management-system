<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\ProfileChangeRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function dashboard(Request $request): JsonResponse
    {
        $user = $request->user()->load(['studentProfile', 'department']);

        $enrollments = Enrollment::with(['course.teacher', 'grades'])
            ->where('student_id', $user->id)
            ->where('status', 'active')
            ->get();

        $attendanceData = $enrollments->map(fn ($e) => [
            'course' => $e->course->title,
            'code' => $e->course->code,
            'attendance' => (float) $e->attendance_percentage,
            'grade' => (float) ($e->overall_grade ?? 0),
        ]);

        return response()->json([
            'profile' => $user,
            'enrollments' => $enrollments,
            'charts' => [
                'attendance' => $attendanceData,
                'grades' => $attendanceData,
            ],
        ]);
    }

    public function transcript(Request $request): JsonResponse
    {
        $enrollments = Enrollment::with(['course', 'grades'])
            ->where('student_id', $request->user()->id)
            ->whereIn('status', ['active', 'completed'])
            ->get();

        return response()->json($enrollments);
    }

    public function submitChangeRequest(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'field' => 'required|string|max:100',
            'new_value' => 'required|string',
            'attachment' => 'nullable|file|max:5120',
        ]);

        $oldValue = match ($validated['field']) {
            'profile_image' => $request->user()->profile_image,
            'phone' => $request->user()->phone,
            'name' => $request->user()->name,
            default => null,
        };

        $attachmentPath = null;
        if ($request->hasFile('attachment')) {
            $attachmentPath = $request->file('attachment')->store('change-requests', 'public');
        }

        $changeRequest = ProfileChangeRequest::create([
            'user_id' => $request->user()->id,
            'field' => $validated['field'],
            'old_value' => $oldValue,
            'new_value' => $validated['new_value'],
            'attachment' => $attachmentPath,
        ]);

        return response()->json($changeRequest, 201);
    }

    public function changeRequests(Request $request): JsonResponse
    {
        return response()->json(
            ProfileChangeRequest::where('user_id', $request->user()->id)
                ->latest()
                ->get()
        );
    }

    public function showStudentProfile(Request $request, User $student): JsonResponse
    {
        if (!$request->user()->isTeacher() && !$request->user()->isPrincipal()) {
            abort(403);
        }

        $student->load(['studentProfile', 'department', 'enrollments.course', 'enrollments.grades']);

        return response()->json($student);
    }
}
