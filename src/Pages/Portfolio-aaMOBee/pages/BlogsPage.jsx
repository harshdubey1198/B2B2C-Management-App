import React from 'react';
import Header from '../components/header';
import '../assets/styles.css';
import { useNavigate } from 'react-router-dom';

function BlogsPage() {
  const navigate = useNavigate();

  const BlogsData = [
    {
      title: 'Best Blog Intro',
      short_description: 'Short description of Blog 1',
      main_description: 'This is the main description of Blog 1',
      blog_slug: 'best-blog-intro',
      blogType: 'Technology',
      author: 'Author 1',
      date: '2022-01-01',
      blog_tags: ['Tech', 'Innovation', 'Coding'],
      image: 'https://via.placeholder.com/150',
    },
    {
      title: 'Blog 2',
      blog_slug: 'blog-2',
      short_description: 'Short description of Blog 2',
      main_description: 'This is the main description of Blog 2',
      blogType: 'Lifestyle',
      author: 'Author 2',
      date: '2022-02-01',
      blog_tags: ['Health', 'Fitness', 'Wellness'],
      image: 'https://via.placeholder.com/150',
    },
    ...Array(5).fill({
      title: 'Sample Blog',
      blog_slug: 'sample-blog',
      short_description: 'This is a sample blog description.',
      main_description: 'Main description of the blog.',
      blogType: 'General',
      author: 'Sample Author',
      date: '2022-03-01',
      blog_tags: ['Sample', 'Demo', 'Placeholder'],
      image: 'https://via.placeholder.com/150',
    }),
  ];

  return (
    <div>
      <Header />
      <div
        className="blogs-page"
        style={{
          marginTop: '80px',
          paddingTop: '40px',
          background: '#0d4251',
        }}
      >
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ marginBottom: '20px' }}
        >
          <h1
            style={{ textAlign: 'center', marginBottom: '20px' }}
            className="text-white"
          >
            Our Latest Blogs
          </h1>
          <div className="d-flex flex-row text-white align-items-center justify-content-center">
            <button
              className="btn btn-primary d-flex align-items-center justify-content-center"
              style={{ marginRight: '20px' }}
              onClick={() => navigate('/')}
            >
              <i
                className="bx bx-left-arrow-alt align-items-center"
                style={{ fontSize: '22px' }}
              ></i>
              <span>
                <b>Home</b>
              </span>
            </button>
            -- Our Blogs
          </div>
        </div>
        <div
          className="blogs-container d-flex flex-column flex-lg-row justify-content-center p-3 bg-white"
          style={{
            ...(window.innerWidth > 576 && { borderTopRightRadius: '240px' }),
            paddingTop: '30px',
            overflow: 'hidden',
            marginTop: '80px',
          }}
        >
          <div
            className="blogs-data d-flex flex-wrap justify-content-center p-4 gap-3 bg-white"
            style={{ flex: 1 }}
          >
            {BlogsData.map((blog, index) => (
              <div
                key={index}
                className="blog-card"
                onClick={() => navigate(`/blogs/${blog.blog_slug}`)}
                style={{
                  flex: '1 1 calc(100% - 20px)',
                  maxWidth: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '0px 0 10px 0',
                  background: '#fff',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                  }}
                />
                <div style={{ padding: '10px' }}>
                  <h2 style={{ margin: '10px 0', fontSize: '18px' }}>
                    {blog.title}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    {blog.short_description}
                  </p>
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#aaa',
                      marginBottom: '10px',
                    }}
                  >
                    Author: {blog.author} | Date: {blog.date}
                  </p>
                  <div
                    style={{
                      marginTop: 'auto',
                      display: 'flex',
                      gap: '10px',
                      flexWrap: 'wrap',
                    }}
                  >
                    {blog.blog_tags.map((tag, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '12px',
                          color: '#007bff',
                          background: '#e7f3ff',
                          padding: '5px 10px',
                          borderRadius: '12px',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className="sidebar"
            style={{
              flex: '1 1 100%',
              padding: '24px',
              background: '#fff',
              maxWidth: '100%',
              marginTop: '24px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3>Search</h3>
            <div style={{ position: 'relative', width: '100%' }}>
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
            <h3 className="mt-3">Latest Posts</h3>
            {BlogsData.sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 5)
              .map((blog, index) => (
                <div
                  key={index}
                  className="d-flex flex-row gap-3 mt-3"
                  style={{
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '10px',
                  }}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{
                      width: '80px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                  <div
                    className="d-flex flex-column gap-2 py-2"
                    style={{ width: 'calc(100% - 80px)' }}
                  >
                    <h4 style={{ margin: '0', fontSize: '14px' }}>
                      {blog.title}
                    </h4>
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#aaa',
                        marginBottom: '0',
                      }}
                    >
                      {blog.date}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogsPage;
