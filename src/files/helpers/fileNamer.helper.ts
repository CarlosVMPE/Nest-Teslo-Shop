import { v4 as uuid } from 'uuid';
export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, newName: string) => void,
) => {
  // If the file is not provided, return an error
  if (!file) return callback(new Error('No file provided'), '');
  const fileExtension = file.mimetype.split('/')[1];
  const fileName = `${uuid()}.${fileExtension}`;
  callback(null, fileName);
};
