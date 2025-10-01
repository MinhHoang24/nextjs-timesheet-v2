import React, { useState } from "react";
import './SideBarItem.css';
import Link from "next/link";

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

  return (
    <li className="sidebar-item">
      <Link
        href={href}
        onClick={(e) => {
          if (childrenItems) {
            e.preventDefault();
            setOpen((prev) => !prev);
          } else if (onClick) {
            e.preventDefault();
            onClick();
          }
        }}
        className="sidebar-link"
      >
        <i className="material-icons sidebar-icon">{icon}</i>
        <span>{label}</span>
        {childrenItems && (
          <i className="material-icons arrow">
            {open ? "-" : "+"}
          </i>
        )}
      </Link>

      {childrenItems && open && (
        <ul className="sidebar-submenu">
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