import React, { useState, useEffect } from "react";
import { getMyPosts, getMyDrafts } from "../services/api";
import NewsCard from "../components/NewsCard";

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostsAndDrafts = async () => {
      try {
        setLoading(true);
        const postsData = await getMyPosts();
        const draftsData = await getMyDrafts();
        setPosts(postsData);
        setDrafts(draftsData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch your posts. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostsAndDrafts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Posts</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      <h2 className="text-2xl font-semibold mb-3">Published</h2>
      {!loading && !error && posts.length === 0 ? (
        <p>You have no published posts.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-3">Drafts</h2>
      {!loading && !error && drafts.length === 0 ? (
        <p>You have no drafts.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {drafts.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostsPage;