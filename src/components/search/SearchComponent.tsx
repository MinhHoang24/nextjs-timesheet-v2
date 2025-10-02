import React, { useState } from 'react'

interface SearchProps {
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    text: string;
}

const SearchComponent: React.FC<SearchProps> = ({ value, onChange, text }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className={`search-component flex items-center border border-[#ccc] rounded-[4px] p-[14px_10px] w-[400px] bg-white hover:cursor-auto ${isFocused || value ? 'focus border-2 border-[#3f51b5]' : ''}`}>
            <i className='material-icons'>search</i>
            <div className='input-search relative w-full'>
                <input 
                    type="text" 
                    id='search' 
                    value={value} 
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className='w-full border-0 outline-none'
                />
                <label htmlFor="search" className={`absolute left-0 ${isFocused || value ? 'text-[#f44336] transform scale-[.75] translate-x-[-30px] translate-y-[-28px] bg-white px-[6px]' : 'text-black/[0.6]'}`}>
                    {text}
                </label>
            </div>
        </div>
    )
}

export default SearchComponent
