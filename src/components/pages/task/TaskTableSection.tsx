// TaskTableSection.tsx

import React, { useState } from 'react';
import RippleButton from '@/components/buttons/RippleButton';
import { TaskData } from '@/types/admin';
import { taskService } from '@/services/adminService/taskService';
import ConfirmModal from '@/components/cf-modal/CfModal';
import toast from 'react-hot-toast';

interface TaskTableSectionProps {
  title: string;
  tasks: TaskData[];
  taskType: 'common' | 'other';
  onDeleteTask?: (id: number) => void;
}

const TaskTableSection: React.FC<TaskTableSectionProps> = ({ title, tasks, taskType, onDeleteTask }) => {
  const [confirmModal, setConfirmModal] = useState({ open: false, taskId: 0, taskName: '' });
  

  const handleDeleteTask = async (id: number) => {
    console.log('delete task id: ', id);
    try {
      const resDeleteTask = await taskService.deleteTask(id);
      if (resDeleteTask.status === 200 && onDeleteTask) {
        onDeleteTask(id);
      };
      toast.success('Delete Task Successfully');
    } catch (error) {
      console.log('delete failed', error);
    }
  };

  return (
    tasks.length > 0 && (
      <div className={`${taskType}-task`}>
        <div>
          <h5 className="font-bold text-[14px] my-[10px] text-[#555]">
            {title} ({tasks.length})
          </h5>
          <p className="mb-[10px] text-[14px] text-[#555] font-normal">
            {taskType === 'common' ? 'These tasks are automatically added to all new projects' : 'These tasks must be manually added to projects'}
          </p>
        </div>
        <div className="common-task-table">
          <table className="w-full max-w-full mb-[20px]">
            <thead>
              <tr className="hover:bg-[#f5f5f5]">
                <th className="p-[10px] border-b border-[#eee] align-bottom text-left text-[#555] text-[14px]">
                  Name
                </th>
                <th className="p-[10px] border-b border-[#eee] align-bottom text-left text-[#555] text-[14px]" style={{ textAlign: 'end', paddingRight: '20px' }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-[#f5f5f5]">
                  <td className="p-[10px_5px] m-[0_5px] align-middle border-b border-[#eee] text-[14px] text-[#555]">
                    <span>{task.name}</span>
                  </td>
                  <td className="p-[10px_5px] m-[0_5px] align-middle border-b border-[#eee] text-[14px] text-[#555]">
                    <div className="action flex items-center justify-end gap-[10px] pr-[10px]">
                      {taskType === 'common' ? (
                       <div className='flex gap-2'>
                        <div className="rounded shadow-[0_3px_1px_-2px_rgba(0,_0,_0,_0.2),_0_2px_2px_0_rgba(0,_0,_0,_0.14),_0_1px_5px_0_rgba(0,_0,_0,_0.12)]">
                          <RippleButton 
                            text="Archive" bgBtncolor="#fff" textBtncolor="#000000de" width="fit-content" 
                          />
                        </div>
                        <RippleButton text="Delete" bgBtncolor="#fb483a" textBtncolor="#00000042" width="fit-content" />
                      </div>
                      ) : ( 
                        <RippleButton 
                          text="Delete" bgBtncolor="#fb483a" textBtncolor="#fff" width="fit-content" 
                          onClick={() => setConfirmModal({ open: true, taskId: task.id, taskName: task.name })}
                        />
                      )}
                      
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ConfirmModal
            isOpen={confirmModal.open}
            message={`Delete task: "${confirmModal.taskName}"?`}
            onConfirm={() => handleDeleteTask(confirmModal.taskId)}
            onCancel={() => setConfirmModal({ open: false, taskId: 0, taskName: '' })}
          />
        </div>
      </div>
    )
  );
};

export default TaskTableSection;