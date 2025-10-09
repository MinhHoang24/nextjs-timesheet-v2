import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRippleEffect } from "@/hooks/useRippleEffect";

interface SidebarItemProps {
  icon: string;
  label: string;
  href: string;
  onClick?: () => void;
  childrenItems?: SidebarItemProps[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  href,
  onClick,
  childrenItems,
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === href;

  const {ripples, createRipple} = useRippleEffect(1000);

  return (
    <li className="sidebar-item w-full bg-[#fdfdfd] p-[5px_13px] overflow-x-auto">
      <Link
        href={href}
        onClick={(e) => {
          createRipple(e);
          if (childrenItems) {
            e.preventDefault();
            setOpen((prev) => !prev);
          } else if (onClick) {
            e.preventDefault();
            onClick();
          }
        }}
        className={`sidebar-link text-[#747474] no-underline flex items-center h-[44px] relative overflow-x-hidden ${isActive ? 'text-[#f44336]' : ''}`}
      >
        {/* Ripple layers */}
        {ripples.map((r, index) => (
          <span
            key={index}
            className="absolute bg-black/20 rounded-full animate-[ripple-animation_1s_ease-out] overflow-x-hidden"
            style={{
              left: `${r.x}px`,
              top: `${r.y}px`,
              width: `${r.size}px`,
              height: `${r.size}px`,
            }}
          ></span>
        ))}
        <i className="material-icons sidebar-icon">{icon}</i>
        <span className={`pl-[12px] font-bold text-[14px] ${isActive ? 'text-[#f44336]' : 'text-[#333]'}`}>{label}</span>
        {childrenItems && (
          <i className="material-icons arrow absolute right-0 bottom-[18px]">
            {open ? "-" : "+"}
          </i>
        )}
      </Link>

      {childrenItems && open && (
        <ul className="sidebar-submenu pl-[20px]">
          {childrenItems.map((child, index) => (
            <SidebarItem
              key={index}
              icon={child.icon}
              label={child.label}
              href={child.href}
              onClick={child.onClick}
              childrenItems={child.childrenItems}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;