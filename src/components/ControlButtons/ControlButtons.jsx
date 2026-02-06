import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Repeat1 } from 'lucide-react';
import './ControlButtons.css';

const ControlButtons = ({
    isPlaying = false,
    onPlayPause,
    onPrevious,
    onNext,
    shuffleEnabled = false,
    onShuffleToggle,
    repeatMode = 'off', // 'off', 'all', 'one'
    onRepeatToggle,
    showSecondaryControls = true
}) => {
    const createRipple = (e, ref) => {
        const button = ref.current || e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      pointer-events: none;
      animation: ripple 0.6s ease-out forwards;
    `;

        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    };

    const getRepeatIcon = () => {
        if (repeatMode === 'one') return Repeat1;
        return Repeat;
    };

    const RepeatIcon = getRepeatIcon();

    return (
        <div className="control-buttons">
            {/* Secondary Controls - Left */}
            {showSecondaryControls && (
                <motion.button
                    className={`control-btn control-btn-secondary ${shuffleEnabled ? 'active' : ''}`}
                    onClick={(e) => {
                        createRipple(e);
                        onShuffleToggle?.();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={shuffleEnabled ? 'Disable shuffle' : 'Enable shuffle'}
                    aria-pressed={shuffleEnabled}
                >
                    <Shuffle size={20} />
                </motion.button>
            )}

            {/* Previous */}
            <motion.button
                className="control-btn control-btn-nav"
                onClick={(e) => {
                    createRipple(e);
                    onPrevious?.();
                }}
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous track"
            >
                <SkipBack size={24} fill="currentColor" />
            </motion.button>

            {/* Play/Pause - Main Button */}
            <motion.button
                className="control-btn control-btn-main"
                onClick={(e) => {
                    createRipple(e);
                    onPlayPause?.();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isPlaying ? 'Pause' : 'Play'}
            >
                <motion.div
                    key={isPlaying ? 'pause' : 'play'}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    {isPlaying ? (
                        <Pause size={32} fill="currentColor" />
                    ) : (
                        <Play size={32} fill="currentColor" style={{ marginLeft: 4 }} />
                    )}
                </motion.div>
            </motion.button>

            {/* Next */}
            <motion.button
                className="control-btn control-btn-nav"
                onClick={(e) => {
                    createRipple(e);
                    onNext?.();
                }}
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next track"
            >
                <SkipForward size={24} fill="currentColor" />
            </motion.button>

            {/* Secondary Controls - Right */}
            {showSecondaryControls && (
                <motion.button
                    className={`control-btn control-btn-secondary ${repeatMode !== 'off' ? 'active' : ''}`}
                    onClick={(e) => {
                        createRipple(e);
                        onRepeatToggle?.();
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Repeat mode: ${repeatMode}`}
                >
                    <RepeatIcon size={20} />
                </motion.button>
            )}
        </div>
    );
};

export default ControlButtons;
