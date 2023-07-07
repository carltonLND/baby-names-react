import { useState } from "react";

export type FilterState = "all" | "f" | "m";

interface NameSearchProps {
  handleSearch(searchString: string): void;
  handleClick(sexFilter: FilterState, searchString: string): void;
}

export function NameFilter({ handleSearch, handleClick }: NameSearchProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <section className="name-filter">
      <input
        className="name-search"
        placeholder="Search for a name..."
        value={inputValue}
        onChange={(e) => {
          const text = e.target.value;
          setInputValue(text);
          handleSearch(text);
        }}
      />
      <button
        className="btn-filter btn-all"
        onClick={() => {
          handleClick("all", inputValue);
        }}
      >
        All Names
      </button>
      <button
        className="btn-filter btn-f"
        onClick={() => {
          handleClick("f", inputValue);
        }}
      >
        F Names
      </button>
      <button
        className="btn-filter btn-m"
        onClick={() => {
          handleClick("m", inputValue);
        }}
      >
        M Names
      </button>
    </section>
  );
}
