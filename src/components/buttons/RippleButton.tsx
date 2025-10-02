import React, { useState } from 'react';

type Ripple = {
  x: number;
  y: number;
  size: number;
};

type RippleButtonProps = {
  text: string;
  bgBtncolor: string;
  textBtncolor: string;
  onClick?: () => void;
  disabled?: boolean;
  width?: string;
  icon?: string;
};

const RippleButton: React.FC<RippleButtonProps> = ({ text, bgBtncolor, textBtncolor, onClick, disabled, width, icon }) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleRippleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(button.offsetWidth, button.offsetHeight);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: Ripple = { x, y, size };

    setRipples((prevRipples) => [...prevRipples, newRipple]);

    setTimeout(() => setRipples([]), 1000);

    if (onClick) {
      onClick();
    }
  };

  const buttonColor = disabled ? '#0000001f' : bgBtncolor;
  const textBtnColor = disabled ? '#00000042' : textBtncolor;

  return (
    <button 
        className={`relative overflow-hidden py-0 px-4 leading-9 text-base text-white rounded font-normal cursor-pointer flex items-center gap-x-1 justify-center ${disabled ? 'disabled cursor-default' : ''}`} 
        onClick={handleRippleClick}
        style={{ backgroundColor: buttonColor, color: textBtnColor, width: width }}
    >
      <i className='material-icons'>{icon}</i>
      {ripples.map((ripple, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white/[0.4] animate-[ripple-animation_1.5s_ease-out]"
          style={{
            left: ripple.x + 'px',
            top: ripple.y + 'px',
            width: ripple.size + 'px',
            height: ripple.size + 'px',
          }}
        >
        </div>
      ))}
      {text}
    </button>
  );
};

export default RippleButton;