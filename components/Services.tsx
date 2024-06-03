// Services.tsx
import React from 'react';

const services = [
  { title: 'Full Grooming', subtitle: 'This is Your Service Subtitle' },
  { title: 'Wash & Blow Dry', subtitle: 'This is Your Service Subtitle' },
  { title: 'Self Serve Dog Wash', subtitle: 'This is Your Service Subtitle' },
  { title: 'Nail Clipping', subtitle: 'This is Your Service Subtitle' },
];

const Services: React.FC = () => {
  return (
    <section id="services">
      <h2>Our Services</h2>
      {services.map((service, index) => (
        <div className="service" key={index}>
          <h3>{service.title}</h3>
          <p>{service.subtitle}</p>
        </div>
      ))}
    </section>
  );
};

export default Services;
