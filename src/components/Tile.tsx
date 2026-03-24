import React, { useState } from 'react';
import { type TileData } from '../store';
import { useAudio } from '../hooks/useAudio';
import { Settings, Play, Pause, Music } from 'lucide-react';

interface TileProps {
  id: string;
  data: TileData;
}

export const Tile: React.FC<TileProps> = ({ id, data }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { currentlyPlayingId, playAudio, pauseAudio } = useAudio();
  const isPlaying = currentlyPlayingId === id;
  const hasContent = data.imageSrc || data.audioSrc;

  const handleTileClick = () => {
    if (!data.audioSrc) return; // Ignore if no audio to play

    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio(id, data.audioSrc);
    }
  };

  const openSettings = (e: React.MouseEvent) => {
    e.stopPropagation(); // Don't trigger the tile click
    // We will trigger a global event or store action to open the edit modal later
    document.dispatchEvent(new CustomEvent('open-edit-modal', { detail: { tileId: id } }));
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-gray-900 group transition-all duration-300 rounded-sm shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleTileClick}
      style={{
        cursor: data.audioSrc ? 'pointer' : 'default',
        boxShadow: isPlaying ? '0 0 15px rgba(255,255,255,0.3)' : 'none',
        transform: isPlaying ? 'scale(0.98)' : 'scale(1)',
      }}
    >
      {/* Artwork or Placeholder */}
      {data.imageSrc ? (
        <img
          src={data.imageSrc}
          alt={data.title || "Album Art"}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-90' : 'opacity-100'}`}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 text-gray-500">
           {hasContent ? null : <Music size={32} className="opacity-20" />}
        </div>
      )}

      {/* Overlay - appears on hover or when playing */}
      <div
        className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
          isHovered || isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {data.audioSrc && (
            <div className="text-white drop-shadow-lg">
              {isPlaying ? <Pause size={48} /> : (isHovered && <Play size={48} />)}
            </div>
        )}
      </div>

      {/* Info Overlay (bottom) */}
      {(data.title || data.artist) && (isHovered || isPlaying) && (
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white">
          <div className="text-sm font-bold truncate">{data.title}</div>
          <div className="text-xs text-gray-300 truncate">{data.artist}</div>
        </div>
      )}

      {/* Settings Button (top right) */}
      <button
        onClick={openSettings}
        className={`absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white backdrop-blur-sm transition-opacity duration-200 hover:bg-black/80 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Edit Tile"
      >
        <Settings size={16} />
      </button>

      {/* Playing indicator ring */}
      {isPlaying && (
         <div className="absolute inset-0 border-2 border-white/30 pointer-events-none rounded-sm" />
      )}
    </div>
  );
};
