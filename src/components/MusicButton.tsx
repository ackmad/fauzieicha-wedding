"use client";

interface MusicButtonProps {
  musicPlaying: boolean;
  toggleMusic: () => void;
  invitationOpened: boolean;
}

export default function MusicButton({ musicPlaying, toggleMusic, invitationOpened }: MusicButtonProps) {
  return (
    <div 
      id="music-btn" 
      style={{ display: invitationOpened ? 'flex' : 'none' }} 
      onClick={() => toggleMusic()} 
      title="Play/Pause Music"
    >
      {!musicPlaying ? (
        <svg id="music-icon-play" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      ) : (
        <svg id="music-icon-pause" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
      )}
    </div>
  );
}
