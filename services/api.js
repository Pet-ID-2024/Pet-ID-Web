import api from './axiosInterceptor';

export const getToken = () => api.get('/auth/test/token',{params : {memberId : 12}});

const saveBanner = (BannerData) => api.post('/v1/banner', BannerData);
const getPresignedUrl = (filePath) => api.post('/v1/banner/presigned-put-url', filePath, {headers: {"Content-Type": "text/plain"}});
const uploadImage = (url, image) => api.put(url, image, { headers: { 'Content-Type': image.type }});
const fetchBanners = (type) => api.get('/v1/banner/type',{params : {type : type},});
const fetchBannerImgs = (filePath) => api.get('/v1/banner/presigned-put-url', filePath,);
const updateBanner = (id, bannerData) => api.put(`/v1/banner/${id}`, bannerData, );


const fetchBookingList = (status) => api.get('/v1/manage/hospital/order',{params : {status : status}});
const sendBookingNoti = (userData) => api.post('/v1/notification/booking',userData);

const fetchContentList = (category) => api.get('/v1/content',{params : {category : category}});
export const getContentPresignedUrl = (filePath) => api.post('/v1/content/presigned-put-url', filePath);
export const fetchContentImgs = (filePath) => api.get('/v1/content/presigned-get-url', {
    params: { filePath },     
  });
export const updateContent = (contentData) => api.put(`/v1/content/${contentData.contentId}`, contentData, );
export const createContent = (contentData) => api.post('/v1/content', contentData);
export const deleteContent = (contentId) => api.delete(`/v1/content${contentId}`);


export { saveBanner, getPresignedUrl, uploadImage, fetchBanners, updateBanner, fetchBannerImgs, fetchBookingList, sendBookingNoti , fetchContentList};

  
