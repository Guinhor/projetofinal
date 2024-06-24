import React from 'react';
import '../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importa o componente FontAwesomeIcon
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn, 
  faYoutube, 
  faTiktok 
} from '@fortawesome/free-brands-svg-icons'; // Importa ícones de redes sociais

const Footer = () => {
  // Função para lidar com o clique nos ícones
  const handleIconClick = (url) => {
    window.open(url, "_blank"); // Abre o link em uma nova aba
  };

  return (
    <div className="footer">
      <p>&copy; 2024 Nathan & Yago. Todos os direitos reservados.</p>
      <div className="social-icons">
        {/* Ícone do Facebook */}
        <a href="#" onClick={() => handleIconClick("https://www.facebook.com")}>
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        {/* Ícone do Twitter */}
        <a href="#" onClick={() => handleIconClick("https://www.twitter.com")}>
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        {/* Ícone do Instagram */}
        <a href="#" onClick={() => handleIconClick("https://www.instagram.com")}>
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        {/* Ícone do LinkedIn */}
        <a href="#" onClick={() => handleIconClick("https://www.linkedin.com")}>
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
        {/* Ícone do YouTube */}
        <a href="#" onClick={() => handleIconClick("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}>
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        {/* Ícone do TikTok */}
        <a href="#" onClick={() => handleIconClick("https://www.tiktok.com")}>
          <FontAwesomeIcon icon={faTiktok} />
        </a>
      </div>
    </div>
  );
};

export default Footer; 
