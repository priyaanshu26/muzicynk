import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import HostPage from './pages/HostPage/HostPage';
import ClientPage from './pages/ClientPage/ClientPage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/host" element={<HostPage />} />
        <Route path="/client" element={<ClientPage />} />
      </Routes>
    </Router>
  );
}

export default App;
