import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../utils/customError";
import cloudinary from "../../config/cloudinary";

type RequestWithFiles = Request & { file?: Express.Multer.File };
type CloudinaryResult = {
  secure_url: string;
  public_id: string;
};

export const uploadImage = async (
  req: RequestWithFiles,
  res: Response,
  next: NextFunction
) => {
  if (!req.files || !(req.files instanceof Array) || req.files.length === 0)
    throw new CustomError("No file uploaded", 400);
  if (req.files.length > 10) {
    throw new CustomError("Maximum 10 images allowed", 400);
  }
  try {
    const uploadSingle = (
      file: Express.Multer.File
    ): Promise<CloudinaryResult> => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "restaurants",
          },
          (error, result) => {
            if (result) {
              resolve({
                secure_url: result.secure_url,
                public_id: result.public_id,
              });
            } else {
              reject(error);
            }
          }
        );
        stream.end(file.buffer);
      });
    };
    const uploadResults = await Promise.all(
      req.files.map((file) => uploadSingle(file as Express.Multer.File))
    );
    res.status(200).json(uploadResults);
  } catch (error) {
    next(error);
  }
};
