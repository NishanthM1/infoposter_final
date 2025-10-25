import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/api";

export default function CreatePostForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    source: "",
    category: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = new FormData();
    for (const key in formData) {
      postData.append(key, formData[key]);
    }
    // Image file is now handled in CreatePost.jsx, so no need to append here

    try {
      await createPost(postData);
      alert("Post Created Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    width: '100%',
  };

  const uploadSectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  const uploadBoxStyle = {
    border: '2px dashed #ccc',
    borderRadius: '8px',
    padding: '40px 20px',
    textAlign: 'center',
    color: '#888',
    fontSize: '1.1rem',
    backgroundColor: '#fdfdfd',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  };

  const formActionsStyle = {
    display: 'flex',
    gap: '15px',
    marginTop: '10px',
  };

  const buttonStyle = {
    padding: '12px 25px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  };

  return (
    <form onSubmit={handleSubmit} style={containerStyle}>
      <div style={uploadSectionStyle}>
        {/* Removed image input as it's now in CreatePost.jsx */}
        <input name="title" placeholder="Add title" onChange={handleChange} required style={inputStyle} />
        <textarea name="description" placeholder="Add description" onChange={handleChange} required style={inputStyle} />
        <input name="source" placeholder="Add source/credits" onChange={handleChange} style={inputStyle} />
        <select name="category" onChange={handleChange} required style={inputStyle}>
          <option value="">Choose Category</option>
          <option value="Top">Top</option>
          <option value="Global">Global</option>
          <option value="India">India</option>
          <option value="Market">Market</option>
          <option value="Karnataka">Karnataka</option>
        </select>
        <div style={formActionsStyle}>
          <button type="button" style={{...buttonStyle, backgroundColor: '#e0e0e0', color: '#333'}}>Save as Draft</button>
          <button type="submit" style={{...buttonStyle, backgroundColor: '#8B0000', color: 'white'}}>Post</button>
        </div>
      </div>
    </form>
  );
}
