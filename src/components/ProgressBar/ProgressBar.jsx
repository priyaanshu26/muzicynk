import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ProgressBar.css';

const ProgressBar = ({
    currentTime = 0,
    duration = 200,
    onSeek,
    isBuffering = false
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [hoverPosition, setHoverPosition] = useState(null);
    const [hoverTime, setHoverTime] = useState(null);
    const progressRef = useRef(null);

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleClick = (e) => {
        if (!progressRef.current || !onSeek) return;
        const rect = progressRef.current.getBoundingClientRect();
        const clickPosition = (e.clientX - rect.left) / rect.width;
        const newTime = Math.max(0, Math.min(duration, clickPosition * duration));
        onSeek(newTime);
    };

    const handleMouseMove = (e) => {
        if (!progressRef.current) return;
        const rect = progressRef.current.getBoundingClientRect();
        const position = (e.clientX - rect.left) / rect.width;
        const clampedPosition = Math.max(0, Math.min(1, position));
        setHoverPosition(clampedPosition * 100);
        setHoverTime(clampedPosition * duration);
    };

    const handleMouseLeave = () => {
        setHoverPosition(null);
        setHoverTime(null);
    };

    return (
        <div className="progress-container">
            <span className="time-label time-current">{formatTime(currentTime)}</span>

            <div
                ref={progressRef}
                className={`progress-bar ${isBuffering ? 'buffering' : ''}`}
                onClick={handleClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                role="slider"
                aria-valuenow={currentTime}
                aria-valuemin={0}
                aria-valuemax={duration}
                aria-label="Seek slider"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') onSeek?.(Math.min(duration, currentTime + 5));
                    if (e.key === 'ArrowLeft') onSeek?.(Math.max(0, currentTime - 5));
                }}
            >
                <div className="progress-track">
                    {/* Filled Progress */}
                    <motion.div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                        initial={false}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1, ease: "linear" }}
                    >
                        <div className="progress-glow" />
                    </motion.div>

                    {/* Hover Preview */}
                    {hoverPosition !== null && (
                        <div
                            className="progress-hover"
                            style={{ width: `${hoverPosition}%` }}
                        />
                    )}

                    {/* Thumb */}
                    <motion.div
                        className="progress-thumb"
                        style={{ left: `${progress}%` }}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 1.1 }}
                    />

                    {/* Hover Tooltip */}
                    {hoverTime !== null && (
                        <motion.div
                            className="progress-tooltip"
                            style={{ left: `${hoverPosition}%` }}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                        >
                            {formatTime(hoverTime)}
                        </motion.div>
                    )}
                </div>
            </div>

            <span className="time-label time-duration">{formatTime(duration)}</span>
        </div>
    );
};

export default ProgressBar;
