import React, { useState, useEffect } from 'react';
import { API, deletePost } from '../services/api';

export default function NewsCard({ post, onClick, onDelete, initialIsSaved }) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);

  useEffect(() => {
    setIsSaved(initialIsSaved);
  }, [initialIsSaved, post._id]);

  const handleSave = async (e) => {
    e.stopPropagation(); // Prevent card click event
    const token = localStorage.getItem('token');
    if (!token) {
      // Handle not logged in case
      alert('Please log in to save posts.');
      return;
    }

    try {
      if (isSaved) {
        await API.delete(`/posts/${post._id}/save`, {
          headers: { 'x-auth-token': token },
        });
        setIsSaved(false);
      } else {
        await API.put(`/posts/${post._id}/save`, {}, {
          headers: { 'x-auth-token': token },
        });
        setIsSaved(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    width: '400px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
    overflow: 'hidden',
    border: '1px solid #e0e0e0',
  };

  const imageStyle = {
    width: '100%',
    height: '220px',
    objectFit: 'cover',
  };

  const contentStyle = {
    padding: '1rem',
  };

  const titleStyle = {
    fontSize: '1.2rem',
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
    color: '#333',
  };

  const summaryStyle = {
    fontSize: '0.9rem',
    color: '#666',
    lineHeight: '1.4',
  };

  const actionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginTop: '1rem',
  };

  const iconStyle = {
    fontSize: '1.2rem',
    color: '#8B0000',
    cursor: 'pointer',
  };

  const imageUrl = post.imageUrl ? `http://localhost:5000${post.imageUrl}` : null;

  return (
    <div style={cardStyle} onClick={onClick}>
      {imageUrl && <img src={imageUrl} alt={post.title} style={imageStyle} />}
      <div style={contentStyle}>
        <h2 style={titleStyle}>{post.title}</h2>
        <p style={summaryStyle}>{post.summary}</p>
        <div style={actionsStyle}>
          <span style={iconStyle} onClick={handleSave}>{isSaved ? '❤️' : '🔖'}</span>
          {onDelete && (
            <span style={iconStyle} onClick={async (e) => {
              e.stopPropagation();
              try {
                await deletePost(post._id);
                onDelete(); // Call the onDelete prop to refresh the list
              } catch (error) {
                console.error("Failed to delete post:", error);
                alert("Failed to delete post. Please try again.");
              }
            }}>🗑️</span>
          )}
        </div>
      </div>
    </div>
  );
}
