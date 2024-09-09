// src/services/api.js
import axios from 'axios';

const saveBanner = (BannerData) => axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/banner`, BannerData, {headers: {'Authorization': 'test'}});
const getPresignedUrl = (filePath) => axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/banner/presigned-put-url`, filePath, {headers: {"Content-Type": "text/plain", 'Authorization': 'test'}});
const uploadImage = (url, image) => axios.put(url, image, { headers: { 'Content-Type': image.type }});
const fetchBanners = (type) => axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/banner/type`,{params : {type : type}, headers: {'Authorization': 'test'}});
const fetchBannerImgs = (filePath) => axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/banner/presigned-put-url`, filePath,{headers: {'Authorization': 'test'}});
const updateBanner = (id, bannerData) => axios.put(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/banner/${id}`, bannerData, {headers: {'Authorization': 'test'}});


const fetchBookingList = (status) => axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/hospital/order`,{params : {status : status}, headers: {'Authorization': 'test'}});
const sendBookingNoti = (userData) => axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/notification/booking`,userData, {headers: {'Authorization': 'test'}});

export { saveBanner, getPresignedUrl, uploadImage, fetchBanners, updateBanner, fetchBannerImgs, fetchBookingList, sendBookingNoti };

  
