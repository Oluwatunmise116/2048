export const getInitialGrid = () => {
  const grid = Array(4).fill().map(() => Array(4).fill(0));
  return placeRandomTile(placeRandomTile(grid));
};

export const placeRandomTile = (grid) => {
  const empty = [];
  grid.forEach((row, i) =>
    row.forEach((val, j) => {
      if (val === 0) empty.push([i, j]);
    })
  );

  if (empty.length === 0) return grid;
  const [i, j] = empty[Math.floor(Math.random() * empty.length)];
  grid[i][j] = Math.random() < 0.9 ? 2 : 4;
  return [...grid];
};
