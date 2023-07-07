import { useState } from "react";
import {
  WiMoonAltFirstQuarter,
  WiMoonAltThirdQuarter,
  WiMoonFull,
} from "react-icons/wi";

export type FilterState = "all" | "f" | "m";

interface NameSearchProps {
  handleSearch(searchString: string): void;
  handleClick(sexFilter: FilterState, searchString: string): void;
}

export function NameFilter({ handleSearch, handleClick }: NameSearchProps) {
  const [inputValue, setInputValue] = useState("");
  //@ts-ignore
  const [activeFilter, setactiveFilter] = useState<FilterState>("all");

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
        style={{
          boxShadow: activeFilter === "all" ? "0 4px 1px -1px black" : "none",
        }}
        onClick={() => {
          handleClick("all", inputValue);
          setactiveFilter("all");
        }}
      >
        <WiMoonFull />
      </button>
      <button
        className="btn-filter btn-f"
        style={{
          boxShadow: activeFilter === "f" ? "0 4px 1px -1px black" : "none",
        }}
        onClick={() => {
          handleClick("f", inputValue);
          setactiveFilter("f");
        }}
      >
        <WiMoonAltFirstQuarter />
      </button>
      <button
        className="btn-filter btn-m"
        style={{
          boxShadow: activeFilter === "m" ? "0 4px 1px -1px black" : "none",
        }}
        onClick={() => {
          handleClick("m", inputValue);
          setactiveFilter("m");
        }}
      >
        <WiMoonAltThirdQuarter />
      </button>
    </section>
  );
}
