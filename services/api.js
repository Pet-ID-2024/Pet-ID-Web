import axios from 'axios';
import api from './axiosInterceptor';

const saveBanner = (BannerData) => api.post('/v1/banner', BannerData);
const getPresignedUrl = (filePath) => api.post('/v1/banner/presigned-put-url', filePath, {headers: {"Content-Type": "text/plain"}});
const uploadImage = (url, image) => axios.put(url, image, { headers: { 'Content-Type': image.type }});
const fetchBanners = (type) => api.get('/v1/banner/type',{params : {type : type},});
const fetchBannerImgs = (filePath) => api.get('/v1/banner/presigned-get-url', {params : {filePath}},);
const updateBanner = (id, bannerData) => api.put(`/v1/banner/${id}`, bannerData, );
const deleteBanner = (id) => api.delete(`/v1/banner/${id}`);


const fetchBookingList = (status) => api.get('/v1/manage/hospital/order',{params : {status : status}});
const sendBookingNoti = (userData) => api.post('/v1/notification/booking',userData);


const fetchContentList = (category) => api.get('/v1/content',{params : {isFullBody : true, category : category}});
export const getContentPresignedUrl = (filePath) => api.post('/v1/content/presigned-put-url', filePath);
export const fetchContentImgs = (filePath) => api.get('/v1/content/presigned-get-url', {
    params: { filePath },     
  });
export const updateContent = (contentId, contentData) => api.put(`/v1/content/${contentId}`, contentData );
export const createContent = (contentData) => api.post('/v1/content', contentData);
export const deleteContent = (contentId) => api.delete(`/v1/content/${contentId}`);
export const sendContentNoti = (fcm) => api.post('/v1/notification/content',fcm);


export { saveBanner, getPresignedUrl, uploadImage, fetchBanners, updateBanner, fetchBannerImgs, fetchBookingList, sendBookingNoti , fetchContentList, deleteBanner};

  
