<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Http\Resources\TaskResource;

class TaskController extends Controller
{
    public function index()
    {
        return TaskResource::collection(Task::with('users')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|in:low,medium,high',
            'deadline' => 'nullable|date',
            'image' => 'nullable|image|max:2048',
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $imagePath = null;
        if ($request -> hasFile('image')){
            $imagePath = $request->file('image')->store('tasks/images','public');
        }

        $task = Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'status' => 'pending',
            'image_url' => $imagePath,
            'priority' => $validated['priority'],
            'deadline' => $validated['deadline'],
        ]);
        $task -> users()->sync($validated['user_ids']);

        return new TaskResource($task -> load('users'));
    }

    public function myTasks($userId)
    {
        $tasks = Task::whereHas('users', fn($q) => $q -> where('users.id', $userId))->get();
        return TaskResource::collection($tasks);
    }

    public function updateStatus(Request $request, Task $task)
    {
        $validated = $request -> validate([
            'status' => 'required|in:pending,in_progress,completed',
        ]);

        $task -> update($validated); 
        return new TaskResource($task -> load('users'));
    }
}
