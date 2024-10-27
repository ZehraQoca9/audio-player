import React, { useRef, useState, useEffect } from 'react';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const updateDuration = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    };

    audioRef.current?.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audioRef.current?.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipTime = (amount) => {
    if (audioRef.current) {
      audioRef.current.currentTime += amount;
    }
  };

  const updateCurrentTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = e.target;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const clickPercentage = clickPosition / progressBar.offsetWidth;
    const newTime = clickPercentage * duration;
    audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    const intervalId = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <audio ref={audioRef} src="Евгения Сотникова – Улетай На Крыльях Ветра.mp3" />
      <div>
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <button onClick={() => skipTime(-10)}>-10s</button>
        <button onClick={() => skipTime(10)}>+10s</button>
      </div>
      <div>
        <p>Current Time: {currentTime.toFixed(2)} / {duration.toFixed(2)}</p>
        <div
          style={{
            width: '100%',
            height: '10px',
            background: '#ddd',
            cursor: 'pointer'
          }}
          onClick={handleProgressClick}
        >
          <div
            style={{
              width: `${(currentTime / duration) * 100}%`,
              height: '100%',
              background: '#4caf50'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
