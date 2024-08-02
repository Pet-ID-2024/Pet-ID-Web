import React from 'react';
import Image from 'next/image';
import styles from '@/styles/Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.hero}>
      <Image
        src="/images/hero_dog.webp"
        alt="Dog"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className={styles.overlay}>
        <h1>Pet ID</h1>
        <p>쉽고 빠르게
           우리 강아지
           등록하기</p>
        <a href="#contact" className={styles.button}>자세히 보기</a>
      </div>
    </section>
  );
};

export default Hero;