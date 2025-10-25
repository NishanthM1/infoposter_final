import axios from "axios";

export const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const fetchPosts = () => API.get("/posts");
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost, isFormData = false) => {
  if (isFormData) {
    return API.post("/posts", newPost, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    return API.post("/posts", newPost);
  }
};
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);
export const fetchMyPosts = () => API.get('/posts/myposts');
export const fetchMyDrafts = () => API.get('/posts/mydrafts');

export const getMyPosts = async () => {
  try {
    const res = await api.get("/posts/myposts");
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getMyDrafts = async () => {
  try {
    const res = await api.get("/posts/mydrafts");
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};
