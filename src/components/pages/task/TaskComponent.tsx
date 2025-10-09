'use client'

import React, { useEffect, useMemo, useState } from 'react'
import RippleButton from '@/components/buttons/RippleButton';
import SearchComponent from '@/components/search/SearchComponent';
import Panel from '@/components/panel/Panel';
import { taskService } from '@/services/adminService/taskService';
import { TaskData } from '@/types/admin';
import MainHeader from '@/components/main-header/MainHeader';
import TaskTableSection from './TaskTableSection';
import TaskInput from './TaskInput';
import toast from 'react-hot-toast';

const TaskComponent = () => {
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [openPanel, setOpenPanel] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const taskRes = await taskService.getAllTask();
        setTasks(taskRes.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [refreshKey]);

  const normalize = (s: string = '') =>
    s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

  const hasSearch = search.trim().length > 0;

  const filterTasks = (type: number) => {
    const all = tasks.filter(t => t.type === type);
    if (!hasSearch) return all;
    const q = normalize(search);
    return all.filter(t => normalize(t.name).includes(q));
  };

  const filteredTasks0 = useMemo(() => filterTasks(0), [tasks, search]);
  const filteredTasks1 = useMemo(() => filterTasks(1), [tasks, search]);

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const [taskName, setTaskName] = useState<string>('');
  const [taskType, setTaskType] = useState<string>('');

  // Hàm lưu dữ liệu khi thay đổi
  const handleDataChange = (taskName: string, taskType: string) => {
    setTaskName(taskName);
    setTaskType(taskType);
  };

  const handleClosePanel = () => {
    setTaskName('');
    setTaskType('');
    setOpenPanel(false);
  };

  const handleSave = async () => {
    const NewTaskData: TaskData = {
      "name": taskName,
      "type": Number(taskType),
      "isDeleted": false,
      "id": 0,
    };
    try {
      const resAddNewTask = await taskService.addNewTask(NewTaskData);
      console.log(resAddNewTask);
      if (resAddNewTask.status == 200) {
        toast.success(`Created Task: ${NewTaskData.name}`);
      } else {
        toast.error('Không thể thêm task. Vui lòng thử lại!');
      }
      setOpenPanel(false);
      handleRefresh();
    } catch (error) {
      console.log('error add new task', error);
      toast.error('Có lỗi xảy ra khi thêm task ❌');
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    handleRefresh();
  }

  return (
    <div>
      <div className='card main-task bg-white min-h-[50px] relative mb-[30px] shadow-[0_2px_10px_rgba(0,_0,_0,_0.2)] w-full'>
        {/* task header */}
        <MainHeader title='Manage Tasks' onRefresh={handleRefresh} />
        <div className='task-body p-[20px] flex flex-col gap-[30px]' key={refreshKey}>
            <div className='task-options flex items-center justify-between'>
              <div className='task-add-new'>
                <RippleButton 
                  text="New Task"
                  bgBtncolor='#f24b50'
                  textBtncolor='#fff'
                  icon='add'
                  onClick={() => setOpenPanel(true)}
                />
              </div>
              <div className='task-search'>
                <SearchComponent 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  text='Search by task name'
                />
              </div>
            </div>

            <div className='task-table'>
              <TaskTableSection 
                title = 'Common Task'
                tasks={filteredTasks0}
                taskType='common'
              />
              <TaskTableSection 
                title = 'Other Task'
                tasks={filteredTasks1}
                taskType='other'
                onDeleteTask={handleDeleteTask}
              />
            </div>
        </div>
      </div>
        <Panel 
          onClick={handleSave} 
          isOpenPanel={openPanel} 
          onClose={handleClosePanel} 
          panelHeader='New task'
        >
          <TaskInput onDataChange={handleDataChange} />
        </Panel>
    </div>
  )
}

export default TaskComponent