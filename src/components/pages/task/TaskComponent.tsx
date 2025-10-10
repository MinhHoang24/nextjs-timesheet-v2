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
import ConfirmModal from '@/components/cf-modal/CfModal';

const TaskComponent = () => {
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [openPanel, setOpenPanel] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // modal confirm
  const [confirmModal, setConfirmModal] = useState<{
    open: boolean;
    isDeleteConfirm: boolean;
    task: TaskData | null;
  }>({ open: false, isDeleteConfirm: false, task: null });

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await taskService.getAllTask();
        setTasks(res.data.result);
      } catch (error) {
        console.error('Fetch tasks failed:', error);
      }
    }
    fetchTasks();
  }, [refreshKey]);

  const handleRefresh = () => setRefreshKey(prev => prev + 1);

  const normalize = (s: string = '') =>
    s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

  const filterTasks = (type: number) => {
    const filtered = tasks.filter(t => t.type === type);
    if (!search.trim()) return filtered;
    const q = normalize(search);
    return filtered.filter(t => normalize(t.name).includes(q));
  };

  const filteredTasks0 = useMemo(() => filterTasks(0), [tasks, search]);
  const filteredTasks1 = useMemo(() => filterTasks(1), [tasks, search]);

  // panel new task
  const [taskName, setTaskName] = useState('');
  const [taskType, setTaskType] = useState('');

  const handleDataChange = (name: string, type: string) => {
    setTaskName(name);
    setTaskType(type);
  };

  const handleClosePanel = () => {
    setTaskName('');
    setTaskType('');
    setOpenPanel(false);
  };

  const handleSave = async () => {
    const newTask: TaskData = {
      id: 0,
      name: taskName,
      type: Number(taskType),
      isDeleted: false,
    };

    try {
      const res = await taskService.addNewTask(newTask);
      if (res.status === 200) {
        toast.success(`Created task: ${newTask.name}`);
        handleRefresh();
      } else toast.error('Không thể thêm task.');
    } catch {
      toast.error('Có lỗi xảy ra khi thêm task ❌');
    } finally {
      setOpenPanel(false);
    }
  };

  // ──────────────── ACTION CALLBACKS ────────────────
  const handleRequestDelete = (task: TaskData) => {
    setConfirmModal({ open: true, isDeleteConfirm: true, task });
  };

  const handleRequestToggleArchive = (task: TaskData) => {
    setConfirmModal({ open: true, isDeleteConfirm: false, task });
  };

  // confirm logic (dựa trên type & isDeleted)
  const handleConfirm = async () => {
    if (!confirmModal.task) return;
    const task = confirmModal.task;

    try {
      // Nếu là DELETE
      if (confirmModal.isDeleteConfirm) {
        const res = await taskService.deleteTask(task.id);
        if (res.status === 200) toast.success(`Deleted task: ${task.name}`);
      }
      // Nếu là TOGGLE ARCHIVE
      else {
        if (task.type === 0) {
          if (task.isDeleted === false) {
            const res = await taskService.archiveTask(task.id);
            if (res.status === 200) toast.success(`Archived task: ${task.name}`);
          } else {
            const res = await taskService.deArchiveTask(task.id);
            if (res.status === 200) toast.success(`Unarchived task: ${task.name}`);
          }
        }
      }
      handleRefresh();
    } catch (err) {
      console.error(err);
      toast.error('Hành động thất bại ❌');
    } finally {
      setConfirmModal({ open: false, isDeleteConfirm: false, task: null });
    }
  };

  return (
    <div>
      <div className='card'>
        <MainHeader title='Manage Tasks' onRefresh={handleRefresh} />
        <div className='task-body p-[20px] flex flex-col gap-[30px]' key={refreshKey}>
          <div className='task-options flex items-center justify-between'>
            <RippleButton
              text='New Task'
              bgBtncolor='#f24b50'
              textBtncolor='#fff'
              icon='add'
              onClick={() => setOpenPanel(true)}
            />
            <SearchComponent
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              text='Search by task name'
            />
          </div>

          <div className='task-table'>
            <TaskTableSection
              title='Common Task'
              tasks={filteredTasks0}
              taskType='common'
              onRequestToggleArchive={handleRequestToggleArchive}
              onRequestDelete={handleRequestDelete}
            />
            <TaskTableSection
              title='Other Task'
              tasks={filteredTasks1}
              taskType='other'
              onRequestToggleArchive={handleRequestToggleArchive}
              onRequestDelete={handleRequestDelete}
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

      <ConfirmModal
        isOpen={confirmModal.open}
        message={
          confirmModal.isDeleteConfirm
            ? `Delete task: "${confirmModal.task?.name}"?`
            : confirmModal.task?.isDeleted
              ? `Unarchive task: "${confirmModal.task?.name}"?`
              : `Archive task: "${confirmModal.task?.name}"?`
        }
        onConfirm={handleConfirm}
        onCancel={() =>
          setConfirmModal({ open: false, isDeleteConfirm: false, task: null })
        }
      />
    </div>
  );
};

export default TaskComponent;