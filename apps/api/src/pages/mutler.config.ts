import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

export const multerConfig: MulterOptions = {
  storage: diskStorage({
    destination: './uploads/images',
    filename: (req, file, callback) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|svg\+xml)$/)) {
      callback(null, true);
    } else {
      callback(new Error('Unsupported file format'), false);
    }
  },
};
