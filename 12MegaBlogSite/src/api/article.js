import axios from "axios";
import config from "../config/conf"

// create axios instance
const api = axios.create({
  baseURL: config.baseUrl,
});

// attach token automatically
api.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = "Bearer " + token;
  }
  return req;
});

// create post
export const createPost = (data) =>{
    return api.post("/articles",data)
}

// update post
export const updatePost = (id,data)=>{
   return api.put(`/articles/${id}`,data)
}

// delete post
export const deletePost = (id) => {
  return api.delete(`/articles/${id}`);
};

// get single post 
export const getPost = (id) => {
  return api.get(`/articles/${id}`);
};

// get all post
export const getPosts = (status = "active") => {
  return api.get(`/articles?status=${status}`);
};

// file upload

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// delete file
export const deleteFile = (fileId) => {
  return api.delete(`/files/${fileId}`);
};

// file preview
export const getFilePreview = (fileId) => {
  return `${config.baseUrl}/files/${fileId}`;
};