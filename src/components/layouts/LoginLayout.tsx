import React, { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default LoginLayout;