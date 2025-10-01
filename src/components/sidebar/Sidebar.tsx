"use client";

import React, { useEffect, useRef, useState } from 'react'
import './Sidebar.css'
// import { getUserInfo } from 'services/userServices/userService';

import SidebarItem from '../sidebaritem/SidebarItem';
import Link from 'next/link';
import { UserInfo } from '@/types/user';
import { userService } from '@/services/userService/userServices';
import { useRouter } from 'next/navigation';

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

  // useEffect(() => {
  //   (async () => {
  //     const data = await getUserInfo();
  //     setUser(data);
  //   })();
  // }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userInfoRes, userAvaRes] = await Promise.all([
          userService.getUserInfo(),
          userService.getUserAva(),
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
    localStorage.clear();
    router.push('/account/login');
  };

  const items = [
    { icon: "account_box", label: "My information", href: "/main/my-profile" },
    { icon: "admin_panel_settings", label: "Admin", href: "/main/my-profile", childrenItems: [
      { icon: "people", label: "Users", href: "/main/my-profile" },
      { icon: "local_offer", label: "Roles", href: "/main/my-profile" },
      { icon: "settings_applications", label: "Configuration", href: "/main/my-profile" },
      { icon: "people_outline", label: "Clients", href: "/main/my-profile" },
      { icon: "gavel", label: "Punishments", href: "/main/my-profile" },
      { icon: "import_contacts", label: "Tasks", href: "/main/tasks" },
      { icon: "date_range", label: "Leave types", href: "/main/my-profile" },
      { icon: "apartment", label: "Branches", href: "/main/my-profile" },
      { icon: "description", label: "Position", href: "/main/my-profile" },
      { icon: "view_list", label: "Capability", href: "/main/my-profile" },
      { icon: "settings_accessibility", label: "Capability setting", href: "/main/my-profile" },
      { icon: "date_range", label: "Off day setting", href: "/main/my-profile" },
      { icon: "access_time", label: "Overtime settings", href: "/main/my-profile" },
      { icon: "miscellaneous_services", label: "Audit logs", href: "/main/my-profile" },
      { icon: "update", label: "Backgound Job", href: "/main/my-profile" },
    ] },
    { icon: "account_circle", label: "Personal timesheet", href: "/main/my-profile", childrenItems: [
      { icon: "alarm", label: "My timesheet", href: "/main/my-profile" },
      { icon: "event_busy", label: "My off/remote/onsite requests", href: "/main/my-profile" },
      { icon: "groups", label: "Team working calendar", href: "/main/my-profile" },
      { icon: "today", label: "My working time", href: "/main/my-profile" },
    ] },
    { icon: "group_work", label: "Management", href: "/main/my-profile", childrenItems: [
        { icon: "rule", label: "Manage off/remote/onsite requests", href: "/main/my-profile" },
        { icon: "date_range", label: "Timesheet management", href: "/main/my-profile" },
        { icon: "supervised_user_circle", label: "Timesheets monitoring", href: "/main/my-profile" },
        { icon: "assessment", label: "Project management", href: "/main/my-profile" },
        { icon: "rate_review", label: "Review Interns", href: "/main/my-profile" },
        { icon: "event_note", label: "Retrospectives", href: "/main/my-profile" },
        { icon: "access_time", label: "Manage employee working times", href: "/main/my-profile" },
        { icon: "location_city", label: "Branch Manager", href: "/main/my-profile" },
        { icon: "store", label: "Team building", href: "/main/my-profile", childrenItems: [
          { icon: "supervisor_account", label: "Team building HR", href: "/main/my-profile" },
          { icon: "supervisor_account", label: "PM request", href: "/main/my-profile" },
          { icon: "speaker_notes", label: "Request history", href: "/main/my-profile" },
          { icon: "done_all", label: "Team building project", href: "/main/my-profile" },
        ] },
        { icon: "description", label: "Report", href: "/main/my-profile", childrenItems: [
          { icon: "description", label: "Interns Info", href: "/main/my-profile" },
          { icon: "work_outline", label: "Normal working", href: "/main/my-profile" },
          { icon: "date_range", label: "Over time", href: "/main/my-profile" },
          { icon: "wysiwyg", label: "Punishment", href: "/main/my-profile" },
          { icon: "addchart", label: "Komu tracker", href: "/main/my-profile" },
        ] },
        
    ] },
  ];

  return (
    <div className='sidebar'>
      <div className='user-info'>
        <div className='info'>
          <div className='info-image' title='Update Avatar'>
            <img src={userAva?.avatarFullPath} alt="User" />
          </div>
          <div className='profile-link'>
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
        <div className='btn-group' ref={menuRef}>
          <i className='material-icons' onClick={() => setOpen((prev) => !prev)}>keyboard_arrow_down</i>
          {open && (
            <ul className='logout-menu'>
              <li>
                <a onClick={logout}>
                  <i className='material-icons'>input</i>
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
      <ul className="sidebar-menu">
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
      <div className='sidebar-footer'>
        <div className='copyright'>
           © 2025 
           <a href="javascript:void(0);">Timesheet</a>
           . 
        </div>
        <div className='version'>
          <b>Version </b>
           4.3.0.0 [20252309] 
        </div>
      </div>
    </div>
  )
}

export default SidebarComponent