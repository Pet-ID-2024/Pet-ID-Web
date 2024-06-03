// Header.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faYelp } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import styles from '@/styles/Header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src="/logo.png" alt="Wendy's Dog Salon" width={50} height={50} />
        <h1>Wendy's Dog Salon</h1>
      </div>
      <div className={styles.search}>
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        <input type="text" placeholder="Search..." />
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#book">Book Online</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#social"><FontAwesomeIcon icon={faFacebook} className={styles.icon}/></a></li>
          <li><a href="#social"><FontAwesomeIcon icon={faInstagram} className={styles.icon}/></a></li>
          <li><a href="#social"><FontAwesomeIcon icon={faYelp} className={styles.icon}/></a></li>
          <li><a href="#login"><FontAwesomeIcon icon={faUser} className={styles.icon}/> Log In</a></li>
          <li><a href="#contact" className={styles.button}>Book Now</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
