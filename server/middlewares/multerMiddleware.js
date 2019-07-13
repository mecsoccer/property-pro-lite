import multer from 'multer';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    /* istanbul ignore next */cb(null, file.originalname);
  },
});

const upload = multer({ storage }).single('image_url');

export default upload;
