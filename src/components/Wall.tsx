import React from 'react';
import { useWallStore } from '../store';
import { Tile } from './Tile';

export const Wall: React.FC = () => {
  const { tiles, gridColumns, gridRows } = useWallStore();

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
    gap: '4px', // Slight gap for a clean vinyl wall look
    height: '100vh',
    width: '100vw',
    padding: '4px', // Match gap
  };

  // Convert tiles object to a sorted array based on ID to ensure consistent order
  const tileElements = [];
  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridColumns; c++) {
      const id = `${r}-${c}`;
      tileElements.push(<Tile key={id} id={id} data={tiles[id]} />);
    }
  }

  return (
    <div style={gridStyle} className="bg-black/90">
      {tileElements}
    </div>
  );
};
