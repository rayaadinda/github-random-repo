import React, { useState, useRef, useEffect } from 'react';
import languages from '../../languages.json';
import {Input} from './ui/input'

const LanguageSelect = ({ value, onChange, disabled }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const filteredLanguages = query
    ? languages.filter(lang => 
        lang.title.toLowerCase().includes(query.toLowerCase())
      )
    : languages;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      <Input
        type="text"
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          onChange(newValue);
          setQuery(newValue);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        disabled={disabled}
        placeholder="Type or select a language"
        className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {isOpen && value && filteredLanguages.length > 0 && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredLanguages.map((lang) => (
            <div
              key={lang.value}
              onClick={() => {
                onChange(lang.value);
                setQuery('');
                setIsOpen(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {lang.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelect;
