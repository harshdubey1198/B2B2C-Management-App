module.exports = {
    apps: [
      {
        name: 'B2B-Backend',
        script: './server.js',
        watch: true,
        env: {
          NODE_ENV: 'development',
          PORT: 7200,
          MONGO_URI: process.env.MONGO_URI,
          TOKEN_KEY: process.env.TOKEN_KEY,
          GOOGLE_MAIL: process.env.GOOGLE_MAIL,
          GOOGLE_PASS: process.env.GOOGLE_PASS,
          CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
          CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
          CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
        },
        env_production: {
          NODE_ENV: 'production',
          PORT: 7200,
          MONGO_URI: process.env.MONGO_URI,
          TOKEN_KEY: process.env.TOKEN_KEY,
          GOOGLE_MAIL: process.env.GOOGLE_MAIL,
          GOOGLE_PASS: process.env.GOOGLE_PASS,
          CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
          CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
          CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
        }
      }
    ]
  };
  