const Blog = require('../schemas/blog.schema');
const slugify = require('slugify');
const uploadToCloudinary = require('../utils/cloudinary');

const BlogServices = {};

// CREATE BLOG
BlogServices.createBlog = async (body) => {
    const { title, short_description, main_description, blogImage, categoryId, subcategoryId, blog_tags, author } = body;
    if (!title || !short_description || !main_description) {
        throw new Error('Title, short description, and main description are required');
    }
    const blog_slug = slugify(title, { lower: true, strict: true });
    const existingBlog = await Blog.findOne({ blog_slug });
    if (existingBlog) {
        throw new Error('A blog with this title already exists');
    }

    let processedBlogImage = null;
    if (blogImage && typeof blogImage === 'string' && blogImage.startsWith('http')) {
        processedBlogImage = blogImage;
    } else if (blogImage && Buffer.isBuffer(blogImage)) {
        try {
            const uploadResponse = await uploadToCloudinary(blogImage);
            processedBlogImage = uploadResponse.secure_url;
        } catch (err) {
            throw new Error('Failed to upload image to Cloudinary: ' + err.message);
        }
    } else if (blogImage && blogImage instanceof File) {
        try {
            const fileBuffer = Buffer.from(await blogImage.arrayBuffer());
            const uploadResponse = await uploadToCloudinary(fileBuffer);
            processedBlogImage = uploadResponse.secure_url;
        } catch (err) {
            throw new Error('Failed to upload image to Cloudinary: ' + err.message);
        }
    } else if (blogImage) {
        throw new Error('Invalid blogImage format');
    }

    // if (categoryId) {
    //     const categoryExists = await BlogCategory.findById(categoryId);
    //     if (!categoryExists) {
    //         throw new Error('Invalid categoryId');
    //     }
    // }

    // if (subcategoryId) {
    //     const subcategoryExists = await BlogCategory.findById(subcategoryId);
    //     if (!subcategoryExists) {
    //         throw new Error('Invalid subcategoryId');
    //     }
    // }

    // if (blog_tags && !Array.isArray(blog_tags)) {
    //     throw new Error('Blog tags must be an array');
    // }

    const newBlog = new Blog({
        title,
        short_description,
        main_description,
        blogImage: processedBlogImage,
        categoryId,
        subcategoryId,
        blog_tags,
        author,
        blog_slug
    });

    await newBlog.save();
    return newBlog;
};


// GET ALL BLOGS
BlogServices.getBlogs = async () => {
    const data =  await Blog.find({ deleted_at: null }).populate('categoryId subcategoryId author', 'categoryName firstName  lastName');
    if(data.length === 0){
        throw new Error('There is no blogs')
    }
    return data;
};

// GET SINGLE BLOG BY ID
BlogServices.getBlogById = async (id) => {
    const blog = await Blog.findOne({ _id: id, deleted_at: null }).populate('categoryId subcategoryId author', 'categoryName firstName lastName');
    if (!blog) {
        throw new Error('Blog not found');
    }
    return blog;
};

// UPDATE BLOG

// BlogServices.updateBlog = async (id, body, imageBuffer) => {
//     if (body.title) {
//         body.blog_slug = slugify(body.title, { lower: true, strict: true });
//     }

//     let processedBlogImage = null;

//     // Handle blogImage based on type
//     if (body.blogImage && typeof body.blogImage === 'string' && body.blogImage.startsWith('http')) {
//         processedBlogImage = body.blogImage;
//     } else if (body.blogImage && Buffer.isBuffer(body.blogImage)) {
//         try {
//             const uploadResponse = await uploadToCloudinary(body.blogImage);
//             processedBlogImage = uploadResponse.secure_url;
//         } catch (err) {
//             throw new Error('Failed to upload image to Cloudinary: ' + err.message);
//         }
//     } else if (body.blogImage && body.blogImage instanceof File) {
//         try {
//             const fileBuffer = Buffer.from(await body.blogImage.arrayBuffer());
//             const uploadResponse = await uploadToCloudinary(fileBuffer);
//             processedBlogImage = uploadResponse.secure_url;
//         } catch (err) {
//             throw new Error('Failed to upload image to Cloudinary: ' + err.message);
//         }
//     } else if (body.blogImage) {
//         throw new Error('Invalid blogImage format');
//     }

//     // Assign the processed image back to the body
//     if (processedBlogImage) {
//         body.blogImage = processedBlogImage;
//     }

//     // Update the blog in the database
//     const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true });
//     if (!updatedBlog) {
//         throw new Error('Blog not found');
//     }

//     return updatedBlog;
// };
BlogServices.updateBlog = async (id, body) => {
    // Generate slug if title is updated
    if (body.title) {
        body.blog_slug = slugify(body.title, { lower: true, strict: true });
    }

    // Update the blog in the database
    const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true });
    if (!updatedBlog) {
        throw new Error('Blog not found');
    }

    return updatedBlog;
};


// DELETE BLOG
BlogServices.deleteBlog = async (id) => {
    const existingBlog = await Blog.findOne({ _id: id, deleted_at: null });
    if (!existingBlog) {
        throw new Error('Blog does not exist');
    }
    const deletedBlog = await Blog.findByIdAndUpdate(id, { deleted_at: new Date(), status: "inactive" }, { new: true });
    if (!deletedBlog) {
        throw new Error('Blog not found');
    }
    return deletedBlog;
};

// GET BLOG BY SLUG
BlogServices.getBlogBySlug = async (slug) => {
    const blog = await Blog.findOne({ blog_slug: slug, deleted_at: null }).populate('categoryId subcategoryId author', 'categoryName firstName lastName');
    if (!blog) {
        throw new Error('Blog not found');
    }
    return blog;
};

// UPDATE BLOG BY SLUG
BlogServices.updateBlogBySlug = async (slug, body) => {
    if (body.title) {
        const newSlug = slugify(body.title, { lower: true, strict: true });
        const existingBlog = await Blog.findOne({ blog_slug: newSlug });
        if (existingBlog) {
            throw new Error('A blog with this slug already exists');
        }
        body.blog_slug = newSlug;
    }
    const updatedBlog = await Blog.findOneAndUpdate({ blog_slug: slug, deleted_at: null }, body, { new: true });
    if (!updatedBlog) {
        throw new Error('Blog not found');
    }
    return updatedBlog;
};

module.exports = BlogServices;
