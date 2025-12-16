import React, { useState, useEffect } from 'react';
import { fetchSavedPosts } from '../services/api';
import NewsCard from '../components/NewsCard';

const SavedPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAndSetSavedPosts = async () => {
      try {
        const posts = await fetchSavedPosts(); // This calls the imported fetchSavedPosts
        setSavedPosts(posts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getAndSetSavedPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home-page">
      <h1>Saved Posts</h1>
      <div className="news-grid">
        {savedPosts.length > 0 ? (
          savedPosts.map((post) => <NewsCard key={post._id} post={post} initialIsSaved={true} />)
        ) : (
          <p>You have no saved posts.</p>
        )}
      </div>
    </div>
  );
};

export default SavedPage;
