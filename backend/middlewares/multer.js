const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/images");
  },
  filename: (req, file, cb) => {
    const uniqueFileName =
      Date.now() + Math.round(Math.random() * 1e9) + "-" + path.extname(file.originalname);
    cb(null, uniqueFileName);
  },
});


const upload = multer({
    storage, 
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/png", "image/jpeg", "image/gif"]
        if(allowedTypes.includes(file.mimetype)){
            cb(null, true)
        } else{
            cb(null, false);
        }
    }
})


module.exports = upload;