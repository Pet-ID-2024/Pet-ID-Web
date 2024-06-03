import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <Image
        src="/hero_dog.webp"
        alt="Dog"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className={styles.overlay}>
        <h1>Wendy's Dog Salon</h1>
        <p>A loving, professional dog care in San Francisco</p>
        <a href="#contact" className={styles.button}>Book Now</a>
      </div>
    </section>
  );
};

export default Hero;