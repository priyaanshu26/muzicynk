import { motion } from 'framer-motion';
import './MusicVisualizer.css';

const MusicVisualizer = ({ isPlaying = false, barCount = 5 }) => {
    const bars = Array.from({ length: barCount }, (_, i) => i);

    const barVariants = {
        playing: (i) => ({
            scaleY: [0.3, 1, 0.5, 0.8, 0.3],
            transition: {
                duration: 0.8 + (i * 0.1),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
            }
        }),
        paused: {
            scaleY: 0.3,
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="music-visualizer" role="img" aria-label={isPlaying ? "Music playing" : "Music paused"}>
            {bars.map((_, i) => (
                <motion.div
                    key={i}
                    className="visualizer-bar"
                    custom={i}
                    variants={barVariants}
                    animate={isPlaying ? "playing" : "paused"}
                    style={{
                        '--bar-index': i,
                        originY: 1
                    }}
                />
            ))}
        </div>
    );
};

export default MusicVisualizer;
