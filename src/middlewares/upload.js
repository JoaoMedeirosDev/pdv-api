const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5_242_880, //5mb
  },
});

module.exports = { upload };
