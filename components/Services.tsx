'use client'
import React, { useEffect, useRef, useState } from 'react';
import styles from '@/styles/Service.module.css'; // Import the CSS module
import Image from 'next/image';

const services = [
  { 
    title: 'Full Grooming', 
    subtitle: 'This is Your Service Subtitle',
    image: '/images/service_dog1.webp' // Update with the correct path to your image
  },
  { 
    title: 'Wash & Blow Dry', 
    subtitle: 'This is Your Service Subtitle',
    image: '/images/service_dog2.webp' // Update with the correct path to your image
  },
  { 
    title: 'Self Serve Dog Wash', 
    subtitle: 'This is Your Service Subtitle',
    image: '/images/service_dog3.webp' // Update with the correct path to your image
  },
  { 
    title: 'Nail Clipping', 
    subtitle: 'This is Your Service Subtitle',
    image: '/images/service_dog4.webp' // Update with the correct path to your image
  },
];

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(()=>{
    const observerOption = {
      threshold : 0.5
    }

    const handleIntersection = (entries : IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          setInView(true);
          observer.disconnect();
        }
      })
    };

    const observer = new IntersectionObserver(handleIntersection, observerOption);

    if(containerRef.current){
      observer.observe(containerRef.current);
    }

    return () =>{
      if (observer && containerRef.current){
        observer.unobserve(containerRef.current);
      }
    };
  },[])
  return (
    <section id="services" className={styles.services} ref={containerRef}>
      <h2>Our Services</h2>
      <div className={styles.servicesContainer}>
        {services.map((service, index) => (
          <div className={`${styles.service} ${inView ? styles[`flyIn${index % 4}`] : ''}`} key={index}>
            <Image src={service.image} alt={service.title} className={styles.serviceImage}
            width = {400}
            height= {300}/>
            <h3>{service.title}</h3>
            <p>{service.subtitle}</p>
          </div>
        ))}
      </div>
      <button className={styles.bookNow}>Book Now</button>
    </section>
  );
};

export default Services;