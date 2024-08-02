// src/services/api.js
import axios from 'axios';

const saveBanner = (BannerData) => axios.post('http://localhost:8091/v1/banner', BannerData, {headers: {'Authorization': 'test'}});
const getPresignedUrl = (filePath) => axios.post('http://localhost:8091/v1/banner/presigned-put-url', {filePath}, {headers: {'Authorization': 'test'}});
const uploadImage = (url, formData) => axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' , 'Authorization': 'test'}});

export { saveBanner, getPresignedUrl, uploadImage };

  