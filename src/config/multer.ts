import multer from "multer";
import fs from "fs";

/**
 *  INIT MULTER
 */
export const initUpload = (): any => {
  return {
    storage: multer.diskStorage({
      destination: (req, file, next) => {
        //specify destination
        if (!fs.existsSync(process.cwd() + "/temp/")) {
          fs.mkdirSync(process.cwd() + "/temp/");
        }
        next(null, process.cwd() + "/temp/");
      },
      filename: (req, file, next) => {
        next(null, file.originalname); //specify the filename to be unique
      },
    }), //multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
    /*fileFilter: (req: any, file: any, next: any) => { // filter out and prevent non-image files.
      next(null, true);
    }*/
  };
};
