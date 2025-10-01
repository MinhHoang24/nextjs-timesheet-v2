import React, { useState } from 'react'
import './SearchComponent.css'

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
        <div className={`search-component ${isFocused || value ? 'focus' : ''}`}>
            <i className='material-icons'>search</i>
            <div className='input-search'>
                <input 
                    type="text" 
                    id='search' 
                    value={value} 
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <label htmlFor="search">
                    {text}
                </label>
            </div>
        </div>
    )
}

export default SearchComponent
