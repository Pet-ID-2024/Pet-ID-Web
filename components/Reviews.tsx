// Reviews.tsx
import React from 'react';
import styles from '@/styles/Reviews.module.css'; // Import the CSS module

const reviews = [
  { 
    text: 'I\'m a testimonial. Click to edit me and add text that says something nice about you and your services.',
    author: 'John Doe'
  },
  { 
    text: 'I\'m a testimonial. Click to edit me and add text that says something nice about you and your services.',
    author: 'Jane Doe'
  },
  { 
    text: 'I\'m a testimonial. Click to edit me and add text that says something nice about you and your services.',
    author: 'Jim Doe'
  },
];

const Reviews: React.FC = () => {
  return (
    <section className={styles.reviews}>
      <h2>Reviews</h2>
      <div className={styles.reviewsContainer}>
        {reviews.map((review, index) => (
          <div className={styles.review} key={index}>
            <blockquote>
              {review.text}
            </blockquote>
            <p>- {review.author}</p>
          </div>
        ))}
      </div>
      <div className={styles.richText} style={{ visibility: 'inherit' }}>
          <p className={`${styles.font8} ${styles.richTextText}`} style={{ textAlign: 'center', lineHeight: '3.75em', fontSize: '18px' }}>
              <span className={styles.richTextText} style={{ fontWeight: 'bold' }}>
                Follow Us @Wendys_salon
              </span>
          </p>
        </div>
    </section>
  );
};

export default Reviews;
