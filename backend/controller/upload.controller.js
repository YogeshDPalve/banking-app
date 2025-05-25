import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/bankImages/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  },
});

const upload = multer({ storage }).single("photo");

const uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).send({
        error: err,
      });
    }
    if (!req.file) {
      return res.status(400).send({
        error: "No file uploaded",
      });
    }
    return res.status(200).send({
      message: "File uploaded successfully",
      filePath: `bankImages/${req.file.filename}`,
    });
  });
};

export default uploadFile;
