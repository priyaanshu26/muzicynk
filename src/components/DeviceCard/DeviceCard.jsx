import { motion } from 'framer-motion';
import { Smartphone, Laptop, Speaker, Tablet, Monitor } from 'lucide-react';
import './DeviceCard.css';

const DeviceCard = ({
    id,
    name = 'Unknown Device',
    type = 'smartphone', // smartphone, laptop, speaker, tablet, desktop
    isActive = false,
    isHost = false,
    onSelect,
    index = 0
}) => {
    const getDeviceIcon = () => {
        switch (type) {
            case 'laptop': return Laptop;
            case 'speaker': return Speaker;
            case 'tablet': return Tablet;
            case 'desktop': return Monitor;
            default: return Smartphone;
        }
    };

    const DeviceIcon = getDeviceIcon();

    return (
        <motion.div
            className={`device-card glass-card ${isActive ? 'active' : ''} ${isHost ? 'host' : ''}`}
            onClick={() => onSelect?.(id)}
            initial={{ opacity: 0, x: 30 }}
            animate={{
                opacity: 1,
                x: 0,
                y: isActive ? [0, -4, 0] : 0
            }}
            transition={{
                opacity: { delay: index * 0.1, duration: 0.3 },
                x: { delay: index * 0.1, duration: 0.3 },
                y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            role="button"
            aria-pressed={isActive}
            tabIndex={0}
        >
            <div className="device-icon-wrapper">
                <DeviceIcon size={24} />
                {isActive && <div className="device-pulse" />}
            </div>

            <div className="device-info">
                <span className="device-name">{name}</span>
                <span className="device-type">
                    {isHost && <span className="host-badge">Host</span>}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </div>

            {isActive && (
                <motion.div
                    className="device-equalizer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <span className="eq-bar" />
                    <span className="eq-bar" />
                    <span className="eq-bar" />
                </motion.div>
            )}
        </motion.div>
    );
};

export default DeviceCard;
