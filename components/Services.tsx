// Services.tsx
import React from 'react';
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
  return (
    <section id="services" className={styles.services}>
      <h2>Our Services</h2>
      <div className={styles.servicesContainer}>
        {services.map((service, index) => (
          <div className={styles.service} key={index}>
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