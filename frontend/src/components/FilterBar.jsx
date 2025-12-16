import React from 'react';

export default function FilterBar({ onFilter, selectedCategory }) {
  const categories = ["All", "Global", "India", "Market", "Karnataka"];

  const filterBarStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '20px 0',
    backgroundColor: 'white',
    borderBottom: '1px solid #e0e0e0',
    gap: '50px',
  };

  const getFilterButtonStyle = (category) => ({
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0',
    textDecoration: selectedCategory === category ? 'underline' : 'none',
    color: selectedCategory === category ? '#8B0000' : '#333',
    fontWeight: selectedCategory === category ? 'bold' : 'normal',
  });

  return (
    <div style={filterBarStyle}>
      {categories.map((category) => (
        <button
          key={category}
          style={getFilterButtonStyle(category)}
          onClick={() => onFilter(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
