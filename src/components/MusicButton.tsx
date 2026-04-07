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
      className={`${musicPlaying ? "music-playing" : "music-paused"}`}
      style={{ display: invitationOpened ? 'flex' : 'none' }} 
      onClick={() => toggleMusic()} 
      aria-label="Toggle Music"
    >
      <div className="music-btn-inner">
        {musicPlaying ? (
          <svg viewBox="0 0 24 24" className="music-icon-svg">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" fill="currentColor"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="music-icon-svg">
            <path d="M4.27 3L3 4.27l9 9v.28c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4v-1.17l5.46 5.46 1.27-1.27L4.27 3zM12 7h4V3h-6v1.17L12 6.17V7z" fill="currentColor"/>
          </svg>
        )}
      </div>
      {musicPlaying && <div className="music-waves"><span></span><span></span><span></span></div>}
    </div>
  );
}
