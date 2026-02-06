import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import './VolumeSlider.css';

const VolumeSlider = ({
    volume = 70,
    onVolumeChange,
    showLabel = false
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [previousVolume, setPreviousVolume] = useState(volume);
    const sliderRef = useRef(null);

    const currentVolume = isMuted ? 0 : volume;

    const getVolumeIcon = () => {
        if (isMuted || currentVolume === 0) return VolumeX;
        if (currentVolume < 33) return Volume;
        if (currentVolume < 66) return Volume1;
        return Volume2;
    };

    const VolumeIcon = getVolumeIcon();

    const handleMuteToggle = () => {
        if (isMuted) {
            setIsMuted(false);
            onVolumeChange?.(previousVolume);
        } else {
            setPreviousVolume(volume);
            setIsMuted(true);
            onVolumeChange?.(0);
        }
    };

    const handleSliderChange = (e) => {
        const newVolume = parseInt(e.target.value, 10);
        setIsMuted(false);
        onVolumeChange?.(newVolume);
    };

    const handleSliderClick = (e) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        const newVolume = Math.round(Math.max(0, Math.min(100, clickPosition * 100)));
        setIsMuted(false);
        onVolumeChange?.(newVolume);
    };

    return (
        <div className="volume-slider">
            <motion.button
                className={`volume-btn ${isMuted ? 'muted' : ''}`}
                onClick={handleMuteToggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
                <VolumeIcon size={20} />
            </motion.button>

            <div
                className="volume-track-container"
                ref={sliderRef}
                onClick={handleSliderClick}
            >
                <div className="volume-track">
                    <motion.div
                        className="volume-fill"
                        style={{ width: `${currentVolume}%` }}
                        animate={{ width: `${currentVolume}%` }}
                        transition={{ duration: 0.1 }}
                    />
                    <motion.div
                        className="volume-thumb"
                        style={{ left: `${currentVolume}%` }}
                        whileHover={{ scale: 1.3 }}
                    />
                </div>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={currentVolume}
                    onChange={handleSliderChange}
                    className="volume-input"
                    aria-label="Volume"
                />
            </div>

            {showLabel && (
                <span className="volume-label">{currentVolume}%</span>
            )}
        </div>
    );
};

export default VolumeSlider;
