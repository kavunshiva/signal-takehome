import React from 'react';
import './SearchBar.css';
import { Event } from '../../types';

type SearchBarProps = {
  searchQuery: string,
  onChange: (e: Event) => void,
};

const SearchBar = ({ searchQuery, onChange }: SearchBarProps) => {
  return (
    <input className="search-bar" placeholder="Search for a GIF..." value={searchQuery} onChange={onChange} />
  );
};

export default SearchBar;
