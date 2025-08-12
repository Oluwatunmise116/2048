//import React from 'react';

const colors = {
  0: '#cdc1b4',
  2: '#eee4da',
  4: '#ede0c8',
  8: '#f2b179',
  16: '#f59563',
  32: '#f67c5f',
  64: '#f65e3b',
  128: '#edcf72',
  256: '#edcc61',
  512: '#edc850',
  1024: '#edc53f',
  2048: '#edc22e'
};

const Tile = ({ value }) => {
  const style = {
  background: colors[value] || '#3c3a32',
  color: value > 4 ? '#f9f6f2' : '#776e65',
  height: 'clamp(60px, 20vw, 80px)',
  width: 'clamp(60px, 20vw, 80px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'clamp(18px, 5vw, 24px)',
  fontWeight: 'bold',
  borderRadius: 6,
  boxShadow: value !== 0 ? `0 0 12px ${colors[value] || '#14F195AA'}` : 'none',
  transition: 'all 0.2s ease-in-out',

};



  return <div style={style}>{value !== 0 ? value : ''}</div>;
};

export default Tile;
