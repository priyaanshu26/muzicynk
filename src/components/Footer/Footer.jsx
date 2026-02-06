import logo from '../../assets/logo.svg';
import './Footer.css';

const Footer = ({ version = 'v2.0.0' }) => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-left">
                    <img src={logo} alt="" className="footer-logo-img" />
                    <span className="footer-brand">Muzicynk</span>
                </div>
                <div className="footer-center">
                    <p className="footer-attribution">
                        Handcrafted with <span className="heart">❤️</span> by <span className="dev-name">Priyanshu Chaudhary</span> & <span className="ai-credit">Antigravity AI</span>
                    </p>
                </div>
                <div className="footer-right">
                    <span className="footer-version">{version}</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
