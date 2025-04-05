import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/header';
import { getBlogBySlug, getBlogs } from '../../../apiServices/service';

function BlogDetailPage() {
  const { blog_slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const data = await getBlogBySlug(blog_slug);
        console.log(data.data);
        setBlog(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        setBlogs(response.data); 
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
    fetchBlogDetails();
  }, [blog_slug]);



  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <Header />
      <div
        className="blog-detail-container d-flex flex-column align-items-center"
        style={{
          padding: '20px',
          marginTop: '80px',
          backgroundColor: '#0d4251',
          minHeight: 'calc(100vh - 80px)',
        }}
      >
        <div
          className="d-flex flex-column flex-md-row blog-content-container"
          style={{
            backgroundColor: '#fff',
            borderRadius: '10px',
            overflow: 'hidden',
            width: '100%',
            maxWidth: '1200px',
          }}
        >
          {/* Blog Content */}
          <div className="p-4 pb-2" style={{ flex: 2 }}>
            <h1 className="text-center">{blog.title}</h1>

            <img
              src={blog.blogImage}
              alt={blog.title}
              style={{
                width: '100%',
                maxHeight: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginTop: '20px',
              }}
            />
            <p style={{ marginTop: '20px' }}>{blog.short_description}</p>
            <p style={{ marginTop: '20px' }}>{blog.main_description}</p>
            <div className="d-flex gap-2 align-items-start mt-3 flex-wrap flex-column flex-lg-row">
              <p className="mb-1 d-flex gap-2">
                <strong>Author:</strong> {blog.author.firstName + " " + blog.author.lastName} <span className="d-none d-lg-block">|</span>
              </p>
              <p className="mb-1 d-flex gap-2">
                <strong>Date:</strong> {new Date(blog.createdAt).toLocaleString("en-IN", {
                                timeZone: "Asia/Kolkata",
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                // hour: "2-digit",
                                // minute: "2-digit",
                                // hour12: true,
                              })} <span className="d-none d-lg-block">|</span>
              </p>
              {/* <p className="mb-1 d-flex gap-2">
                <strong>Type:</strong> {blog.blogType}
              </p> */}
            </div>

            <div style={{ marginTop: '10px' }}>
              <strong>Tags:</strong>
              {blog.blog_tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    margin: '0 5px',
                    padding: '5px 10px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '5px',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div
            className="sidebar p-4 pb-2"
            style={{
              flex: 1,
              backgroundColor: '#f8f9fa',
              borderLeft: '1px solid #ccc',
            }}
          >
            <h3>Search</h3>
            <div className="search-box" style={{ position: 'relative', width: '100%' }}>
              <i
                className="bx bx-search"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '20px',
                  color: '#aaa',
                }}
              ></i>
              <input
                type="text"
                placeholder="Search..."
                style={{
                  width: '100%',
                  padding: '8px 36px 8px 8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                }}
              />
            </div>

            <h3 className="mt-4">Latest Posts</h3>
            {blogs && blogs.length > 0
          ? blogs
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 5)
              .map((latestBlog, index) => (
                <div
                  key={index}
                  className="latest-post d-flex gap-3 mt-3"
                  style={{
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '10px',
                    // backgroundColor: 'red',
                  }}
                  onClick={() => navigate(`/blogs/${latestBlog.blog_slug}`)}
                >
                  <img
                    src={latestBlog.blogImage}
                    alt={latestBlog.title}
                    style={{
                      width: '80px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                  <div className="d-flex flex-column" style={{ width: 'calc(100% - 80px)' }}>
                    <h4
                      style={{
                        margin: '0',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#333',
                      }}
                    >
                      {latestBlog.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '0',
                      }}
                    >
                      {new Date(latestBlog.createdAt).toLocaleString("en-IN", {
                                timeZone: "Asia/Kolkata",
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                // hour: "2-digit",
                                // minute: "2-digit",
                                // hour12: true,
                              })}
                    </p>
                  </div>
                </div>
              ))
          : <p>No blogs available</p>
          }
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailPage;
