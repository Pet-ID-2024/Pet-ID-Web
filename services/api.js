// src/services/api.js
import axios from 'axios';

const saveBanner = (BannerData) => axios.post('http://localhost:8080/v1/banner', BannerData, {headers: {'Authorization': 'test'}});
const getPresignedUrl = (filePath) => axios.post('http://localhost:8080/v1/banner/presigned-put-url', filePath, {headers: {"Content-Type": "text/plain", 'Authorization': 'test'}});
const uploadImage = (url, image) => axios.put(url, image, { headers: { 'Content-Type': image.type }});

export { saveBanner, getPresignedUrl, uploadImage };

  