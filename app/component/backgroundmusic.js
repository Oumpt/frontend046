'use client';
import { useState, useRef, useEffect, useCallback } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // autoplay อาจโดนบล็อค ต้องให้ user กดก่อน
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  const containerRef = useRef(null);
  const handleClickOutside = useCallback(
    (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowControls(false);
        setShowVolumeControl(false);
      }
    },
    []
  );

  useEffect(() => {
    if (showControls) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      setShowVolumeControl(false);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showControls, handleClickOutside]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 999,
        backgroundColor: '#222',
        padding: showControls ? '10px 15px' : '8px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#fff',
        userSelect: 'none',
        transition: 'width 0.3s ease',
        width: showControls ? 'auto' : '40px',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      <button
        onClick={() => setShowControls((v) => !v)}
        aria-label={showControls ? 'ซ่อนเมนูเพลง' : 'แสดงเมนูเพลง'}
        style={{
          backgroundColor: '#555',
          color: '#fff',
          border: 'none',
          padding: '8px',
          borderRadius: '50%',
          cursor: 'pointer',
          flexShrink: 0,
          fontSize: '18px',
          lineHeight: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          userSelect: 'none',
        }}
      >
        🎵
      </button>

      {showControls && (
        <>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'ปิดเพลง' : 'เปิดเพลง'}
            style={{
              backgroundColor: isPlaying ? '#FF0055' : '#555',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            {isPlaying ? '🔊 ปิดเพลง' : '🔈 เปิดเพลง'}
          </button>

          <button
            onClick={() => setShowVolumeControl((v) => !v)}
            aria-label={showVolumeControl ? 'ซ่อนแถบเสียง' : 'แสดงแถบเสียง'}
            style={{
              backgroundColor: showVolumeControl ? '#FF0055' : '#555',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            🎚️
          </button>

          {showVolumeControl && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{ cursor: 'pointer' }}
              aria-label="ปรับเสียงเพลง"
            />
          )}
        </>
      )}

      <audio ref={audioRef} src="/music/nm.mp3" loop />
    </div>
  );
}
