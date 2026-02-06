import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import './BackgroundEffects.css';

const BackgroundEffects = ({
    accentColor = '#667eea',
    particleCount = 20,
    isPlaying = false
}) => {
    // Generate particles with random properties
    const particles = useMemo(() => {
        return Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            size: Math.random() * 6 + 2,
            left: Math.random() * 100,
            delay: Math.random() * 20,
            duration: Math.random() * 20 + 15,
            opacity: Math.random() * 0.3 + 0.1,
        }));
    }, [particleCount]);

    return (
        <div className="background-effects" aria-hidden="true">
            {/* Animated Gradient Background */}
            <div
                className="gradient-bg"
                style={{
                    '--accent-color': accentColor,
                }}
            />

            {/* Floating Particles */}
            <div className="particles-container">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="particle"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            left: `${particle.left}%`,
                            opacity: particle.opacity,
                        }}
                        animate={isPlaying ? {
                            y: [0, -window.innerHeight * 1.5],
                            rotate: [0, 360],
                            opacity: [0, particle.opacity, particle.opacity, 0],
                        } : {
                            y: 0,
                            opacity: 0,
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Blur Orbs */}
            <motion.div
                className="blur-orb orb-1"
                animate={{
                    x: [0, 50, -30, 0],
                    y: [0, -30, 50, 0],
                    scale: [1, 1.1, 0.9, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ '--orb-color': 'var(--color-orb-1)' }}
            />
            <motion.div
                className="blur-orb orb-2"
                animate={{
                    x: [0, -50, 30, 0],
                    y: [0, 50, -30, 0],
                    scale: [1, 0.9, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ '--orb-color': 'var(--color-orb-2)' }}
            />
            <motion.div
                className="blur-orb orb-3"
                animate={{
                    x: [0, 30, -50, 0],
                    y: [0, -50, 30, 0],
                    scale: [1, 1.05, 0.95, 1],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                style={{ '--orb-color': 'var(--color-orb-3)' }}
            />

            {/* Noise texture overlay */}
            <div className="noise-overlay" />
        </div>
    );
};

export default BackgroundEffects;
