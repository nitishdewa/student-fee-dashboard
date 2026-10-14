"use client";

function FilterToggle({ checked, onChange }) {
  return (
    <label className="control checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      Show only pending fees
    </label>
  );
}

export default FilterToggle;