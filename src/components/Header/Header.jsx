import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Wifi, WifiOff, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './Header.css';

const Header = ({
  connectionStatus = 'disconnected',
  deviceCount = 0
}) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const getStatusConfig = () => {
    switch (connectionStatus) {
      case 'connected':
        return {
          icon: Wifi,
          text: 'Connected',
          className: 'status-connected'
        };
      case 'connecting':
        return {
          icon: Wifi,
          text: 'Connecting',
          className: 'status-connecting'
        };
      default:
        return {
          icon: WifiOff,
          text: 'Disconnected',
          className: 'status-disconnected'
        };
    }
  };

  const status = getStatusConfig();
  const StatusIcon = status.icon;

  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-content">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <motion.div
            className="logo-icon"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={logo} alt="Muzicynk Logo" className="logo-img" />
          </motion.div>
          <span className="logo-text">Muzicynk</span>
        </Link>

        {/* Right Section */}
        <div className="header-right">
          {/* Device Count */}
          {deviceCount > 0 && (
            <motion.div
              className="device-count"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <Users size={16} />
              <span>{deviceCount}</span>
            </motion.div>
          )}

          {/* Connection Status */}
          <div className={`connection-status ${status.className}`}>
            <StatusIcon size={16} />
            <span className="status-text">{status.text}</span>
            {connectionStatus === 'connecting' && (
              <span className="connecting-dots">
                <span>.</span><span>.</span><span>.</span>
              </span>
            )}
          </div>

          {/* Theme Toggle Button */}
          <motion.button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={false}
            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
            transition={{ type: 'spring', stiffness: 200 }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={22} color="#ffc107" /> : <Moon size={22} color="#4c669f" />}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
