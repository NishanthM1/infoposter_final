import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { createPost, fetchMyPosts, fetchMyDrafts } from '../services/api';
import NewsCard from '../components/NewsCard';

export default function CreatePost() {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    source: "",
    category: "",
  });
  const [myPosts, setMyPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [myDrafts, setMyDrafts] = useState([]);
  const [loadingDrafts, setLoadingDrafts] = useState(true);
  const navigate = useNavigate();

  const getMyPosts = async () => {
    try {
      const res = await fetchMyPosts();
      setMyPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPosts(false);
    }
  };

  const getMyDrafts = async () => {
    try {
      const res = await fetchMyDrafts();
      setMyDrafts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDrafts(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getMyPosts();
      getMyDrafts();
    }
  }, []); // Empty dependency array means it runs once on mount

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFileName('');
      setImagePreview(null);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    for (const key in formData) {
      postData.append(key, formData[key]);
    }

    const fileInput = document.getElementById('upload-image');
    if (fileInput.files[0]) {
      postData.append('image', fileInput.files[0]);
    }

    try {
      if (fileInput.files[0]) {
        await createPost(postData, true); // Pass true for isFormData
      } else {
        await createPost(formData);
      }
      alert("Post Created Successfully!");
      // After successful post creation, re-fetch posts and drafts
      getMyPosts();
      getMyDrafts();
      // Optionally, clear the form or navigate
      setFormData({
        title: "",
        description: "",
        source: "",
        category: "",
      });
      setImagePreview(null);
      setSelectedFileName('');
      // navigate("/"); // Removed navigation to stay on the page and see updated lists
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="create-post-page">
      <div className="create-post-container">
        <div className="create-post-main-content">
          <div className="create-post-left-section">
            <div className="image-preview-section">
              {imagePreview ? (
                <img src={imagePreview} alt="Image Preview" className="image-preview" />
              ) : (
                <div className="image-placeholder">Image Preview</div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="create-post-form">
              <div className="create-post-form-fields">
                <input name="title" placeholder="Add title" onChange={handleChange} required type="text" />
                <textarea name="description" placeholder="Add description" onChange={handleChange} required />
                <input name="source" placeholder="Add source/credits" onChange={handleChange} type="text" />
                <select name="category" onChange={handleChange} required>
                  <option value="">Choose Category</option>
                  <option value="Top">Top</option>
                  <option value="Global">Global</option>
                  <option value="India">India</option>
                  <option value="Market">Market</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
                <div className="create-post-form-actions">
                  <button type="button" className="button-draft">Save as Draft</button>
                  <button type="submit" className="button-post">Post</button>
                </div>
              </div>
            </form>
          </div>

          <div className="create-post-right-section">
            <div className="image-upload-section">
              <input
                type="text"
                placeholder="file_name.jpg"
                value={selectedFileName}
                readOnly
                className="file-name-input"
              />
              <label htmlFor="upload-image" className="add-file-button">
                add file
                <input
                  id="upload-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div className="divider">
              <span>or generate poster image</span>
            </div>
            <div className="generate-image-section">
              <input type="text" placeholder="add prompt" className="prompt-input" />
              <button className="generate-button">generate</button>
            </div>
            <div className="generated-images-container">
              <div className="generated-image-card">
                <div className="generated-image-preview">generated Image Preview</div>
                <button className="add-to-post-button">add to post</button>
              </div>
              <div className="generated-image-card">
                <div className="generated-image-preview">generated Image Preview</div>
                <button className="add-to-post-button">add to post</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-posts-area">
        <h2>My Posts</h2>
        {loadingPosts ? (
          <div>Loading posts...</div>
        ) : (
          <div className="news-grid">
            {myPosts.length > 0 ? (
              myPosts.map((post) => <NewsCard key={post._id} post={post} />)
            ) : (
              <p>You have not created any posts yet.</p>
            )}
          </div>
        )}
      </div>

      <div className="my-drafts-area">
        <h2>My Drafts</h2>
        {loadingDrafts ? (
          <div>Loading drafts...</div>
        ) : (
          <div className="news-grid">
            {myDrafts.length > 0 ? (
              myDrafts.map((draft) => <NewsCard key={draft._id} post={draft} />)
            ) : (
              <p>You have no saved drafts yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
