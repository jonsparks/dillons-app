import React, { useState, useEffect } from 'react';
import { Wall } from './components/Wall';
import { TopBar } from './components/TopBar';
import { EditTileModal } from './components/EditTileModal';
import { GlobalSettingsModal } from './components/GlobalSettingsModal';
import { Settings } from 'lucide-react';

const App: React.FC = () => {
  const [editingTileId, setEditingTileId] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const handleOpenEditModal = (e: CustomEvent<{ tileId: string }>) => {
      setEditingTileId(e.detail.tileId);
    };

    // @ts-expect-error Custom events in TypeScript
    document.addEventListener('open-edit-modal', handleOpenEditModal);
    return () => {
      // @ts-expect-error Custom events in TypeScript
      document.removeEventListener('open-edit-modal', handleOpenEditModal);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black text-white font-sans">
      <TopBar />
      <Wall />

      {/* Global Settings Button (Bottom Right) */}
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="fixed bottom-4 right-4 z-40 p-3 bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-full text-gray-400 hover:text-white shadow-lg hover:shadow-xl hover:bg-gray-800 transition-all group"
        aria-label="Global Settings"
      >
        <Settings size={24} className="group-hover:rotate-90 transition-transform duration-500" />
      </button>

      {/* Modals */}
      <EditTileModal
        tileId={editingTileId}
        onClose={() => setEditingTileId(null)}
      />

      <GlobalSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default App;
