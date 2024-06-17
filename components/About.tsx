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
          src="/images/wendy.webp" // Update with the correct path to your image
          alt="Wendy"
          width={448}
          height={480}
          className={`${styles.image} `}
        />
      </div>
      <div 
      className={`${styles.textContainer} ${isInView ? styles.slideInRight : styles.slideOutRight}`}>
        <h2>Hi, I’m Wendy</h2>
        <p>
          I’m a paragraph. Click here to add your own text and edit me. It’s easy. Just click “Edit Text” or double click me to add your own content and make changes to the font. Feel free to drag and drop me anywhere you like on your page. I’m a great place for you to tell a story and let your users know a little more about you.
        </p>
        <p>
          This is a great space to write a long text about your company and your services. You can use this space to go into a little more detail about your company.
        </p>
      </div>
    </section>
  );
};

export default About;