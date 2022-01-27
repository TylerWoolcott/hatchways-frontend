import React from 'react'

const SearchTag = ({ placeholder, handleSearchTag }) => {
    return (
            <input className="text-gray-500 text-lg ml-2 -mt-5 w-65% fixed z-10 appearance-none no-x-search leading-tight outline-none p-3 focus:border-gray-500 border-b border-gray-300"
            type="search"
            name="search-tags"
            placeholder={placeholder}
            spellCheck="false"
            autocomplete="off"
            onChange={(event) => handleSearchTag(event.target.value)}
        />
    )
}

export default SearchTag