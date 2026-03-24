import { create } from 'zustand';

interface AudioState {
  currentlyPlayingId: string | null;
  audioElement: HTMLAudioElement | null;
  playAudio: (id: string, src: string) => void;
  pauseAudio: () => void;
  stopAudio: () => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  currentlyPlayingId: null,
  audioElement: null,

  playAudio: (id: string, src: string) => {
    const { audioElement, currentlyPlayingId, pauseAudio } = get();

    // If clicking the same tile that's already playing, just resume
    if (currentlyPlayingId === id && audioElement) {
      audioElement.play().catch(e => console.error("Audio play failed:", e));
      return;
    }

    // Stop currently playing audio if switching to a new tile
    if (currentlyPlayingId && currentlyPlayingId !== id) {
       pauseAudio();
    }

    // Initialize new audio if necessary, or reuse existing one if we implemented a single instance.
    // Given the simplicity and potential cross-origin issues, creating a new instance per track or
    // updating the src of a single global instance works. We'll use a single global instance.
    let audio = audioElement;
    if (!audio) {
      audio = new Audio();

      // Add event listener to handle end of track
      audio.addEventListener('ended', () => {
         set({ currentlyPlayingId: null });
      });
    }

    // Set new source and play
    audio.src = src;
    audio.play().catch(e => console.error("Audio play failed:", e));

    set({ currentlyPlayingId: id, audioElement: audio });
  },

  pauseAudio: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.pause();
    }
    set({ currentlyPlayingId: null });
  },

  stopAudio: () => {
      const { audioElement } = get();
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      set({ currentlyPlayingId: null });
  }
}));
