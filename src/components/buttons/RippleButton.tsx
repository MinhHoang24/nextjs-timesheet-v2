import { useRippleEffect } from '@/hooks/useRippleEffect';
import React from 'react';

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
  const {ripples, createRipple} = useRippleEffect(1000);

  const buttonColor = disabled ? '#0000001f' : bgBtncolor;
  const textBtnColor = disabled ? '#00000042' : textBtncolor;

  return (
    <button 
        className={`relative overflow-hidden py-0 px-4 leading-9 text-base text-white rounded font-normal cursor-pointer flex items-center gap-x-1 justify-center ${disabled ? 'disabled cursor-default' : ''}`} 
        onClick={(e) => {
          createRipple(e);
          if(onClick) {
            onClick();
          }
        }}
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