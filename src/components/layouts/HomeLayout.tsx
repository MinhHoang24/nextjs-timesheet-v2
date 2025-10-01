import React, { ReactNode } from "react";
import HeaderComponent from "../header/Header";
import SidebarComponent from "../sidebar/Sidebar";

interface LoginLayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div>
      <HeaderComponent />
      <SidebarComponent />
      <main>{children}</main>
    </div>
  );
};

export default HomeLayout;