import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TrackInfo.css';

const TrackInfo = ({
    title = 'Ready to Broadcast',
    artist = 'Generic Stream',
    status = 'Idle', // Idle, Live, Connecting
    isPlaying = false
}) => {
    const titleRef = useRef(null);
    const [shouldMarquee, setShouldMarquee] = useState(false);

    useEffect(() => {
        if (titleRef.current) {
            const isOverflowing = titleRef.current.scrollWidth > titleRef.current.clientWidth;
            setShouldMarquee(isOverflowing && isPlaying);
        }
    }, [title, isPlaying]);

    return (
        <div className="track-info">
            <AnimatePresence mode="wait">
                <motion.div
                    key={title + status}
                    className="track-info-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Status Badge */}
                    <div className={`status-badge ${status.toLowerCase()}`}>
                        <span className="dot" />
                        {status}
                    </div>

                    {/* Title */}
                    <div className="track-title-container">
                        <h2
                            ref={titleRef}
                            className={`track-title ${shouldMarquee ? 'marquee' : ''}`}
                        >
                            {shouldMarquee ? (
                                <span className="marquee-content">
                                    {title} &nbsp;&nbsp;&nbsp; {title}
                                </span>
                            ) : (
                                title
                            )}
                        </h2>
                    </div>

                    {/* Artist/Source */}
                    <motion.p
                        className="track-artist"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {artist}
                    </motion.p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default TrackInfo;
