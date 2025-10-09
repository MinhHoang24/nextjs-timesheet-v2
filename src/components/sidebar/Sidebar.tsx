"use client";

import React, { useEffect, useRef, useState } from 'react'
import SidebarItem from '../sidebaritem/SidebarItem';
import Link from 'next/link';
import { UserInfo } from '@/types/user';
import { userService } from '@/services/userService/userServices';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const SidebarComponent = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userAva, setUserAva] = useState<UserInfo | null>(null);
  const router = useRouter();

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
      const userId = Cookies.get('userId');
      try {
        const [userInfoRes, userAvaRes] = await Promise.all([
          userService.getUserInfo(Number(userId)),
          userService.getUserAva(Number(userId)),
        ])
        const userInfo = userInfoRes.data.result;
        const userAva = userAvaRes.data.result;
        setUserInfo(userInfo);
        setUserAva(userAva);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    
  }, [userInfo, userAva]);

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('userId');
    router.push('/account/login');
  };

  const items = [
    { icon: "account_box", label: "My information", href: "/main/test" },
    { icon: "admin_panel_settings", label: "Admin", href: "/", childrenItems: [
      { icon: "people", label: "Users", href: "/main/my-profile" },
      { icon: "local_offer", label: "Roles", href: "/main/test2" },
      { icon: "settings_applications", label: "Configuration", href: "/main/test2" },
      { icon: "people_outline", label: "Clients", href: "/main/test2" },
      { icon: "gavel", label: "Punishments", href: "/main/test2" },
      { icon: "import_contacts", label: "Tasks", href: "/main/tasks" },
      { icon: "date_range", label: "Leave types", href: "/main/test2" },
      { icon: "apartment", label: "Branches", href: "/main/test2" },
      { icon: "description", label: "Position", href: "/main/test2" },
      { icon: "view_list", label: "Capability", href: "/main/test2" },
      { icon: "settings_accessibility", label: "Capability setting", href: "/main/test2" },
      { icon: "date_range", label: "Off day setting", href: "/main/test2" },
      { icon: "access_time", label: "Overtime settings", href: "/main/test2" },
      { icon: "miscellaneous_services", label: "Audit logs", href: "/main/test2" },
      { icon: "update", label: "Backgound Job", href: "/main/test2" },
    ] },
    { icon: "account_circle", label: "Personal timesheet", href: "/main/test2", childrenItems: [
      { icon: "alarm", label: "My timesheet", href: "/main/test2" },
      { icon: "event_busy", label: "My off/remote/onsite requests", href: "/main/test2" },
      { icon: "groups", label: "Team working calendar", href: "/main/test2" },
      { icon: "today", label: "My working time", href: "/main/test2" },
    ] },
    { icon: "group_work", label: "Management", href: "/main/test2", childrenItems: [
        { icon: "rule", label: "Manage off/remote/onsite requests", href: "/main/test2" },
        { icon: "date_range", label: "Timesheet management", href: "/main/test2" },
        { icon: "supervised_user_circle", label: "Timesheets monitoring", href: "/main/test2" },
        { icon: "assessment", label: "Project management", href: "/main/test2" },
        { icon: "rate_review", label: "Review Interns", href: "/main/test2" },
        { icon: "event_note", label: "Retrospectives", href: "/main/test2" },
        { icon: "access_time", label: "Manage employee working times", href: "/main/test2" },
        { icon: "location_city", label: "Branch Manager", href: "/main/test2" },
        { icon: "store", label: "Team building", href: "/main/test2", childrenItems: [
          { icon: "supervisor_account", label: "Team building HR", href: "/main/test2" },
          { icon: "supervisor_account", label: "PM request", href: "/main/test2" },
          { icon: "speaker_notes", label: "Request history", href: "/main/test2" },
          { icon: "done_all", label: "Team building project", href: "/main/test2" },
        ] },
        { icon: "description", label: "Report", href: "/main/test2", childrenItems: [
          { icon: "description", label: "Interns Info", href: "/main/test2" },
          { icon: "work_outline", label: "Normal working", href: "/main/test2" },
          { icon: "date_range", label: "Over time", href: "/main/test2" },
          { icon: "wysiwyg", label: "Punishment", href: "/main/test2" },
          { icon: "addchart", label: "Komu tracker", href: "/main/test2" },
        ] },
        
    ] },
  ];

  return (
    <div className='sidebar bg-[#fdfdfd] w-[300px] h-[calc(100vh-70px)] fixed top-[70px] left-0 shadow-[2px_2px_5px_rgba(0,_0,_0,_0.1)] overflow-y-auto scrollbar-thin'>
      <div className='user-info p-[13px_15px_12px] whitespace-nowrap fixed top-[70px] z-2 w-[300px] border-b border-[#e9e9e9] bg-no-repeat bg-center h-[86px]'
        style={{ background: `url(https://stg-timesheet.nccsoft.vn/user-img-background.7f354e93c30f9d51fc3a.jpg)`}}
      >
        <div className='info flex justify-start items-center text-white relative'>
          <div className='info-image cursor-pointer mr-[12px]' title='Update Avatar'>
            <img src={userAva?.avatarFullPath} alt="User" className='rounded-full w-[50px]'/>
          </div>
          <div className='profile-link text-white text-[14px] no-underline'>
            <Link href="/main/my-profile" className='my-profile-link'>
              <div className='name'>
                {userInfo?.fullName}
              </div>
              <div className='email'>
                {userInfo?.emailAddress}
              </div>
            </Link>
          </div>
        </div>
        <div className='btn-group absolute right-0 bottom-[-5px] text-white cursor-pointer' ref={menuRef}>
          <i className='material-icons' onClick={() => setOpen((prev) => !prev)}>keyboard_arrow_down</i>
          {open && (
            <ul className='logout-menu bg-white absolute p-[5px_0] mt-[2px] text-left list-none shadow-[0_2px_10px_rgba(0,_0,_0,_0.2)] right-0 top-[-12px] min-w-[160px]'>
              <li>
                <a onClick={logout} className='p-[7px_18px] text-[#666] text-[14px] flex items-center clear-both font-normal transition-all duration-500 hover:bg-[rgba(0,_0,_0,_0.075)] hover:text-[#262626] no-underline'>
                  <i className='material-icons mr-[7px] mt-[2px] text-[20px]'>input</i>
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
      <ul className="sidebar-menu absolute w-[300px] top-[86px] z-1">
        {items.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            href={item.href}
            childrenItems={item.childrenItems}
          />
        ))}
      </ul>
      <div className='sidebar-footer fixed bottom-0 w-[300px] border-t border-[#eee] p-[15px] overflow-hidden z-2 bg-white'>
        <div className='copyright text-[13px]'>
           © 2025 
           <a className='text-[#f44336] no-underline font-bold'>Timesheet</a>
           . 
        </div>
        <div className='version mt-[5px] text-[13px]'>
          <b>Version </b>
           4.3.0.0 [20252309] 
        </div>
      </div>
    </div>
  )
}

export default SidebarComponent