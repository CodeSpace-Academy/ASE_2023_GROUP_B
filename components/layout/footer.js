// Footer.js
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; 2023 Rando Sando Recipe App. All rights reserved. </p> 
        <p>  Privacy Policy | Terms of Service</p>
      </div>
    </footer>
  );
};

export default Footer;
