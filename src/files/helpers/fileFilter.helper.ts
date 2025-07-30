export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  // If the file is not provided, return an error
  if (!file) return callback(new Error('No file provided'), false);

  // Check if the file is provided and is of type 'image'
  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['jpeg', 'jpg', 'png', 'gif'];
  if (validExtensions.includes(fileExtension)) {
    return callback(null, true);
  }
  callback(null, false);
};
