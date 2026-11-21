import { useEffect, useState } from "react";
import { Link } from "react-router";

import BlogCard from "../components/BlogCard";
import heroImage from "../assets/hero.png";

const API_URL = "http://localhost:3000/api/posts";

function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createMessage, setCreateMessage] = useState("");
  const [createError, setCreateError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "Lalit Kumar"
  });

  const mapPostToBlog = (post) => ({
    id: post.id,
    title: post.title,
    content: [post.content],
    excerpt: post.content,
    category: "Technology",
    author: post.author || "Anonymous",
    date: post.createdAt,
    readTime: "3 min read",
    image: heroImage,
    tags: ["React", "API"],
    featured: post.id === 1
  });

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load blog posts.");
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to load blog posts.");
      }

      const formattedPosts = result.data.map(mapPostToBlog);

      setPosts(formattedPosts);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    setCreateMessage("");
    setCreateError("");

    if (!formData.title.trim() || !formData.content.trim()) {
      setCreateError("Title and content are required.");
      return;
    }

    try {
      setCreateLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          content: formData.content.trim(),
          author: formData.author.trim() || "Anonymous"
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to create post.");
      }

      setCreateMessage("Post created successfully.");

      setFormData({
        title: "",
        content: "",
        author: "Lalit Kumar"
      });

      setShowCreateForm(false);

      await loadPosts();
    } catch (err) {
      setCreateError(err.message || "Something went wrong.");
    } finally {
      setCreateLoading(false);
    }
  };

  const categories = [
    "All",
    ...new Set(posts.map((blog) => blog.category))
  ];

  const filteredPosts = posts.filter((blog) => {
    const searchTerm = search.toLowerCase().trim();

    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm) ||
      blog.excerpt.toLowerCase().includes(searchTerm) ||
      blog.category.toLowerCase().includes(searchTerm) ||
      blog.author.toLowerCase().includes(searchTerm);

    const matchesCategory =
      category === "All" || category === blog.category;

    return matchesSearch && matchesCategory;
  });

  const featuredPost = posts.find((blog) => blog.featured);

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">THE BRIEFLY JOURNAL</span>

          <h1>
            Ideas worth
            <span> reading.</span>
          </h1>

          <p>
            Thoughtful stories on technology, design, products, and the
            people building the digital world.
          </p>

          <button
            type="button"
            className="create-post-button"
            onClick={() => {
              setShowCreateForm((prev) => !prev);
              setCreateMessage("");
              setCreateError("");
            }}
          >
            {showCreateForm ? "Close Form" : "+ Create New Post"}
          </button>
        </div>
      </section>

      {createMessage && (
        <div className="success-message">
          ✓ {createMessage}
        </div>
      )}

      {showCreateForm && (
        <section className="create-post-section">
          <div className="create-post-card">
            <div className="section-heading">
              <div>
                <span className="section-label">NEW ARTICLE</span>
                <h2>Create a post</h2>
              </div>
            </div>

            {createError && (
              <div className="form-error">
                {createError}
              </div>
            )}

            <form onSubmit={handleCreatePost}>
              <div className="form-group">
                <label htmlFor="title">Title</label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter post title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Author</label>

                <input
                  id="author"
                  name="author"
                  type="text"
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Content</label>

                <textarea
                  id="content"
                  name="content"
                  rows="7"
                  placeholder="Write your article..."
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-post-button"
                disabled={createLoading}
              >
                {createLoading ? "Publishing..." : "Publish Post"}
              </button>
            </form>
          </div>
        </section>
      )}

      {loading && (
        <div className="state-message">
          <div className="loader"></div>
          <p>Loading stories...</p>
        </div>
      )}

      {!loading && error && (
        <div className="state-message error-state">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {featuredPost && (
            <section className="featured-section">
              <div className="section-heading">
                <div>
                  <span className="section-label">FEATURED STORY</span>
                  <h2>Editor's pick</h2>
                </div>
              </div>

              <article className="featured-card">
                <div className="featured-image-wrap">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="featured-image"
                  />
                </div>

                <div className="featured-content">
                  <div className="blog-meta">
                    <span className="category-badge">
                      {featuredPost.category}
                    </span>

                    <span>{featuredPost.readTime}</span>
                  </div>

                  <h2>{featuredPost.title}</h2>

                  <p>{featuredPost.excerpt}</p>

                  <div className="featured-footer">
                    <div className="blog-author">
                      <span className="author-avatar">
                        {featuredPost.author.charAt(0)}
                      </span>

                      <div>
                        <strong>{featuredPost.author}</strong>
                        <span>{featuredPost.date}</span>
                      </div>
                    </div>

                    <Link
                      to={`/blog/${featuredPost.id}`}
                      className="read-link"
                    >
                      Read story →
                    </Link>
                  </div>
                </div>
              </article>
            </section>
          )}

          <section className="blog-section">
            <div className="section-heading">
              <div>
                <span className="section-label">LATEST STORIES</span>
                <h2>Explore the journal</h2>
              </div>

              <span className="post-count">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "story" : "stories"}
              </span>
            </div>

            <div className="controls">
              <div className="search-box">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search stories..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="category-list">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={
                      category === item
                        ? "category-filter active"
                        : "category-filter"
                    }
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="blog-grid">
                {filteredPosts.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <span>⌕</span>
                <h3>No stories found</h3>
                <p>Try a different search term or category.</p>
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default Home;