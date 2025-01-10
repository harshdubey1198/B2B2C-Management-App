import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { createBlog, getBlogCategories } from '../../apiServices/service';

function CreateBlog() {
  const authuser = JSON.parse(localStorage.getItem('authUser')) || {};
  const author = authuser.response._id;
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    main_description: '',
    categoryId: '',
    subcategoryId: '',
    blogImage: null,
    blog_tags: [],
    author: author,
  });

  const fetchBlogCategories = async () => {
    try {
      const response = await getBlogCategories();
      setCategories(response.data); // Store all categories, both parent and subcategories
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogCategories();
  }, []);

  useEffect(() => {
    // Filter and set subcategories when categoryId changes
    if (formData.categoryId) {
      const selectedCategory = categories.find(
        (category) => category._id === formData.categoryId
      );
      if (selectedCategory) {
        const filteredSubCategories = categories.filter(
          (category) => category.parentId && category.parentId._id === selectedCategory._id
        );
        setSubCategories(filteredSubCategories);
      }
    }
  }, [formData.categoryId, categories]); // Trigger when categoryId or categories change

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'blog_tags') {
      setFormData({
        ...formData,
        [name]: value.split(',').map(tag => tag.trim()),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      blogImage: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('short_description', formData.short_description);
    dataToSend.append('main_description', formData.main_description);
    dataToSend.append('categoryId', formData.categoryId);
    dataToSend.append('subcategoryId', formData.subcategoryId);
    dataToSend.append('blog_tags', JSON.stringify(formData.blog_tags)); 
    dataToSend.append('author', formData.author);
    dataToSend.append('blogImage', formData.blogImage);

    try {
      const response = await createBlog(dataToSend);
      console.log('Blog created successfully:', response);
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Blogs" breadcrumbItem="Create Blog" />
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="title">Blog Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter blog title"
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="short_description">Short Description</Label>
                  <Input
                    type="text"
                    name="short_description"
                    id="short_description"
                    value={formData.short_description}
                    onChange={handleInputChange}
                    placeholder="Enter short description"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="main_description">Main Description</Label>
                  <Input
                    type="textarea"
                    name="main_description"
                    id="main_description"
                    value={formData.main_description}
                    onChange={handleInputChange}
                    placeholder="Enter main description"
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="categoryId">Category</Label>
                  <Input
                    type="select"
                    name="categoryId"
                    id="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories
                      .filter((category) => !category.parentId) // Only show parent categories
                      .map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="subcategoryId">Subcategory</Label>
                  <Input
                    type="select"
                    name="subcategoryId"
                    id="subcategoryId"
                    value={formData.subcategoryId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {subCategories.map((subCategory) => (
                      <option key={subCategory._id} value={subCategory._id}>
                        {subCategory.categoryName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="blog_tags">Tags (comma separated)</Label>
                  <Input
                    type="text"
                    name="blog_tags"
                    id="blog_tags"
                    value={formData.blog_tags.join(', ')}
                    onChange={handleInputChange}
                    placeholder="Enter tags (comma-separated)"
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col sm={12} md={6}>
                <FormGroup>
                  <Label for="blogImage">Blog Image</Label>
                  <Input
                    type="file"
                    name="blogImage"
                    id="blogImage"
                    onChange={handleFileChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button color="primary" type="submit">
              Create Blog
            </Button>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default CreateBlog;
