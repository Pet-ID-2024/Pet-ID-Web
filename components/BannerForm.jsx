'use client'

import React, { useState, useEffect } from 'react';
import { saveBanner, getPresignedUrl, uploadImage, fetchBanners, updateBanner, fetchBannerImgs, deleteBanner } from '@/services/api';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Typography, Paper, Grid, Pagination } from '@mui/material';
import styles from '@/styles/BannerForm.module.css';

const BannerForm = () => {
  const [text, setText] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [contentImage, setContentImage] = useState(null);
  const [error, setError] = useState(null);
  const [type, setType] = useState('content');
  const [status, setStatus] = useState('active');
  const [banners, setBanners] = useState([]);
  const [contentId, setContentId] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [bannerImg, setBannerImg] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetchBanners("ALL");
      setBanners(response.data);
    } catch (err) {
      setError('Failed to fetch banners.');
      console.error('Error fetching banners:', err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [updateTrigger]);

  const getBannerImg = async (filePath) => {    
    if(!filePath || filePath === '') return;
    const response = await fetchBannerImgs(filePath);
    setBannerImg(response);
  }
  const handleTextChange = (e) => setText(e.target.value);
  const handleContentIdChange = (e) => setContentId(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  const handleImageChange = (e) => setNewImage(e.target.files[0]);
  const handlePageChange = (event, value) => setCurrentPage(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const bannerData = {
        imageUrl: newImage ? `bannerImage/${newImage.name}` : contentImage,
        text,
        type,
        status,
        contentId
      };

      if (newImage) {
        const filePath = `bannerImage/${newImage.name}`;
        const encodedFilePath = encodeURIComponent(filePath);
        const presignedUrlResponse = await getPresignedUrl(encodedFilePath);
        const url = presignedUrlResponse.data;
        if (!url) throw new Error('Failed to get presigned URL.');

        const uploadResponse = await uploadImage(url, newImage);
        if (uploadResponse.status !== 200) throw new Error('Failed to upload image.');
      }
      
      if (isEditing) {
        // Update existing banner
        try{  
        await updateBanner(editId, bannerData);
      } catch(error){
        error.response.status === 404 && alert("입력하신 컨텐츠ID에 해당하는 컨텐츠가 없습니다.");       
        return; 
      }
        alert('Banner updated successfully!');
      } else {
        // Create new banner
        const textResponse = await saveBanner(bannerData);
        if (!textResponse.data) throw new Error('Failed to save text.');
        alert('Banner saved successfully!');
      }

      setText('');
      setType('content');
      setStatus('active');
      setContentId('');
      setNewImage(null);
      setIsEditing(false);
      setEditId(null);

      setUpdateTrigger(!updateTrigger);      
    } catch (err) {
      setError(err.message);
      console.error('Transaction failed:', err);
    }
  };

  const cancelEdit =()=> {
    setIsEditing(false);
    setText('');
    setType('content');
    setStatus('inactive');
    setContentId('');
    setEditId('');
  }
  const handleEdit = async(banner) => {
    setText(banner.text);
    setType(banner.type);
    setStatus(banner.status);
    setContentId(banner.contentId);
    setIsEditing(true);
    setEditId(banner.id);
    setContentImage(banner.imageUrl)
    await getBannerImg(banner.imageUrl);
  };

  const handleDelete = async(bannerId) => {
    try{
      await deleteBanner(bannerId);
    }catch(error){
      setError(err.message);
      console.error('Transaction failed:', err);
      return;
    }
    setUpdateTrigger(!updateTrigger);
    setIsEditing(false);
    setText('');
    setType('content');
    setStatus('inactive');
    setContentId('');
    setEditId('');

  };
  
  const indexOfLastBanner = currentPage * itemsPerPage;
  const indexOfFirstBanner = indexOfLastBanner - itemsPerPage;
  const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);

  return (
    <div className={styles.bannerForm}>
    <Typography variant="h4" gutterBottom>{isEditing ? 'Edit Banner' : 'Manage Banner'}</Typography>
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <TextField label="Text" value={text} onChange={handleTextChange} required />
      </FormControl>
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={handleTypeChange} >
          <MenuItem value="content">Content</MenuItem>
          <MenuItem value="main">Main</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={handleStatusChange} >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField label="Content ID" value={contentId || ""}  onChange={handleContentIdChange}  />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel shrink>Image</InputLabel>
        <input type="file" onChange={handleImageChange} accept="image/*" />
      </FormControl>
      <Button type="submit" variant="contained" color="primary" sx={{width:'45%'}}>
        {isEditing ? 'Update' : 'Save'}
      </Button>
      <Button type="button" onClick={cancelEdit} variant="contained" color="error"  sx={{width:'45%', marginLeft : '5em'}}>
        Cancel Edit
      </Button>
    </form>
    {error && <Typography color="error">Error: {error}</Typography>}    
    <Grid container spacing={2} className='mt-2'>
      {currentBanners.map((banner) => (
        <Grid item xs={12} key={banner.id}>
          <Paper className={styles.bannerItem} elevation={3}>
            <div className={styles.bannerText}>
              <Typography variant="body1">Text: {banner.text}</Typography>
              <Typography variant="body2">Type: {banner.type}</Typography>
              <Typography variant="body2">Status: {banner.status}</Typography>
              <Typography variant="body2">Content Id: {banner.contentId}</Typography>
            </div>
            <Button variant="outlined" color="primary" onClick={() => handleEdit(banner)}>Edit</Button>
            <Button variant="outlined" color="error" onClick={() => handleDelete(banner.id)}>delete</Button>
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