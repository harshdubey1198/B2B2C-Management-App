import React, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import { getBlogCategories, updateBlog } from '../apiServices/service';

function UpdateBlogModal({ isOpen, toggle, blog, onSuccess }) {
    const [title, setTitle] = useState(blog?.title || '');
    const [shortDescription, setShortDescription] = useState(blog?.short_description || '');
    const [mainDescription, setMainDescription] = useState(blog?.main_description || '');
    const [blogImage, setBlogImage] = useState(blog?.blogImage || '');
    const [status, setStatus] = useState(blog?.status || 'active');
    // const [scheduleToPublish, setScheduleToPublish] = useState(blog?.scheduleToPublish || null);
    const [blogStatus, setBlogStatus] = useState(blog?.blogStatus || 'draft');
    const [categoryId, setCategoryId] = useState(blog?.categoryId?._id || '');
    const [subcategoryId, setSubcategoryId] = useState(blog?.subcategoryId?._id || '');
    const [tags, setTags] = useState(blog?.blog_tags.join(', ') || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);

    const fetchBlogCategories = async () => {
        try {
            const response = await getBlogCategories();
            setCategories(response.data); 
        } catch (error) {
            console.log(error);
            setError('Failed to fetch categories');
        }
    };

    useEffect(() => {
        fetchBlogCategories();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBlogImage(URL.createObjectURL(file));
        }
    };

    const handleUpdate = async () => {
        setLoading(true);
        setError('');
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('short_description', shortDescription);
        formData.append('main_description', mainDescription);
        formData.append('status', status);
        // formData.append('scheduleToPublish', scheduleToPublish);
        formData.append('blogStatus', blogStatus);
        formData.append('categoryId', categoryId);
        formData.append('subcategoryId', subcategoryId);
        formData.append('blog_tags', tags.split(',').map((tag) => tag.trim()).join(','));  // Send as a comma-separated string
    
        // Check if blogImage is not a File (e.g., Blob URL) and convert it to a File
        if (blogImage && !(blogImage instanceof File)) {
            const response = await fetch(blogImage);
            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });  // You can change the name and type if necessary
            formData.append('blogImage', file); // Add the file
        } else if (blogImage instanceof File) {
            formData.append('blogImage', blogImage); // If it's already a File, just append it
        }
    
        try {
            await updateBlog(blog._id, formData);
            setLoading(false);
            toggle(); 
            onSuccess(); 
        } catch (err) {
            setLoading(false);
            setError('Failed to update the blog. Please try again.');
        }
    };
    

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Blog</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="blogTitle">Title</Label>
                        <Input
                            type="text"
                            id="blogTitle"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog title"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="blogShortDescription">Short Description</Label>
                        <Input
                            type="textarea"
                            id="blogShortDescription"
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            placeholder="Enter short description"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="blogMainDescription">Main Description</Label>
                        <Input
                            type="textarea"
                            id="blogMainDescription"
                            value={mainDescription}
                            onChange={(e) => setMainDescription(e.target.value)}
                            placeholder="Enter main description"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="blogImage">Image</Label>
                        <Input 
                            type="file" 
                            name="file" 
                            id="file" 
                            onChange={handleImageChange} 
                        />
                        {blogImage && (
                            <div className="d-flex flex-wrap justify-content-center align-items-center gap-2 mt-2 bg-info p-2">
                                <img src={blogImage} alt="preview" style={{ width: "auto", height: "200px" }} />
                            </div>
                        )}
                    </FormGroup>
                    <FormGroup>
                        <Label for="blogStatus">Status</Label>
                        <Input
                            type="select"
                            id="blogStatus"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="blogStatus">Blog Status</Label>
                        <Input
                            type="select"
                            id="blogStatus"
                            value={blogStatus}
                            onChange={(e) => setBlogStatus(e.target.value)}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="blogCategory">Category</Label>
                        <Input
                            type="select"
                            id="blogCategory"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            {categories
                            .filter((category) => !category.parentId)
                            .map((category) => (
                                <option key={category._id} value={category._id}>        
                                    {category.categoryName}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="subcategoryId">Subcategory</Label>
                        <Input
                            type="select"
                            id="subcategoryId"
                            value={subcategoryId}
                            onChange={(e) => setSubcategoryId(e.target.value)}
                        >
                            <option value="">Select Subcategory</option>
                            {categories
                            .filter((category) => category.parentId?._id === categoryId)
                            .map((subCategory) => (
                                <option key={subCategory._id} value={subCategory._id}>
                                    {subCategory.categoryName}
                                </option>
                            ))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="blogTags">Tags</Label>
                        <Input
                            type="text"
                            id="blogTags"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Enter tags (comma-separated)"
                        />
                    </FormGroup>
                    {error && <p className="text-danger">{error}</p>}
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle} disabled={loading}>
                    Cancel
                </Button>
                <Button color="primary" onClick={handleUpdate} disabled={loading}>
                    {loading ? <Spinner size="sm" /> : 'Update'}
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default UpdateBlogModal;