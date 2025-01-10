import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/header';

function BlogDetailPage() {
  const { blog_slug } = useParams();

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

  const blog = BlogsData.find((b) => b.blog_slug === blog_slug);

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
            <h1 className='text-center'>{blog.title}</h1>
           
            <img
              src={blog.image}
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
            <div  className="d-flex gap-2 align-items-start mt-3 flex-wrap flex-column flex-lg-row " >
                <p className="mb-1 d-flex gap-2">
                    <strong>Author:</strong> {blog.author} <span className='d-none d-lg-block'>|</span>
                </p>
                <p className="mb-1 d-flex gap-2">
                    <strong>Date:</strong> {blog.date} <span className='d-none d-lg-block'>|</span>
                </p>
                <p className="mb-1 d-flex gap-2">
                    <strong>Type:</strong> {blog.blogType}
                </p>
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
            {BlogsData.sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 5)
              .map((latestBlog, index) => (
                <div
                  key={index}
                  className="latest-post d-flex gap-3 mt-3"
                  style={{
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    paddingBottom: '10px',
                  }}
                >
                  <img
                    src={latestBlog.image}
                    alt={latestBlog.title}
                    style={{
                      width: '80px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                    }}
                  />
                  <div
                    className="d-flex flex-column"
                    style={{ width: 'calc(100% - 80px)' }}
                  >
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
                      {latestBlog.date}
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

export default BlogDetailPage;
