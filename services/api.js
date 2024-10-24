import api from './axiosInterceptor';

export const getToken = () => api.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/auth/test/token`,{params : {memberId : 12}});

const saveBanner = (BannerData) => api.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/banner`, BannerData);
const getPresignedUrl = (filePath) => api.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/banner/presigned-put-url`, filePath, {headers: {"Content-Type": "text/plain"}});
const uploadImage = (url, image) => api.put(url, image, { headers: { 'Content-Type': image.type }});
const fetchBanners = (type) => api.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/banner/type`,{params : {type : type},});
const fetchBannerImgs = (filePath) => api.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/banner/presigned-put-url`, filePath,);
const updateBanner = (id, bannerData) => api.put(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/banner/${id}`, bannerData, );


const fetchBookingList = (status) => api.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/manage/hospital/order`,{params : {status : status}});
const sendBookingNoti = (userData) => api.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/notification/booking`,userData);

const fetchContentList = (category) => api.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/content`,{params : {category : category}});
export const getContentPresignedUrl = (filePath) => api.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/content/presigned-put-url`, filePath);
export const fetchContentImgs = (filePath) => api.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/v1/content/presigned-get-url`, {
    params: { filePath },     
  });

export { saveBanner, getPresignedUrl, uploadImage, fetchBanners, updateBanner, fetchBannerImgs, fetchBookingList, sendBookingNoti , fetchContentList};

  
