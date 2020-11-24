import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './FullScreenImage.css';

interface FullScreenImageProps {
  id: string;
  title: string;
  onClose: () => void;
};

interface Event {
  keyCode: number;
};

const FullScreenImage = ({ id, title, onClose }: FullScreenImageProps) => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const handleEsc = (event: Event) => { if (event.keyCode === 27) onClose() };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div>
      { isLoading ? <LoadingSpinner /> : null }
      <div className="close-x" aria-label="Close image" onClick={onClose}>×</div>
      <img
        className="full-screen-image"
        src={`https://i.giphy.com/media/${id}/giphy.gif`}
        alt={title}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default FullScreenImage;
