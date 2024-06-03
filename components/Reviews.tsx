// Reviews.tsx
import React from 'react';

const reviews = [
  { text: '“I\'m a testimonial. Click to edit me and add text that says something nice about you and your services.”', author: 'Shiney’s Owner' },
  { text: '“I\'m a testimonial. Click to edit me and add text that says something nice about you and your services.”', author: 'Jacko’s Owner' },
  { text: '“I\'m a testimonial. Click to edit me and add text that says something nice about you and your services.”', author: 'Leon’s Owner' },
];

const Reviews: React.FC = () => {
  return (
    <section id="reviews">
      <h2>My Happy Clients</h2>
      <p>Follow Us @Wendys_salon</p>
      {reviews.map((review, index) => (
        <div className="testimonial" key={index}>
          <p>{review.text}</p>
          <p>— {review.author}</p>
        </div>
      ))}
    </section>
  );
};

export default Reviews;
