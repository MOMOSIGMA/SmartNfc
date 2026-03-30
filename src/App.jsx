
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Clients from './pages/Clients';
import ClientPage from './pages/ClientPage';
import Header from './components/Header';

function AppContent() {
  const location = useLocation();
  const isClientPage = location.pathname.startsWith('/p/');

  return (
    <>
      {!isClientPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/p/:slug" element={<ClientPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
