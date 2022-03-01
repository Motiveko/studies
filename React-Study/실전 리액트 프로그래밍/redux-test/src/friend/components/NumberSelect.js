import React from 'react';

function NumberSelect({ value, postfix, options, onChange }) {
  
  return (
    <div>
      <select
        onChange={e => {
          const value = Number(e.target.value);
          onChange(value);
        }}
        value={value}
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {postfix}
    </div>
  )
}

export default NumberSelect;