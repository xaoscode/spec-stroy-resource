import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

export const multerConfigProjects: MulterOptions = {
  storage: diskStorage({
    destination: './uploads/images',
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|svg\+xml)$/)) {
      callback(null, true);
    } else {
      callback(new Error('Unsupported file format'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 10,
  },
};
