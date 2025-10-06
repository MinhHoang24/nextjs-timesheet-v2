import { useState, useRef } from 'react';

type MainHeaderProps = {
  title?: string;
  onRefresh: () => void;
};

const MainHeader: React.FC<MainHeaderProps> = ({ title = '', onRefresh }) => {
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLDivElement | null>(null);

  // Toggle mở/đóng menu khi click vào icon
  const handleMenuToggle = () => {
    setOpen((prev) => !prev);
  };

  // Hàm gọi callback onRefresh
  const handleRefresh = () => {
    onRefresh();
    setOpen(false); // Đóng menu sau khi refresh
  };

  // Đóng menu khi click bên ngoài
  const handleClickInside = (e: React.MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node) && !menuButtonRef.current?.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  return (
    <div className='task-header flex justify-between items-center text-[#555] p-[15px] relative border-b border-[#cccccc] border-opacity-[0.35]'>
      <h2 className='text-[18px] font-normal text-[#111]'>{title}</h2>
      <div ref={menuButtonRef} style={{ position: 'relative' }}>
        <i className='material-icons cursor-pointer' onClick={handleMenuToggle}>
          more_vert
        </i>
        {open && (
            <div ref={menuRef} className='bg-white absolute top-[44px] right-0 cursor-pointer' onClick={handleRefresh}>
                <div className='task-menu hover:cursor-pointer hover:bg-[#0000000a] bg-white p-[20px_12px] rounded-[4px] flex items-center shadow-[0_2px_4px_-1px_rgba(0,_0,_0,_0.2),_0_4px_5px_0_rgba(0,_0,_0,_0.14),_0_1px_10px_0_rgba(0,_0,_0,_0.12)]'>
                    <i className='material-icons mr-[16px]'>refresh</i>
                    <span>Refresh</span>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default MainHeader;