import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();
  return (
    <header>
      <div className="logo">2AB Digital Solutions</div>
      <nav className="nav">
        <Link to="/" style={{fontWeight: pathname==='/'?'bold':'normal'}}>Accueil</Link>
        <Link to="/clients" style={{fontWeight: pathname==='/clients'?'bold':'normal'}}>Clients</Link>
        <Link to="/services" style={{fontWeight: pathname==='/services'?'bold':'normal'}}>Services</Link>
        <Link to="/contact" style={{fontWeight: pathname==='/contact'?'bold':'normal'}}>Contact</Link>
        <a href="https://wa.me/221771234567" className="whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </nav>
    </header>
  );
}
