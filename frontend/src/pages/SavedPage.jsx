import React, { useState, useEffect } from 'react';
import { API } from '../services/api';
import NewsCard from '../components/NewsCard';

const SavedPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await API.get('/posts/saved/posts', {
          headers: {
            'x-auth-token': token,
          },
        });
        setSavedPosts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <h1>Saved Posts</h1>
      <div className="news-grid">
        {savedPosts.length > 0 ? (
          savedPosts.map((post) => <NewsCard key={post._id} post={post} />)
        ) : (
          <p>You have no saved posts.</p>
        )}
      </div>
    </div>
  );
};

export default SavedPage;
