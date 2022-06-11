import multer from "multer";
const cloudinary = require("cloudinary").v2;

const storage = multer.memoryStorage();
const upload = multer({ storage });
const myUploadMiddleware = upload.single("file");


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  let response;
  if (req.method === "POST") {
    await runMiddleware(req, res, myUploadMiddleware);
    const file = req.file;

    try {
      const b64 = Buffer.from(file.buffer).toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;
      response = await cloudinary.uploader.upload(dataURI, {
        folder: "file-sharing-app",
        resource_type: "auto",
        context: `filename=${file.originalname}`,
      });
    } catch (error) {
      res.status(400).json(error);
      return;
    }
  }

  if (req.method === "GET") {
    try {
      response = await cloudinary.search
        .expression(`public_id=${req.query.id}`)
        .with_field("context")
        .execute();
    } catch (error) {
      res.status(400).json(error);
      return;
    }
  }

  return res.status(200).json(response);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
