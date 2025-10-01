import React, { useState } from 'react';
import './InputWithLabel.css';

interface InputWithLabelProps {
  labelText: string;
  inputType: string;
  inputId: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({ labelText, inputType, inputId, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
      <div className={`input-group ${isFocused || value ? 'focus' : ''} ${!value ? 'error' : ''}`}>
        <input 
          type={inputType}
          id={inputId} 
          value={value}
          onChange={onChange} 
          onFocus={handleFocus} 
          onBlur={handleBlur}
          required
        />
        <label htmlFor={inputId}>
          {labelText}
          <span> *</span>
        </label>
      </div>
  );
};

export default InputWithLabel;