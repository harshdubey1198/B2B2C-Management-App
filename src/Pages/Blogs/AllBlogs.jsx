import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { deleteBlog, getBlogs } from '../../apiServices/service';
import UpdateBlogModal from '../../Modal/UpdateBlogModal';

function AllBlogs() {
    const [blogs, setBlogs] = useState([]);  // Ensure it's always an array
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchBlogs = async () => {
        try {
            const response = await getBlogs();
            setBlogs(response.data || []); // Safeguard by defaulting to empty array
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleEditClick = (blog) => {
        setSelectedBlog(blog);
        toggleModal();
    };
    const handleDeleteBlog = async (blog) => {
        setSelectedBlog(blog);
        try {
            const response = await deleteBlog(blog._id);
            if (response) {
                fetchBlogs();
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="Blogs" breadcrumbItem="All Blogs" />

                <div className="table-responsive">
                    {loading ? (
                        <p>Loading blogs...</p>
                    ) : blogs.length === 0 ? (
                        <p>No blogs available</p>
                    ) : (
                        <table className="table table-centered table-nowrap mb-0">
                            <thead className="thead-light">
                                <tr>
                                    <th style={{ width: '208px' }}>Blog Title</th>
                                    <th>Author</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    {/* <th style={{ width: '208px' }}>Tags</th> */}
                                    <th>Blog Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map((blog) => {
                                    const createdAt = new Date(blog.createdAt);
                                    const date = createdAt.toLocaleDateString('en-IN', {
                                        timeZone: 'Asia/Kolkata',
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    });
                                    const time = createdAt.toLocaleTimeString('en-IN', {
                                        timeZone: 'Asia/Kolkata',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    });

                                    return (
                                        <tr key={blog._id}>
                                            <td
                                                style={{
                                                    maxWidth: '208px',
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                    WebkitLineClamp: 4,
                                                    whiteSpace: 'normal',
                                                }}
                                            >
                                                {blog.title}
                                            </td>
                                            <td>
                                                {blog.author.firstName} {blog.author.lastName}
                                            </td>
                                            <td>
                                                {date}
                                                <br />
                                                {time}
                                            </td>
                                            <td>{blog.status}</td>
                                            {/* <td  style={{
                                                    maxWidth: '208px',
                                                    // textWrap: 'wrap',
                                                    display: '-webkit-box',
                                                    WebkitBoxOrient: 'vertical',
                                                    overflow: 'hidden',
                                                }}>{blog.blog_tags.join(', ')}</td> */}
                                            <td>{blog.blogStatus}</td>
                                            <td>
                                                <i className='bx bx-trash' style={{ cursor: 'pointer', fontSize:'26px'}} onClick={() => handleDeleteBlog(blog)}></i>
                                                 <i className='bx bx-edit' style={{ cursor: 'pointer' , fontSize:'26px'}} onClick={() => handleEditClick(blog)}></i> </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {selectedBlog && (
                <UpdateBlogModal
                    isOpen={isModalOpen}
                    toggle={toggleModal}
                    blog={selectedBlog}
                    onSuccess={fetchBlogs} 
                />
            )}
        </React.Fragment>
    );
}

export default AllBlogs;
