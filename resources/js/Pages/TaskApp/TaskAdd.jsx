import { useForm, router } from "@inertiajs/react"
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'
import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import TextInput from "../../Components/TextInput";
import InputLabel from "../../Components/InputLabel";
import PrimaryButton from "../../Components/PrimaryButton";

const TaskAdd = () => {
    
    const { data, setData, errors } = useForm({
        title:"",
        detail:"",
        due:"",
        label:"yet"
    });

    // 保存ボタン
    const handleSaveClick = (e) => {
        // 送信時のページリロードを防ぐ
        e.preventDefault();
        router.post('/tasks',data, {
            onSuccess: () => {
                router.visit('/tasks');
            }
        });
        
    }
    // タスク一覧に戻る
    const handleCancelClick = () => {
        // Inertia専用の遷移方法
        router.visit('/tasks');
    }
    // 日付選択
    const handleDateClick = (arg) => {
        console.log("Clicked date:", arg.dateStr); 
        setData('due', arg.dateStr);
    }

    return (
        <AuthenticatedLayout>
            <form onSubmit={handleSaveClick}>
                <h1>新規作成画面</h1>
                <InputLabel htmlFor="title" value="Title"/>
                <TextInput
                    id="title"
                    name="title"
                    value={data.title}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('title', e.target.value)}
                />

                <InputLabel htmlFor="detail" value="Detail"/>
                <TextInput
                    id="detail"
                    name="detail"
                    value={data.detail}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('detail', e.target.value)}
                />

                <InputLabel htmlFor="due" value="Due"/>

                <input 
                    id="due"
                    name="due"
                    type="text"
                    value={data.due}
                    readOnly/>
                <FullCalendar 
                    plugins={[dayGridPlugin, interactionPlugin]} 
                    initialView="dayGridMonth" 
                    dateClick={(arg) => {
                        console.log("Clicked date:", arg.dateStr);
                        setData("due", arg.dateStr);
                    }}  />

                <InputLabel htmlFor="label" value="Label"/>
                <select 
                    name="label"
                    value={data.label}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('label', e.target.value)}>
                    <option value="yet">未着手</option>
                    <option value="proceeding">進行中</option>
                    <option value="completed">完了</option>
                </select>

                <PrimaryButton type="submit" className="ms-4">保存</PrimaryButton>
                <PrimaryButton onClick={handleCancelClick} className="ms-4">キャンセル</PrimaryButton>
            </form>
        </AuthenticatedLayout>
    )

}

export default TaskAdd;