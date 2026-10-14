"use client";

function SearchBar({ value, onChange }) {
  return (
    <div className="control">
      <label htmlFor="search">Search by name</label>
      <input
        id="search"
        type="text"
        placeholder="e.g. Aman"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;