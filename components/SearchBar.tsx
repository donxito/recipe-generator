import React from "react";
import { Input } from 'antd';

const { Search } = Input;

interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchRecipes: () => void;
}

function SearchBar({ query, setQuery, searchRecipes }: SearchBarProps) {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      <Search
        placeholder="Enter ingredients (e.g: 'potatoes, garlic, celery')"
        enterButton="Search"
        size="large"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onSearch={searchRecipes}
        style={{ width: '50%' }}
      />
    </div>
  );
}

export default SearchBar;
