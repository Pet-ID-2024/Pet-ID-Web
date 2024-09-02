// src/services/api.js
import axios from 'axios';

const saveBanner = (BannerData) => axios.post('http://43.203.1.26:8080/v1/banner', BannerData, {headers: {'Authorization': 'test'}});
const getPresignedUrl = (filePath) => axios.post('http://43.203.1.26:8080/v1/banner/presigned-put-url', filePath, {headers: {"Content-Type": "text/plain", 'Authorization': 'test'}});
const uploadImage = (url, image) => axios.put(url, image, { headers: { 'Content-Type': image.type }});
const fetchBanners = (type) => axios.get('http://43.203.1.26:8080/v1/banner/type',{params : {type : type}, headers: {'Authorization': 'test'}});
const fetchBannerImgs = (filePath) => axios.get('http://43.203.1.26:8080/v1/banner/presigned-put-url', filePath,{headers: {'Authorization': 'test'}});
const updateBanner = (id, bannerData) => axios.put(`http://43.203.1.26:8080/v1/banner/${id}`, bannerData, {headers: {'Authorization': 'test'}});


const fetchBookingList = (status) => axios.get('http://localhost:8080/v1/hospital/order',{params : {status : status}, headers: {'Authorization': 'test'}});

export { saveBanner, getPresignedUrl, uploadImage, fetchBanners, updateBanner, fetchBannerImgs, fetchBookingList };

  
