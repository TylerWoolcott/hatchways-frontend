import React from 'react'

const SearchName = ({ placeholder, handleSearchName }) => {
    return (
        <input className="text-gray-500 text-lg ml-2 -mt-16 w-65% fixed z-20 appearance-none no-x-search leading-tight outline-none p-3 focus:border-gray-500 border-b border-gray-300"
            type="search"
            name="search-students"
            placeholder={placeholder}
            spellCheck="false"
            autocomplete="off"
            onChange= {(event) => handleSearchName(event.target.value)}
        />
    )
}

export default SearchName