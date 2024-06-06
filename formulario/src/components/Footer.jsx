import React from 'react';
import '../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const handleIconClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="footer">
      <p>&copy; 2024 Yago. Todos os direitos reservados.</p>
      <div className="social-icons">
        <a href="#" onClick={() => handleIconClick("https://www.facebook.com")}>
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href="#" onClick={() => handleIconClick("https://www.twitter.com")}>
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#" onClick={() => handleIconClick("https://www.instagram.com")}>
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="#" onClick={() => handleIconClick("https://www.linkedin.com")}>
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
        <a href="#" onClick={() => handleIconClick("https://www.youtube.com/watch?v=dQw4w9WgXcQ")}>
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a href="#" onClick={() => handleIconClick("https://www.tiktok.com")}>
          <FontAwesomeIcon icon={faTiktok} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
