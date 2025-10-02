'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import './task.css'
import RippleButton from '@/components/buttons/RippleButton';
import SearchComponent from '@/components/search/SearchComponent';
import Panel from '@/components/panel/Panel';
import InputWithLabel from '@/components/inputs/InputWithLabel';
import { taskService } from '@/services/adminService/taskService';
import { TaskData } from '@/types/admin';


const Task = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [openPanel, setOpenPanel] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const taskRes = await taskService.getAllTask();
        const taskList = taskRes.data.result;
        setTasks(taskList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Tasks updated:", tasks);
  }, [tasks]);

  const normalize = (s: string = '') =>
    s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

  const hasSearch = search.trim().length > 0;

  const filteredTasks0 = useMemo(() => {
  const all = tasks.filter(t => t.type === 0);
    if (!hasSearch) return all;
    const q = normalize(search);
    return all.filter(t => normalize(t.name).includes(q));
  }, [tasks, search, hasSearch]);

  const filteredTasks1 = useMemo(() => {
    const all = tasks.filter(t => t.type === 1);
    if (!hasSearch) return all;
    const q = normalize(search);
    return all.filter(t => normalize(t.name).includes(q));
  }, [tasks, search, hasSearch]);

  return (
    <div>
      <div className='card main-task'>
        <div className='task-header'>
          <h2>Manage Tasks</h2>
          <div ref={menuRef} style={{ position: 'relative' }}>
            <i className='material-icons' onClick={() => setOpen((prev) => !prev)}>more_vert</i>
            {open && (
              <div className='task-menu'>
                <i className='material-icons'>refresh</i>
                <span>Refresh</span>
              </div>
            )}
          </div>
        </div>
        <div className='task-body'>
            <div className='task-options'>
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

              {filteredTasks0.length > 0 && (
                <div className='common-task'>
                  <div>
                    <h5> Common Task ({filteredTasks0.length}) </h5>
                    <p> These tasks are automatically added to all new projects </p>
                  </div>
                  <div className='common-task-table'>
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th style={{ textAlign: 'end', paddingRight: '20px' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTasks0.map(task => (
                          <tr key={task.id}>
                            <td><span>{task.name}</span></td>
                            <td>
                              <div className='action'>
                                <RippleButton text='Archive' bgBtncolor='#fff' textBtncolor='#000000de' width='fit-content' />
                                <RippleButton text='Delete' bgBtncolor='#fb483a' textBtncolor='#00000042' width='fit-content' />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {filteredTasks1.length > 0 && (
                <div className='other-task'>
                  <div>
                    <h5> Other Task ({filteredTasks1.length}) </h5>
                    <p> These tasks must be manually added to projects </p>
                  </div>
                  <div className='common-task-table'>
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th style={{ textAlign: 'end', paddingRight: '20px' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTasks1.map(task => (
                          <tr key={task.id}>
                            <td><span>{task.name}</span></td>
                            <td>
                              <div className='action'>
                                <RippleButton text='Delete' bgBtncolor='#fb483a' textBtncolor='#fff' width='fit-content' />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
        </div>
      </div>
      <Panel isOpenPanel={openPanel} onClose={() => setOpenPanel(false)} panelHeader='New task'>
        <p>This is content inside panel</p>
      </Panel>
    </div>
  )
}

export default Task