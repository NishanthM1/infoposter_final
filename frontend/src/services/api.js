import axios from "axios";

export const API = axios.create({ baseURL: "http://localhost:5000/api" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers['x-auth-token'] = localStorage.getItem('token');
  }
  return req;
});

export const fetchPosts = () => API.get("/posts/", { params: { isDraft: false } });
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost, isFormData = false, isDraft = false) => {
  if (isFormData) {
    return API.post("/posts", newPost, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: {
        isDraft: isDraft,
      },
    });
  } else {
    return API.post("/posts", newPost, {
      params: {
        isDraft: isDraft,
      },
    });
  }
};
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);
export const getMyPosts = async () => {
  try {
    const res = await API.get("/posts/myposts");
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const fetchSavedPosts = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return []; // Return empty array if no token
    }
    const res = await API.get('/posts/saved/posts', {
      headers: {
        'x-auth-token': token,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching saved posts:", err);
    throw err.response.data;
  }
};

export const getMyDrafts = async () => {
  try {
    const res = await API.get("/posts/mydrafts");
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const fetchUsers = async () => {
  try {
    const res = await API.get("/auth/users");
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};
