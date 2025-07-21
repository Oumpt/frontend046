'use client';
import { useState, useRef, useEffect, useCallback } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // เล่นเพลงตั้งแต่เริ่ม
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // autoplay โดนบล็อค อาจต้องให้ user กดก่อน
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume]);

  // ซ่อน controls ถ้าคลิกนอกเมนู
  const containerRef = useRef(null);
  const handleClickOutside = useCallback(
    (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowControls(false);
        setShowVolumeControl(false);
      }
    },
    [setShowControls, setShowVolumeControl]
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
      {/* ปุ่มเปิด/ปิดเมนู */}
      <button
        onClick={() => setShowControls((v) => !v)}
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
        aria-label={showControls ? 'ซ่อนเมนูเพลง' : 'แสดงเมนูเพลง'}
      >
        🎵
      </button>

      {/* ถ้าโชว์เมนู ให้แสดงปุ่มควบคุม */}
      {showControls && (
        <>
          {/* ปุ่มเปิด/ปิดเพลง */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              backgroundColor: isPlaying ? '#FF0055' : '#555',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            aria-label={isPlaying ? 'ปิดเพลง' : 'เปิดเพลง'}
          >
            {isPlaying ? '🔊 ปิดเพลง' : '🔈 เปิดเพลง'}
          </button>

          {/* ปุ่มโชว์/ซ่อน แถบปรับเสียง */}
          <button
            onClick={() => setShowVolumeControl((v) => !v)}
            style={{
              backgroundColor: showVolumeControl ? '#FF0055' : '#555',
              color: '#fff',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '8px',
              cursor: 'pointer',
              flexShrink: 0,
            }}
            aria-label={showVolumeControl ? 'ซ่อนแถบเสียง' : 'แสดงแถบเสียง'}
          >
            🎚️
          </button>

          {/* แถบปรับเสียง */}
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

      {/* เพลง */}
      <audio ref={audioRef} src="/music/jelly.mp3" loop />
    </div>
  );
}
