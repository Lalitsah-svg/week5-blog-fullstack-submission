import { Link } from "react-router";

function BlogCard({ blog }) {
  return (
    <article className="blog-card">
      <Link to={`/blog/${blog.id}`} className="blog-image-link">
        <img src={blog.image} alt={blog.title} className="blog-image" />
      </Link>

      <div className="blog-card-content">
        <div className="blog-meta">
          <span className="category-badge">{blog.category}</span>
          <span>{blog.readTime}</span>
        </div>

        <Link to={`/blog/${blog.id}`} className="blog-title-link">
          <h3>{blog.title}</h3>
        </Link>

        <p>{blog.excerpt}</p>

        <div className="blog-author">
          <span className="author-avatar">
            {blog.author.charAt(0)}
          </span>

          <div>
            <strong>{blog.author}</strong>
            <span>{blog.date}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;