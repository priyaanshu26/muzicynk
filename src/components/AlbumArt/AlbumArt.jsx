import { motion } from 'framer-motion';
import { Radio, Mic2, Music2 } from 'lucide-react';
import './AlbumArt.css';

const AlbumArt = ({
    src,
    isPlaying = false,
    size = 'large',
    mode = 'broadcast', // broadcast, listening
    showVinyl = true,
    showReflection = true
}) => {
    return (
        <div className={`album-art-container size-${size} mode-${mode}`}>
            {/* Vinyl Record Layer */}
            {showVinyl && (
                <motion.div
                    className="vinyl-record"
                    animate={{
                        rotate: isPlaying ? 360 : 0,
                        x: isPlaying ? 30 : 0
                    }}
                    transition={{
                        rotate: { repeat: Infinity, duration: 3, ease: "linear" },
                        x: { duration: 0.5, ease: "easeOut" }
                    }}
                >
                    <div className="vinyl-grooves" />
                    <div className="vinyl-label">
                        <Music2 size={24} color="white" opacity={0.5} />
                    </div>
                </motion.div>
            )}

            {/* Main Visual/Cover */}
            <motion.div
                className="album-cover"
                whileHover={{ scale: 1.03 }}
                animate={{
                    rotate: showVinyl ? 0 : (isPlaying ? 360 : 0)
                }}
                transition={{
                    rotate: showVinyl ? {} : { repeat: Infinity, duration: 20, ease: "linear" },
                    scale: { duration: 0.3 }
                }}
            >
                {src ? (
                    <img
                        src={src}
                        alt="Broadcast Visual"
                        className="album-image"
                    />
                ) : (
                    <div className="generic-visual">
                        <motion.div
                            animate={isPlaying ? {
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5]
                            } : {}}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            {mode === 'broadcast' ? <Radio size={64} /> : <Mic2 size={64} />}
                        </motion.div>
                    </div>
                )}

                {/* Play state overlay */}
                <motion.div
                    className="album-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                >
                    <div className="overlay-content">
                        {isPlaying ? (
                            <div className="live-indicator">
                                <span className="live-dot" />
                                LIVE
                            </div>
                        ) : (
                            <div className="paused-text">PAUSED</div>
                        )}
                    </div>
                </motion.div>
            </motion.div>

            {/* Reflection Effect */}
            {showReflection && (
                <div className="album-reflection">
                    {src ? (
                        <img
                            src={src}
                            alt=""
                            aria-hidden="true"
                            className="reflection-image"
                        />
                    ) : (
                        <div className="generic-reflection">
                            {mode === 'broadcast' ? <Radio size={64} /> : <Mic2 size={64} />}
                        </div>
                    )}
                </div>
            )}

            {/* Glow Effect */}
            <div
                className="album-glow"
                style={{
                    opacity: isPlaying ? 0.5 : 0.2,
                }}
            />
        </div>
    );
};

export default AlbumArt;
