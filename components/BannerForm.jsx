'use client'

import React, { useState, useEffect } from 'react';
import { saveBanner, getPresignedUrl, uploadImage, fetchBanners, updateBanner, fetchBannerImgs } from '@/services/api';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Typography, Paper, Grid, Pagination } from '@mui/material';
import styles from '@/styles/BannerForm.module.css';

const BannerForm = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [type, setType] = useState('content');
  const [status, setStatus] = useState('active');
  const [banners, setBanners] = useState([]);
  const [bannersImgs, setBannersImgs] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [bannerImg, setBannerImg] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchBanners("");
        setBanners(response.data);
      } catch (err) {
        setError('Failed to fetch banners.');
        console.error('Error fetching banners:', err);
      }
    };

    fetchData();
  }, []);

  const getBannerImg = async (filePath) => {
    e.preventDefault();
    const response = await fetchBannerImgs(filePath);
    setBannerImg(response);

  }
  const handleTextChange = (e) => setText(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handlePageChange = (event, value) => setCurrentPage(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const bannerData = {
        imageUrl: image ? `bannerImage/${image.name}` : '',
        text,
        type,
        status,
      };

      if (isEditing) {
        // Update existing banner
        await updateBanner(editId, bannerData);
        alert('Banner updated successfully!');
      } else {
        // Create new banner
        const textResponse = await saveBanner(bannerData);
        if (!textResponse.data) throw new Error('Failed to save text.');
        
        if (image) {
          const filePath = `bannerImage/${image.name}`;
          const encodedFilePath = encodeURIComponent(filePath);
          const presignedUrlResponse = await getPresignedUrl(encodedFilePath);
          const url = presignedUrlResponse.data;
          if (!url) throw new Error('Failed to get presigned URL.');

          const uploadResponse = await uploadImage(url, image);
          if (uploadResponse.status !== 200) throw new Error('Failed to upload image.');
        }

        alert('Banner saved successfully!');
      }

      setText('');
      setType('content');
      setStatus('active');
      setImage(null);
      setIsEditing(false);
      setEditId(null);

      const response = await fetchBanners();
      setBanners(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Transaction failed:', err);
    }
  };

  const handleEdit = (banner) => {
    setText(banner.text);
    setType(banner.type);
    setStatus(banner.status);
    setIsEditing(true);
    setEditId(banner.id);
  };

  const indexOfLastBanner = currentPage * itemsPerPage;
  const indexOfFirstBanner = indexOfLastBanner - itemsPerPage;
  const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);

  return (
    <div className={styles.bannerForm}>
    <Typography variant="h4" gutterBottom>{isEditing ? 'Edit Banner' : 'Save Banner'}</Typography>
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <TextField label="Text" value={text} onChange={handleTextChange} required />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={handleTypeChange} required>
          <MenuItem value="content">Content</MenuItem>
          <MenuItem value="main">Main</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={handleStatusChange} required>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel shrink>Image</InputLabel>
        <input type="file" onChange={handleImageChange} accept="image/*" />
      </FormControl>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {isEditing ? 'Update' : 'Save'}
      </Button>
    </form>
    {error && <Typography color="error">Error: {error}</Typography>}
    <Typography variant="h5" gutterBottom>Banner List</Typography>
    <Grid container spacing={2}>
      {currentBanners.map((banner) => (
        <Grid item xs={12} key={banner.id}>
          <Paper className={styles.bannerItem} elevation={3}>
            <div className={styles.bannerText}>
              <Typography variant="body1">Text: {banner.text}</Typography>
              <Typography variant="body2">Type: {banner.type}</Typography>
              <Typography variant="body2">Status: {banner.status}</Typography>
            </div>
            <Button variant="outlined" color="primary" onClick={() => handleEdit(banner)}>Edit</Button>
          </Paper>
        </Grid>
      ))}
    </Grid>
    <Pagination
      count={Math.ceil(banners.length / itemsPerPage)}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
      className={styles.pagination}
    />
  </div>
  );
};

export default BannerForm;