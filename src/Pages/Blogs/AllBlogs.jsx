import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/Common/Breadcrumb'
import { getBlogs } from '../../apiServices/service'

function AllBlogs() {

    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchBlogs = async () => {
        try {
            const response = await getBlogs()
            setBlogs(response.data)
            // console.log(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])
  
    return (
        <React.Fragment>
            <div className='page-content'>
                <Breadcrumbs title='Blogs' breadcrumbItem='All Blogs' />

                <div className='table-responsive'>
                    <table className='table table-centered table-nowrap mb-0'>
                        <thead className='thead-light'>
                            <tr>
                                <th>Blog Title</th>
                                <th>Short Description</th>
                                <th>Main Description</th>
                                {/* <th>Blog Type</th> */}
                                <th>Author</th>
                                <th>Date</th>
                                <th>Tags</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                           
                                { blogs.map((blog) => (
                                    <tr key={blog._id}>
                                        <td>{blog.title}</td>
                                        <td>{blog.short_description}</td>
                                        <td>{blog.main_description}</td> 
                                        {/* <td>{blog.blogType}</td> */}
                                        <td>{blog.author.firstName}</td>
                                        <td>{new Date(blog.createdAt).toLocaleDateString("en-IN", {
                                            timeZone: "Asia/Kolkata",
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                            })}
                                        </td>
                                        <td>{blog.blog_tags.join(', ')}</td>
                                        <td>
                                            <img src={blog.image} alt='blog' className='avatar-sm' />
                                        </td>
                                    </tr>
                                ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AllBlogs
