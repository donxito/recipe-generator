import React from "react";

interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchRecipes: () => void;
}
function SearchBar({ query, setQuery, searchRecipes }: SearchBarProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchRecipes();
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center mb-8 mt-4">
      <div className="w-1/2 h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative ">
        <input
          type="search"
          className="appearance-none w-full outline-none focus:outline-none active:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter the ingredients that you want to use (e.g: 'potatoes, garlic, celery')"
        />
        <button
          className="ml-1 outline-none focus:outline-none active:outline-none"
          onClick={searchRecipes}
        >
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
