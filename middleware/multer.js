const multer = require('multer');


const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
  };

// set storage
var storage = multer.diskStorage({
    destination : function ( req , file , cb ){
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
          }
        cb(error, 'uploads')
    },
    filename : function (req, file , cb){
        const name = file.originalname
                        .toLowerCase()
                        .split(" ")
                        .join("-");
        // image.jpg
        // var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));
        const ext = MIME_TYPE_MAP[file.mimetype];

        // cb(null, file.originalname + '-' + Date.now() + ext)
        cb(null, name + "-" + Date.now() + "." + ext);
    }
})

// multer Filter
// const multerFilter = (req, res, cb) => {
//     if (file.minetype.splite("/")[1] === "pdf"){
//         cb(null, true);
//     } else {
//         cb(new Error("Not a PDF File...!!"), false)
//     }
// }

module.exports = store = multer({ storage : storage },)