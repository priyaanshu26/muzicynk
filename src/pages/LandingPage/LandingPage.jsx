import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Radio, Users, Play, Headphones } from 'lucide-react';
import { BackgroundEffects, Header, Footer } from '../../components';
import logo from '../../assets/logo.svg';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    // Stagger variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 100, damping: 20 }
        }
    };

    return (
        <div className="landing-page">
            <BackgroundEffects isPlaying={true} accentColor="#667eea" />
            <Header connectionStatus="disconnected" />

            <main className="landing-main">
                <motion.div
                    className="landing-content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.section className="hero-section" variants={itemVariants}>
                        <motion.div
                            className="hero-logo"
                            animate={{
                                scale: [1, 1.05, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <img src={logo} alt="Muzicynk" />
                        </motion.div>
                        <h1 className="hero-title">
                            Sync Your <span className="gradient-text">Sound</span>
                        </h1>
                        <p className="hero-subtitle">
                            Broadcast your laptop's audio to any device in real-time.
                            No logins, no delays, just pure sync.
                        </p>
                    </motion.section>

                    <motion.section className="options-grid" variants={itemVariants}>
                        {/* Host Option */}
                        <motion.div
                            className="option-card glass-card"
                            whileHover={{ scale: 1.05, translateY: -10 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/host')}
                        >
                            <div className="option-icon host-icon">
                                <Radio size={48} />
                            </div>
                            <h3>Start Broadcasting</h3>
                            <p>Share your system audio with others near or far.</p>
                            <div className="option-footer">
                                <span className="btn btn-primary">
                                    <Play size={18} fill="currentColor" />
                                    Be the Host
                                </span>
                            </div>
                        </motion.div>

                        {/* Client Option */}
                        <motion.div
                            className="option-card glass-card"
                            whileHover={{ scale: 1.05, translateY: -10 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/client')}
                        >
                            <div className="option-icon client-icon">
                                <Headphones size={48} />
                            </div>
                            <h3>Join a Room</h3>
                            <p>Listen along to a live broadcast on your device.</p>
                            <div className="option-footer">
                                <span className="btn btn-ghost">
                                    <Users size={18} />
                                    Join as Listener
                                </span>
                            </div>
                        </motion.div>
                    </motion.section>

                    <motion.section className="stats-bar" variants={itemVariants}>
                        <div className="stat-item">
                            <span className="stat-value">Zero</span>
                            <span className="stat-label">Configuration</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-value">Unlimited</span>
                            <span className="stat-label">Devices</span>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <span className="stat-value">Ultra Low</span>
                            <span className="stat-label">Latency</span>
                        </div>
                    </motion.section>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
