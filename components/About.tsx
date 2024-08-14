// AboutMe.tsx
"use client"
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/AboutUs.module.css'; // Import the CSS module

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [isInView, setIsInView] = useState(false);
  

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const containerVisibility = (Math.min(containerRect.bottom, windowHeight) - Math.max(containerRect.top, 0)) / containerRect.height;

      if (containerVisibility > 0.5) {
        setTimeout(() => {
          setIsInView(true);
        }, 100);
      } else {
        setTimeout(() => {
          setIsInView(false);
        }, 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className={styles.container}>
      <div 
          className={`${styles.imageContainer} ${isInView ? styles.slideInLeft : styles.slideOutLeft}`}>
        <Image
          src="/images/petIdMain.webp" // Update with the correct path to your image
          alt="PetID"
          width={448}
          height={480}
          className={`${styles.image} `}
        />
      </div>
      <div 
      className={`${styles.textContainer} ${isInView ? styles.slideInRight : styles.slideOutRight}`}>
        <h2>A NOTE ON ITALIAN FASCISMO</h2>
        <p>
        It is necessary to act, to move, to fight and, if necessary, to die. Neutrals have never dominated events. They have always gone under. It is blood which moves the wheels of history!
        </p>
        <p>
        EITHER WAR OR THE END OF ITALY’S NAME AS A GREAT POWER.
        </p>
      </div>
    </section>
  );
};

export default About;