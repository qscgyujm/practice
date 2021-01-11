import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

//  store path
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(`${process.cwd()}/public`)) {
      fs.mkdirSync(`${process.cwd()}/public`);
    }

    cb(null, path.join(`${process.cwd()}/public`));
  },
  filename: (req, file, cb) => {
    console.log('uploadMediaFile.file', file);

    const fileExtension = file.originalname.match(/\..{3,4}$/g);

    cb(null, `${uuidv4()}${fileExtension[0]}`);
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
  // if (
  //   file.mimetype === 'image/png'
  //     || file.mimetype === 'image/jpg'
  //     || file.mimetype === 'image/jpeg'
  // ) {
  // } else {
  //   cb(null, false);
  // }
};

export default multer({
  storage: fileStorage,
  fileFilter,
}).single('file');
