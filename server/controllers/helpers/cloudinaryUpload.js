import Cloudinary from 'cloudinary';

const cloudinary = Cloudinary.v2;

class Upload {
  static uploadImage(imagePath) {
    return cloudinary.uploader.upload(imagePath)
      .then(image => image.url);
  }
}

export default Upload;
