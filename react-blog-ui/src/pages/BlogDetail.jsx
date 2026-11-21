import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

import heroImage from "../assets/hero.png";

const API_URL = "http://localhost:3000/api/posts";

function BlogDetail() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const [editMessage, setEditMessage] = useState("");

  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    author: ""
  });

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || "Post not found");
        }

        setPost(result.data);

        setEditForm({
          title: result.data.title,
          content: result.data.content,
          author: result.data.author || ""
        });
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    setEditError("");
    setEditMessage("");

    if (!editForm.title.trim() || !editForm.content.trim()) {
      setEditError("Title and content are required.");
      return;
    }

    try {
      setEditLoading(true);

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: editForm.title.trim(),
          content: editForm.content.trim(),
          author: editForm.author.trim() || "Anonymous"
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update post.");
      }

      setPost(result.data);

      setEditForm({
        title: result.data.title,
        content: result.data.content,
        author: result.data.author || ""
      });

      setEditMessage("Post updated successfully.");
      setIsEditing(false);
    } catch (err) {
      setEditError(err.message || "Something went wrong.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeletePost = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(true);
      setDeleteError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete post.");
      }

      window.location.href = "/";
    } catch (err) {
      setDeleteError(err.message || "Something went wrong.");
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="page-shell">
        <section className="loading-state">
          <div className="loading-spinner"></div>
          <h2>Loading article...</h2>
          <p>Fetching the latest post from the API.</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-shell">
        <section className="error-state">
          <span className="category-badge">Error</span>
          <h2>Unable to load article</h2>
          <p>{error}</p>

          <Link to="/" className="back-link">
            ← Back to Home
          </Link>
        </section>
      </main>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <main className="page-shell">
      <article className="blog-detail">
        <Link to="/" className="back-link">
          ← Back to all articles
        </Link>

        {editMessage && (
          <div className="success-message">
            ✓ {editMessage}
          </div>
        )}

        {deleteError && (
          <div className="form-error">
            {deleteError}
          </div>
        )}

        {isEditing ? (
          <section className="create-post-card edit-post-card">
            <div className="section-heading">
              <div>
                <span className="section-label">EDIT ARTICLE</span>
                <h2>Edit post</h2>
              </div>
            </div>

            {editError && (
              <div className="form-error">
                {editError}
              </div>
            )}

            <form onSubmit={handleUpdatePost}>
              <div className="form-group">
                <label htmlFor="edit-title">Title</label>

                <input
                  id="edit-title"
                  name="title"
                  type="text"
                  value={editForm.title}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-author">Author</label>

                <input
                  id="edit-author"
                  name="author"
                  type="text"
                  value={editForm.author}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="edit-content">Content</label>

                <textarea
                  id="edit-content"
                  name="content"
                  rows="8"
                  value={editForm.content}
                  onChange={handleEditChange}
                  required
                ></textarea>
              </div>

              <div className="post-actions">
                <button
                  type="submit"
                  className="edit-btn"
                  disabled={editLoading}
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => {
                    setIsEditing(false);
                    setEditError("");
                  }}
                  disabled={editLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        ) : (
          <>
            <header className="blog-detail-header">
              <div className="article-category">
                <span className="category-badge">
                  Technology
                </span>
              </div>

              <h1>{post.title}</h1>

              <p className="blog-detail-excerpt">
                {post.content}
              </p>

              <div className="blog-meta">
                <div className="author-info">
                  <div className="author-avatar">
                    {(post.author || "A")
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <strong>
                      {post.author || "Anonymous"}
                    </strong>

                    <span>Author</span>
                  </div>
                </div>

                <div className="article-info">
                  <span>{post.createdAt}</span>
                  <span>•</span>
                  <span>3 min read</span>
                </div>
              </div>
            </header>

            <div className="blog-detail-image">
              <img
                src={heroImage}
                alt={post.title}
              />
            </div>

            <div className="blog-detail-content">
              <p>{post.content}</p>

              <p>
                This article is part of the technology section
                of the blog. It demonstrates how content can be
                loaded dynamically from a REST API and displayed
                through a React frontend.
              </p>

              <h2>Key Takeaways</h2>

              <ul>
                <li>
                  Content is loaded dynamically from the backend API.
                </li>

                <li>
                  React communicates with the Express REST API.
                </li>

                <li>
                  Each article has its own unique ID and detail page.
                </li>
              </ul>
            </div>

            <div className="post-tags">
              <span>Technology</span>
              <span>React</span>
              <span>REST API</span>
            </div>

            <div className="post-actions">
              <button
                type="button"
                className="edit-btn"
                onClick={() => {
                  setEditError("");
                  setEditMessage("");
                  setIsEditing(true);
                }}
              >
                Edit Post
              </button>

              <button
                type="button"
                className="delete-btn"
                onClick={handleDeletePost}
                disabled={deleteLoading}
              >
                {deleteLoading ? "Deleting..." : "Delete Post"}
              </button>
            </div>
          </>
        )}

        <div className="article-footer">
          <Link to="/" className="back-link">
            ← Read more articles
          </Link>
        </div>
      </article>
    </main>
  );
}

export default BlogDetail;