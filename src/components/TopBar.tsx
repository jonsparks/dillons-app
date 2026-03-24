import React, { useState } from 'react';

type SourceTab = 'manual' | 'spotify' | 'apple_music' | 'soundcloud';

export const TopBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SourceTab>('manual');
  const [isExpanded, setIsExpanded] = useState(false);

  // In a full implementation, these tabs would load different forms/instructions
  const renderTabContent = () => {
    switch (activeTab) {
      case 'manual':
        return <div className="p-4 text-sm text-gray-300">Upload or provide URLs for local files and images. Click any tile's gear icon to edit it manually.</div>;
      case 'spotify':
        return <div className="p-4 text-sm text-gray-300">Spotify integration settings. (Coming Soon: Connect account to pull playlists)</div>;
      case 'apple_music':
        return <div className="p-4 text-sm text-gray-300">Apple Music integration. (Coming Soon)</div>;
      case 'soundcloud':
         return <div className="p-4 text-sm text-gray-300">SoundCloud integration. (Coming Soon)</div>;
      default:
        return null;
    }
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${isExpanded ? 'translate-y-0' : '-translate-y-[calc(100%-32px)]'}`}>
      <div className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg flex flex-col">
        {/* Main Content Area (Hidden when collapsed) */}
        <div className="w-full max-w-4xl mx-auto h-48 flex flex-col">
          {/* Tabs Header */}
          <div className="flex border-b border-gray-800">
            {(['manual', 'spotify', 'apple_music', 'soundcloud'] as SourceTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-white border-b-2 border-white bg-gray-800/50'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
                }`}
              >
                {tab.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto">
             {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Pull Tab (Always visible) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full flex justify-center w-full pointer-events-none">
          <button
             onClick={() => setIsExpanded(!isExpanded)}
             className="bg-gray-900/80 backdrop-blur-sm text-gray-300 hover:text-white px-8 py-1 rounded-b-lg border border-t-0 border-gray-800 shadow-md text-xs font-semibold tracking-wider transition-colors pointer-events-auto"
          >
             {isExpanded ? 'HIDE SOURCES' : 'IMPORT SOURCES'}
          </button>
      </div>
    </div>
  );
};
