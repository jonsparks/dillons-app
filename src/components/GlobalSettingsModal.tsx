import React, { useState } from 'react';
import { useWallStore } from '../store';
import { X, RotateCcw } from 'lucide-react';

interface GlobalSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSettingsModal: React.FC<GlobalSettingsModalProps> = ({ isOpen, onClose }) => {
  const { gridColumns, gridRows, setGridSize, resetTiles } = useWallStore();
  const [cols, setCols] = useState(gridColumns);
  const [rows, setRows] = useState(gridRows);

  if (!isOpen) return null;

  const handleApply = () => {
    // Only update if changed to avoid unnecessary resets
    if (cols !== gridColumns || rows !== gridRows) {
      if (confirm('Changing grid size will reset your wall layout. Are you sure?')) {
          setGridSize(cols, rows);
      } else {
          setCols(gridColumns);
          setRows(gridRows);
          return;
      }
    }
    onClose();
  };

  const handleReset = () => {
      if (confirm('Are you sure you want to clear all tiles? This cannot be undone.')) {
          resetTiles();
          onClose();
      }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-2xl w-full max-w-sm overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-800/50">
          <h2 className="text-lg font-semibold text-white">Wall Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-6">

          <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-300">Grid Layout</h3>

              <div className="flex items-center gap-4">
                <div className="flex-1 flex flex-col gap-1">
                    <label htmlFor="columns" className="text-xs text-gray-500 uppercase">Columns</label>
                    <input
                        id="columns"
                        type="number"
                        min="1"
                        max="12"
                        value={cols}
                        onChange={(e) => setCols(parseInt(e.target.value) || 1)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-gray-600 text-center"
                    />
                </div>
                <div className="text-gray-500 mt-5">×</div>
                <div className="flex-1 flex flex-col gap-1">
                    <label htmlFor="rows" className="text-xs text-gray-500 uppercase">Rows</label>
                    <input
                        id="rows"
                        type="number"
                        min="1"
                        max="12"
                        value={rows}
                        onChange={(e) => setRows(parseInt(e.target.value) || 1)}
                        className="w-full bg-gray-950 border border-gray-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-gray-600 text-center"
                    />
                </div>
              </div>
              <p className="text-xs text-yellow-600/80 bg-yellow-900/10 p-2 rounded border border-yellow-900/20">
                  Changing dimensions will recreate the grid and clear existing tiles.
              </p>
          </div>

          <div className="pt-4 border-t border-gray-800">
             <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-900/10 text-red-400 hover:bg-red-900/30 rounded-md transition-colors text-sm font-medium border border-transparent hover:border-red-900/30"
             >
                <RotateCcw size={16} />
                Reset Wall Content
             </button>
          </div>

          <div className="pt-2 flex justify-end gap-3">
             <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-white transition-colors text-sm font-medium"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
