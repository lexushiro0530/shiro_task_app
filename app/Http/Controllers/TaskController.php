<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Task;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string'],
            'detail' => ['nullable', 'string'],
            'due' => ['nullable', 'date'],
            'label' => ['required', 'string'],
        ]);

        // データ保存
        Task::create([
            'title' => $request->title,
            'detail' => $request->detail,
            'due' => $request->due,
            'label' => $request->label
        ]);

        return redirect('/tasks');
    }

    // 一覧画面表示
    public function index() {
        $tasks = Task::all();
        return Inertia::render('Task', [
            'tasks' => $tasks
        ]);
    }

    // 編集画面表示
    public function edit($id) {
        $task = Task::findOrFail($id);
        return Inertia::render('TaskApp/TaskEdit', [
            'task' => $task
        ]);
    }

    // 編集
    public function update($id) {
        $validated = $request->validate([
            'title' => ['required', 'string'],
            'detail' => ['nullable', 'string'],
            'due' => ['nullable', 'date'],
            'label' => ['required', 'string'],
        ]);
    
        $task = Task::findOrFail($id);
        $task->update($validated);
    
        return redirect('/tasks');
    }

    // 削除
    public function destroy($id) {
        Task::findOrFail($id)->delete();
        return redirect('/tasks');
    }
}