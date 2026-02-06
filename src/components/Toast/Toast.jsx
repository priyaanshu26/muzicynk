import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import './Toast.css';

const Toast = ({
    id,
    message,
    type = 'info', // info, success, error, warning
    duration = 4000,
    onClose
}) => {
    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                onClose?.(id);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [id, duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success': return CheckCircle;
            case 'error': return AlertCircle;
            case 'warning': return AlertCircle;
            default: return Info;
        }
    };

    const Icon = getIcon();

    return (
        <motion.div
            className={`toast toast-${type}`}
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            role="alert"
        >
            <Icon size={20} className="toast-icon" />
            <span className="toast-message">{message}</span>
            <button
                className="toast-close"
                onClick={() => onClose?.(id)}
                aria-label="Close notification"
            >
                <X size={16} />
            </button>

            {/* Progress bar */}
            {duration > 0 && (
                <motion.div
                    className="toast-progress"
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: duration / 1000, ease: 'linear' }}
                />
            )}
        </motion.div>
    );
};

// Toast Container Component
export const ToastContainer = ({ toasts, onClose }) => {
    return (
        <div className="toast-container" aria-live="polite">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        {...toast}
                        onClose={onClose}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Toast;
