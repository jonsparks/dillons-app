import React, { useState } from 'react';
import { useWallStore, type TileData } from '../store';
import { X } from 'lucide-react';

interface EditTileModalProps {
  tileId: string | null;
  onClose: () => void;
}

export const EditTileModal: React.FC<EditTileModalProps> = ({ tileId, onClose }) => {
  const { tiles, updateTile } = useWallStore();
  const [formData, setFormData] = useState<Partial<TileData>>({});
  const [initialTileId, setInitialTileId] = useState<string | null>(null);

  // Initialize form data when tileId changes
  if (tileId !== initialTileId) {
    setInitialTileId(tileId);
    if (tileId && tiles[tileId]) {
      setFormData(tiles[tileId]);
    } else {
      setFormData({});
    }
  }

  if (!tileId) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTile(tileId, formData);
    onClose();
  };

  const handleClear = () => {
    updateTile(tileId, {
      imageSrc: '',
      audioSrc: '',
      title: '',
      artist: '',
      sourceType: 'manual',
      sourceUrl: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-800/50">
          <h2 className="text-lg font-semibold text-white">Edit Tile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-xs font-medium text-gray-400 uppercase tracking-wider">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title || ''}
              onChange={handleChange}
              placeholder="e.g. Song Name"
              className="w-full bg-gray-950 border border-gray-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="artist" className="text-xs font-medium text-gray-400 uppercase tracking-wider">Artist</label>
            <input
              id="artist"
              name="artist"
              type="text"
              value={formData.artist || ''}
              onChange={handleChange}
              placeholder="e.g. Artist Name"
              className="w-full bg-gray-950 border border-gray-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="imageSrc" className="text-xs font-medium text-gray-400 uppercase tracking-wider">Cover Image URL</label>
            <input
              id="imageSrc"
              name="imageSrc"
              type="text"
              value={formData.imageSrc || ''}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-gray-950 border border-gray-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="audioSrc" className="text-xs font-medium text-gray-400 uppercase tracking-wider">Audio URL</label>
            <input
              id="audioSrc"
              name="audioSrc"
              type="text"
              value={formData.audioSrc || ''}
              onChange={handleChange}
              placeholder="https://example.com/audio.mp3"
              className="w-full bg-gray-950 border border-gray-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="mt-4 flex gap-3">
             <button
              type="button"
              onClick={handleClear}
              className="flex-1 px-4 py-2 bg-red-900/20 text-red-400 border border-red-900/50 rounded-md hover:bg-red-900/40 transition-colors text-sm font-medium"
            >
              Clear Tile
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-white transition-colors text-sm font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
