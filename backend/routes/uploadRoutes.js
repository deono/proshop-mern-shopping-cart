import path from "path"; // nodejs module
import express from "express";
/*
Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files
https://www.npmjs.com/package/multer
*/
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    /* format filenames as fieldname-date.ext to prevent 
    duplicate filenames */
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// validate the filetype to limit only image files
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Only image file uploads are permitted (jpg, jpeg or png).");
  }
}

// passed in as middleware to the route
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
