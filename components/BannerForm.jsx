'use client'

// src/components/BannerForm.jsx
import React, { useState } from 'react';
import { saveBanner, getPresignedUrl, uploadImage } from '@/services/api';
import styles from '@/styles/BannerForm.module.css';

const BannerForm = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [type, setType] = useState('content');
  const [status, setStatus] = useState('active');

  const handleTextChange = (e) => setText(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const bannerData = {
          "imageUrl" : "bannerImage/"+image.name,
          "text" : text,
          "type" : type,
          "status" : status,
      }
      const textResponse = await saveBanner(bannerData);
      if (!textResponse.data) throw new Error('Failed to save text.');
      
      const presignedUrlResponse = await getPresignedUrl("bannerImage/"+image.name);
      const url = presignedUrlResponse.data;
      if (!url ) throw new Error('Failed to get presigned URL.');

      const formData = new FormData();
      for (const [key, value] of Object.entries(fields)) {
        formData.append(key, value);
      }
      formData.append('file', image);

      const uploadResponse = await uploadImage(url, formData);
      if (uploadResponse.status !== 204) throw new Error('Failed to upload image.');

      alert('Banner saved successfully!');
    } catch (err) {
      setError(err.message);
      console.error('Transaction failed:', err);
    }
  };

  return (
    <div className={styles.bannerForm}>
    <h1>Save Banner</h1>
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>
          Text:
          <input type="text" value={text} onChange={handleTextChange} required />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Type:
          <select value={type} onChange={handleTypeChange} required>
            <option value="content">Content</option>
            <option value="main">Main</option>
          </select>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Status:
          <select value={status} onChange={handleStatusChange} required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Image:
          <input type="file" onChange={handleImageChange} accept="image/*" required />
        </label>
      </div>
      <button type="submit" className={styles.button}>Save</button>
    </form>
    {error && <p className={styles.error}>Error: {error}</p>}
  </div>
  );
};

export default BannerForm;
