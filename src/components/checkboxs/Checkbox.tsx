import React from 'react';
import './CheckBox.css';

interface CheckBoxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange }) => {
  return (
    <div className="checkbox-container">
      <input 
        type="checkbox"
        id="checkbox"
        checked={checked}
        onChange={onChange}  
      />
      <label htmlFor="checkbox">Remember me</label>
    </div>
  );
};

export default CheckBox;