"use client";

function SortSelect({ value, onChange }) {
  return (
    <div className="control">
      <label htmlFor="sort">Sort by pending</label>
      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="none">Default</option>
        <option value="high">High to low</option>
        <option value="low">Low to high</option>
      </select>
    </div>
  );
}

export default SortSelect;