import React, { useEffect, useRef, useState } from 'react';
// import './Selection.css'

interface Option {
  id: string;
  name: string;
}

interface SelectionProps {
  options: Option[];
  onSelect: (id: string) => void;
  nameSelect: string;
}

const Selection: React.FC<SelectionProps> = ({ options, onSelect, nameSelect }) => {
  const [isOpenSelection, setIsOpenSelection] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('');
  const selectRef = useRef<HTMLDivElement>(null);

  const defaultOption = options[0];
  const displayValue = options.find(o => o.id === selectedId)?.name || defaultOption?.name || '';

  useEffect(() => {
    if (options.length > 0 && !selectedId) {
      const firstOption = options[0];
      setSelectedId(firstOption.id);
      onSelect(firstOption.id);
    }
  }, [options, selectedId, onSelect]);

  const handleToggleDropdown = () => {
    setIsOpenSelection(prev => !prev);
  };

  const handleSelectOption = (id: string, name: string) => {
    setSelectedId(id);
    onSelect(id);
    setIsOpenSelection(false);
  };

  return (
    <div className='select-main relative mt-4 cursor-pointer' tabIndex={0} onBlur={() => setIsOpenSelection(false)} ref={selectRef}>
      <label htmlFor="select" className='text-black/[0.54] text-[0.63rem]'>{nameSelect}</label>
      <div onClick={handleToggleDropdown} className='select border-b border-[rgba(0,0,0,0.42)] bg-white py-1 relative flex items-center'>
        {displayValue}
        <b className='caret absolute right-0'></b>
      </div>

      {isOpenSelection && (
        <ul className='ul-select absolute w-full top-6 rounded max-h-64 overflow-auto bg-white shadow-[0_2px_4px_-1px_rgba(0,0,0,0.2),0_4px_5px_0_rgba(0,0,0,0.14),0_1px_10px_0_rgba(0,0,0,0.12)]' id='select'>
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelectOption(option.id, option.name)}
              className={`p-[10px] hover:bg-[rgba(0,0,0,0.04)] ${option.id === selectedId ? 'selected text-[#3f51b5] bg-[rgba(0,0,0,0.12)]' : 'bg-[#fff]'}`}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Selection;