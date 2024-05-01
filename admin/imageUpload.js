const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: 'dawfvl61t',
  api_key: '237111674384819',
  api_secret: 'IPQwVxBAuXjEW5no-RRgsQzI5LU'
});

async function uploadImage(imagePath) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
        upload_preset: 'gylcvpx1'
      });

    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

module.exports = { uploadImage };
