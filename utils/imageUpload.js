const multer = require("multer");

const imageUpload = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });
  return multer({ storage: storage });
};
module.exports = imageUpload;
