import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, Volume2 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import {
    Header,
    AlbumArt,
    TrackInfo,
    ProgressBar,
    VolumeSlider,
    MusicVisualizer,
    BackgroundEffects,
    ToastContainer
} from '../../components';
import { receiverService } from '../../services/AudioReceiver';
import './ClientPage.css';

const ClientPage = () => {
    const [searchParams] = useSearchParams();
    const roomFromUrl = searchParams.get('room');

    const [roomCode, setRoomCode] = useState(roomFromUrl || '');
    const [isPlaying, setIsPlaying] = useState(false);
    const [status, setStatus] = useState('Idle'); // Idle, Live, Connecting
    const [volume, setVolume] = useState(70);
    const [roomCount, setRoomCount] = useState(1);
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        if (roomFromUrl) {
            handleJoinRoom(roomFromUrl);
        }
    }, [roomFromUrl]);

    const addToast = (message, type = 'info') => {
        const id = Date.now().toString();
        setToasts(prev => [...prev, { id, message, type }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    const handleJoinRoom = (code) => {
        if (!code) return;
        setStatus('Connecting');

        receiverService.onStatusChange = (newStatus) => {
            setStatus(newStatus);
            if (newStatus === 'Live') {
                setIsPlaying(true);
                addToast('Connected to broadcast!', 'success');
            }
        };

        receiverService.onRoomCountChange = (count) => {
            setRoomCount(count);
        };

        receiverService.onStateUpdate = (state) => {
            if (state.isPlaying !== undefined) setIsPlaying(state.isPlaying);
        };

        receiverService.joinRoom(code);
    };

    const handleLeaveRoom = () => {
        receiverService.leaveRoom();
        setStatus('Idle');
        setIsPlaying(false);
        addToast('Disconnected', 'info');
    };

    return (
        <div className="client-page">
            <BackgroundEffects isPlaying={isPlaying} accentColor={status === 'Live' ? '#1DB954' : '#667eea'} />
            <Header
                connectionStatus={status === 'Live' ? 'connected' : (status === 'Connecting' ? 'connecting' : 'disconnected')}
                deviceCount={roomCount}
            />
            <ToastContainer toasts={toasts} onClose={removeToast} />


            <main className="client-main">
                <motion.div
                    className="client-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {status === 'Idle' ? (
                        <div className="join-form glass-card">
                            <h3>Join a Broadcast</h3>
                            <p>Enter a room code to start listening</p>
                            <div className="join-input-group">
                                <input
                                    type="text"
                                    placeholder="Code (e.g. ABCDEF)"
                                    value={roomCode}
                                    onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                                />
                                <button
                                    className="btn btn-accent"
                                    onClick={() => handleJoinRoom(roomCode)}
                                >
                                    Join Room
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Album Art - Focus */}
                            <div className="album-hero">
                                <AlbumArt
                                    isPlaying={isPlaying}
                                    size="large"
                                    mode="listening"
                                    showVinyl={false}
                                />
                            </div>

                            {/* Music Visualizer */}
                            <div className="visualizer-wrapper">
                                <MusicVisualizer isPlaying={isPlaying} barCount={7} />
                            </div>

                            {/* Track Info */}
                            <div className="track-wrapper">
                                <TrackInfo
                                    title="Live Broadcast"
                                    artist={roomFromUrl ? `Room: ${roomFromUrl}` : `Room: ${roomCode}`}
                                    status={status}
                                    isPlaying={isPlaying}
                                />
                            </div>

                            {/* Manual Play Trigger (Browsers require user gesture for audio) */}
                            {!isPlaying && status === 'Live' && (
                                <button
                                    className="btn btn-accent start-audio-btn"
                                    onClick={() => setIsPlaying(true)}
                                >
                                    Start Audio
                                </button>
                            )}

                            {/* Volume */}
                            <div className="volume-wrapper">
                                <VolumeSlider volume={volume} onVolumeChange={setVolume} />
                            </div>

                            <button
                                className="leave-btn"
                                onClick={handleLeaveRoom}
                            >
                                Disconnect
                            </button>
                        </>
                    )}
                </motion.div>
            </main>

            <footer className="client-footer">
                <div className="brand">
                    <span className="brand-name">Muzicynk Listener</span>
                    <span className="dev-attribution">Handcrafted with ❤️ by Priyanshu Chaudhary & Antigravity</span>
                </div>
            </footer>
        </div >
    );
};

export default ClientPage;
