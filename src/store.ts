import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SourceType = 'manual' | 'spotify' | 'apple_music' | 'soundcloud';

export interface TileData {
  id: string;
  imageSrc?: string;
  audioSrc?: string;
  title?: string;
  artist?: string;
  sourceType?: SourceType;
  sourceUrl?: string; // e.g. a Spotify URL if we decide to implement iframe fallback later
}

export interface WallState {
  tiles: Record<string, TileData>;
  gridColumns: number;
  gridRows: number;
  updateTile: (id: string, data: Partial<TileData>) => void;
  setGridSize: (columns: number, rows: number) => void;
  resetTiles: () => void;
}

const generateInitialTiles = (cols: number, rows: number): Record<string, TileData> => {
  const tiles: Record<string, TileData> = {};
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const id = `${r}-${c}`;
      tiles[id] = { id };
    }
  }
  return tiles;
};

export const useWallStore = create<WallState>()(
  persist(
    (set) => ({
      tiles: generateInitialTiles(6, 4), // Default 6x4 grid
      gridColumns: 6,
      gridRows: 4,
      updateTile: (id, data) =>
        set((state) => ({
          tiles: {
            ...state.tiles,
            [id]: { ...state.tiles[id], ...data },
          },
        })),
      setGridSize: (columns, rows) =>
        set(() => ({
          gridColumns: columns,
          gridRows: rows,
          tiles: generateInitialTiles(columns, rows),
        })),
      resetTiles: () =>
        set((state) => ({
          tiles: generateInitialTiles(state.gridColumns, state.gridRows),
        })),
    }),
    {
      name: 'music-wall-storage',
    }
  )
);
