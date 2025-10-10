import React from 'react';
import RippleButton from '@/components/buttons/RippleButton';
import { TaskData } from '@/types/admin';

interface TaskTableSectionProps {
  title: string;
  tasks: TaskData[];
  taskType: 'common' | 'other';
  onRequestToggleArchive: (task: TaskData) => void;
  onRequestDelete: (task: TaskData) => void;
}

const TaskTableSection: React.FC<TaskTableSectionProps> = ({
  title,
  tasks,
  taskType,
  onRequestToggleArchive,
  onRequestDelete,
}) => {
  if (tasks.length === 0) return null;

  return (
    <div className={`${taskType}-task`}>
      <div>
        <h5 className='font-bold text-[14px] my-[10px] text-[#555]'>
          {title} ({tasks.length})
        </h5>
        <p className='mb-[10px] text-[14px] text-[#555] font-normal'>
          {taskType === 'common'
            ? 'These tasks are automatically added to all new projects'
            : 'These tasks must be manually added to projects'}
        </p>
      </div>

      <table className='w-full max-w-full mb-[20px]'>
        <thead>
          <tr className='hover:bg-[#f5f5f5]'>
            <th className='p-[10px] border-b border-[#eee] text-left text-[#555] text-[14px]'>
              Name
            </th>
            <th className='p-[10px] border-b border-[#eee] text-right text-[#555] text-[14px] pr-[20px]'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className='hover:bg-[#f5f5f5]'>
              <td className='p-[10px_5px] border-b border-[#eee] text-[14px] text-[#555]'>
                {task.name}
              </td>
              <td className='p-[10px_5px] border-b border-[#eee] text-right'>
                <div className='flex justify-end gap-2 pr-[10px]'>
                  {task.type === 0 ? (
                    <>
                      <div className='rounded shadow-[0_3px_1px_-2px_rgba(0,_0,_0,_0.2),_0_2px_2px_0_rgba(0,_0,_0,_0.14),_0_1px_5px_0_rgba(0,_0,_0,_0.12)]'>
                        <RippleButton
                          text={task.isDeleted ? 'Unarchive' : 'Archive'}
                          bgBtncolor='#fff'
                          textBtncolor='#000'
                          width='fit-content'
                          onClick={() => onRequestToggleArchive(task)}
                        />
                      </div>
                      <RippleButton
                        text='Delete'
                        bgBtncolor='#fb483a'
                        textBtncolor={task.isDeleted ? '#fff' : '#00000042'}
                        width='fit-content'
                        onClick={task.isDeleted ? () => onRequestDelete(task) : undefined}
                      />
                    </>
                  ) : (
                    <RippleButton
                      text='Delete'
                      bgBtncolor='#fb483a'
                      textBtncolor='#fff'
                      width='fit-content'
                      onClick={() => onRequestDelete(task)}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTableSection;