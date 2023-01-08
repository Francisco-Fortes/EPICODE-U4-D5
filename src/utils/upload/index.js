import { fileURLToPath } from "url";
import { dirname, join } from "path";

const publicFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../../public"
);
//Different way to target public folder
// const publicFolderPath = join(process.cwd(), "./public")

export const parseFile = multer();
export const uploadFile = (req, res, next) => {
  try {
    const { originalname, buffer } = req.file;
    const extension = extname(originalname);
    const fileName = `${req.params.id}${extension}`;
    const pathToFile = path.join(publicDirectory, fileName);
    fs.writeFileSync(pathToFile, buffer);
    const link = `http://localhost:3001/${fileName}`;
    req.file = link;
    next();
  } catch (error) {
    next(error);
  }
};
