import { router } from '@inertiajs/react'
import { useState } from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import '../../css/task.css';

const TaskIndex = ({ tasks }) => {

    const [filter, setFilter] = useState("all");

    const filteredTasks = tasks.filter(task => {
        if (filter === "yet") {
            return task.label === 'yet';
        } else if (filter === 'completed') {
            return task.label === 'completed';
        } else {
            return true;
        }
     });

    const handleEditClick = (id) => {
        router.visit(`/tasks/${id}/edit`);
    }
    const handleDeleteClick = (id) => {
        router.delete(`/tasks/${id}`);
    }
    const handleCreateClick = () => {
        router.visit(`/tasks/new`);
    }
    return (
        <AuthenticatedLayout>
            <h1 className="title">📝Task一覧</h1>
            <PrimaryButton 
                onClick={handleCreateClick}
                className="createButton">
                    新規作成
            </PrimaryButton>
            <div className="filter">
                <p>フィルター：</p>
                <button onClick={() => setFilter("all")}>すべて</button>
                <button onClick={() => setFilter("yet")}>未完了</button>
                <button onClick={() => setFilter("completed")}>完了</button>
            </div>
            <div className="tasks">
                {filteredTasks.map((task) => {
                    return (
                        <div className="task" key={task.id}>
                            <p>・</p>
                            <p className="task_label">{task.label}</p>
                            <p className='task_title'>{task.title}</p>
                            <PrimaryButton 
                                onClick={() => handleEditClick(task.id)}
                                className="editButton">
                                    編集
                            </PrimaryButton>
                            <PrimaryButton 
                                onClick={() => handleDeleteClick(task.id)}
                                className="deleteButton">
                                    削除
                            </PrimaryButton>
                        </div>
                    )   
                })}
            </div>
        </AuthenticatedLayout>
    )       
}

export default TaskIndex;