import React, { useState } from 'react';
import './Selection.css'

interface Option {
  id: string;
  name: string;
}

interface SelectionProps {
  options: Option[];
  onSelect: (id: string) => void;
}

const Selection: React.FC<SelectionProps> = ({ options, onSelect }) => {
    const [isOpenSelection, setIsOpenSelection] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('');

    const displayValue = selectedOption || options[0].name;

    const handleToggleDropdown = () => {
        setIsOpenSelection(!isOpenSelection);
    };

    const handleSelectOption = (id: string, name: string) => {
        setSelectedOption(name);
        onSelect(id);
        setIsOpenSelection(false);
    };

    return (
        <div className='select-main'>
            <label htmlFor="select">Task Type</label>
            <div onClick={handleToggleDropdown} className='select'>
                {displayValue}
              <b className='caret absolute right-0'></b>

            </div>
            {isOpenSelection && (
                <ul className='ul-select' id='select'>
                    {options.map((option) => (
                        <li
                        key={option.id}
                        onClick={() => handleSelectOption(option.id, option.name)}
                        className={selectedOption === option.name ? 'selected' : ''}
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