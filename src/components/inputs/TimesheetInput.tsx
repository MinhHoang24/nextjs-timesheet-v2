import React, { useState } from 'react';

interface TimesheetInputProps {
  labelText: string;
  inputType: string;
  inputId: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const TimesheetInput: React.FC<TimesheetInputProps> = ({ labelText, inputType, inputId, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const isActive = isFocused || value.length > 0;
  const isError =  !value;

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
      <div className={`input-group relative w-full ${isFocused || value ? 'focus' : ''} ${!value ? 'error' : ''}`}>
        <input 
          type={inputType}
          id={inputId} 
          value={value}
          onChange={onChange} 
          onFocus={handleFocus} 
          onBlur={handleBlur}
          required
          className={`outline-none w-full font-normal text-base
            ${isActive ? 'border-b-3 border-[#3f51b5]' : ''}
            ${isError ? 'border-b-3 border-[#f44336]' : ''}
          `}
        />
        <label 
          htmlFor={inputId}
          className={`absolute left-0 cursor-auto w-[200px] bottom-0 font-normal text-base text-start
            ${isActive ? 'text-[#3f51b5] scale-[0.75] -translate-y-[22px] -translate-x-[26px]' : ''}
            ${isError ? 'text-[#f44336]' : ''}
          `}
        >
          {labelText}
          <span className={`${isActive ? 'text-[#ff4081]' : ''}`}> *</span>
        </label>
      </div>
  );
};

export default TimesheetInput;