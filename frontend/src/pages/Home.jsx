import { useEffect, useState } from "react";
import { fetchPosts } from "../services/api";
import NewsCard from "../components/NewsCard";
import FilterBar from "../components/FilterBar";

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All"
  const [showDescription, setShowDescription] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await fetchPosts();
        setAllPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    getPosts();
  }, []);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredPosts(allPosts);
    } else {
      const filtered = allPosts.filter((post) => post.category === category);
      setFilteredPosts(filtered);
    }
  };

  const handleCardClick = (post) => {
    setSelectedPost(post);
    setShowDescription(true);
  };

  const handleBackClick = () => {
    setShowDescription(false);
    setSelectedPost(null);
  };

  const homePageStyle = {
    padding: '20px',
    background: '#f9f9f9',
  };

  const newsGridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  };

  const descriptionViewStyle = {
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    padding: '20px',
    margin: '20px auto',
    maxWidth: '800px',
  };

  const backButtonStyle = {
    backgroundColor: '#8B0000',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
  };

  return (
    <div style={homePageStyle}>
      <FilterBar onFilter={handleFilter} selectedCategory={selectedCategory} />
      {showDescription && selectedPost ? (
        <div style={descriptionViewStyle}>
          <button onClick={handleBackClick} style={backButtonStyle}>Back to News</button>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.description}</p>
          <p><strong>Source:</strong> {selectedPost.source}</p>
        </div>
      ) : (
        <div style={newsGridStyle}>
          {filteredPosts.map((p) => (
            <NewsCard key={p._id} post={p} onClick={() => handleCardClick(p)} />
          ))}
        </div>
      )}
    </div>
  );
}
