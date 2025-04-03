import React, { useEffect, useState } from 'react'; 
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { createBlog, getBlogCategories } from '../../apiServices/service';

function CreateBlog() {
  const authuser = JSON.parse(localStorage.getItem('authUser')) || {};
  const author = authuser.response._id;
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [mainDescription, setMainDescription] = useState('');
  const [blogImage, setBlogImage] = useState(null);
  const [categoryId, setCategoryId] = useState('');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [tags, setTags] = useState([]); 

  const fetchBlogCategories = async () => {
    try {
      const response = await getBlogCategories();
      setCategories(response.data || []); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogCategories();
  }, []);

  useEffect(() => {
    if (categoryId) {
      const selectedCategory = categories.find((category) => category._id === categoryId);
      if (selectedCategory) {
        const filteredSubCategories = categories.filter(
          (category) => category.parentId && category.parentId._id === selectedCategory._id
        );
        setSubCategories(filteredSubCategories);
      }
    } else {
      setSubCategories([]);
    }
  }, [categoryId, categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'blog_tags') {
      setTags(value.split(',').map(tag => tag.trim())); 
    } else if (name === 'categoryId') {
      setCategoryId(value); 
    } else if (name === 'subcategoryId') {
      setSubcategoryId(value); 
    } else {
      if (name === 'title') setTitle(value);
      if (name === 'short_description') setShortDescription(value);
      if (name === 'main_description') setMainDescription(value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first selected file
    if (file && file.type.startsWith("image/")) {
      setBlogImage(file); // Store file object in state
  
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result); // Create a preview
      reader.readAsDataURL(file);
    } else {
      console.error("Please select a valid image file.");
      setBlogImage(null); // Reset if invalid
    }
  };
  console.log(blogImage);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!blogImage) {
      console.error("Blog image is required.");
      return; // Prevent submission without an image
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("short_description", shortDescription);
    formData.append("main_description", mainDescription);
    formData.append("categoryId", categoryId);
    formData.append("subcategoryId", subcategoryId);
    formData.append("blog_tags", JSON.stringify(tags));
    formData.append("author", author);
    formData.append("blogImage", blogImage); // Ensure file is appended
  
    try {
      const response = await createBlog(formData);
      console.log("Blog created successfully:", response);
      // Optionally, reset the form or show a success message

      setTitle('');
      setShortDescription('');
      setMainDescription('');
      setCategoryId('');
      setSubcategoryId('');
      setTags([]);
      setBlogImage(null);
      setImagePreview(null);
      



    } catch (error) {
      console.error("Error creating blog:", error);
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
                    value={title}
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
                    value={shortDescription}
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
                    value={mainDescription}
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
                    value={categoryId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories
                      .filter((category) => !category.parentId)
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
                    value={subcategoryId}
                    onChange={handleInputChange}
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
                    value={tags.join(', ')}
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
                    // value={blogImage}
                    onChange={handleFileChange}
                  />
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Blog Preview" style={{ maxWidth: "100%", height: "auto" }} />
                    </div>
                  )}
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
