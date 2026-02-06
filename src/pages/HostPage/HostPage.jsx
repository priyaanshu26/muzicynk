import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Link2, Copy, Check, Radio, StopCircle } from 'lucide-react';
import {
    Header,
    AlbumArt,
    TrackInfo,
    DeviceCard,
    MusicVisualizer,
    ToastContainer,
    BackgroundEffects,
    Footer
} from '../../components';
import { broadcastService } from '../../services/AudioBroadcast';
import './HostPage.css';

const HostPage = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [status, setStatus] = useState('Idle'); // Idle, Live, Connecting
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(70);
    const [roomCode] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());
    const [toasts, setToasts] = useState([]);
    const [linkCopied, setLinkCopied] = useState(false);
    const [devicesCount, setDevicesCount] = useState(1);

    const addToast = useCallback((message, type = 'info') => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, message, type }]);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const handleStartBroadcast = async () => {
        if (status === 'Live') {
            broadcastService.stopBroadcast();
            setStatus('Idle');
            setIsPlaying(false);
            addToast('Broadcast stopped', 'info');
        } else {
            try {
                setStatus('Connecting');
                // Register connection status callback
                broadcastService.onStatusChange = (newStatus) => setStatus(newStatus);
                broadcastService.onRoomCountChange = (count) => {
                    setDevicesCount(count);
                    if (count > devicesCount) {
                        addToast('New listener joined!', 'success');
                    }
                };

                const success = await broadcastService.startBroadcast(roomCode);
                if (success) {
                    setIsPlaying(true);
                    addToast('Now broadcasting your system audio!', 'success');
                }
            } catch (err) {
                setStatus('Idle');
                addToast(err.message || 'Failed to start broadcast', 'error');
            }
        }
    };

    const handleCopyLink = () => {
        const url = `${window.location.origin}/client?room=${roomCode}`;
        navigator.clipboard?.writeText(url);
        setLinkCopied(true);
        addToast('Join link copied!', 'success');
        setTimeout(() => setLinkCopied(false), 2000);
    };

    // Staggered entrance
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
        }
    };

    return (
        <div className="host-page">
            <BackgroundEffects isPlaying={isPlaying} accentColor={status === 'Live' ? '#ff5252' : '#667eea'} />

            <Header
                connectionStatus={status === 'Live' ? 'connected' : (status === 'Connecting' ? 'connecting' : 'disconnected')}
                deviceCount={devicesCount}
            />

            <ToastContainer toasts={toasts} onClose={removeToast} />

            <main className="host-main">
                <motion.div
                    className="host-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Main Action - Broadcast Start */}
                    <motion.div className="broadcast-header" variants={itemVariants}>
                        <motion.button
                            className={`broadcast-toggle-btn ${status === 'Live' ? 'live' : ''}`}
                            onClick={handleStartBroadcast}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {status === 'Live' ? <StopCircle size={24} /> : <Radio size={24} />}
                            <span>{status === 'Live' ? 'Stop Broadcast' : 'Start Audio Broadcast'}</span>
                        </motion.button>
                        {status === 'Live' && (
                            <p className="broadcast-hint">Stream your system audio to any device</p>
                        )}
                    </motion.div>

                    {/* Album display (Placeholder for stream) */}
                    <motion.section className="hero-section" variants={itemVariants}>
                        <div className="album-wrapper">
                            <AlbumArt
                                isPlaying={isPlaying}
                                size="large"
                                mode="broadcast"
                            />
                            {isPlaying && <MusicVisualizer isPlaying={isPlaying} barCount={7} />}
                        </div>
                    </motion.section>

                    {/* Stream Info */}
                    <motion.section className="track-section" variants={itemVariants}>
                        <TrackInfo
                            title={status === 'Live' ? 'System Audio Stream' : 'Ready to Broadcast'}
                            artist={`Room Code: ${roomCode}`}
                            status={status}
                            isPlaying={isPlaying}
                        />
                    </motion.section>


                    {/* Connection Section */}
                    <motion.section className="connection-section" variants={itemVariants}>
                        <div className="glass-card connection-card">
                            <div className="link-section">
                                <h4>Share this link to join</h4>
                                <div className="link-input-group">
                                    <div className="link-display">
                                        <Link2 size={16} />
                                        <span>muzicynk.vercel.app/client?room={roomCode}</span>
                                    </div>
                                    <motion.button
                                        className="copy-btn"
                                        onClick={handleCopyLink}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {linkCopied ? <Check size={18} /> : <Copy size={18} />}
                                        {linkCopied ? 'Copied!' : 'Copy Link'}
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.section>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default HostPage;
