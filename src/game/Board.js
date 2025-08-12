import React from 'react';
import Tile from './Tile';

const Board = ({ grid }) => {
  const style = {
  display: 'grid',
gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 10,
  background: '#bbada0',
  padding: 10,
  borderRadius: 6,
  width: '100%',
  boxSizing: 'border-box',
};


  return (
    <div style={style}>
      {grid.flat().map((value, idx) => (
        <Tile key={idx} value={value} />
      ))}
    </div>
  );
};

export default Board;
