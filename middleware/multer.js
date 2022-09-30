const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 *1024;
// const { nextTick } = require("vue/types/umd");
const DIR = "../uploads/";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");


let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;


// specify the storage engine
// const storage = multer.diskStorage({
//     destination:function (req,file,cb) {
//       cb(null, DIR);
  
//     },
//     filename:function(req,file,cb){
//           cb(null,new Date().toISOString + file.originalname);
//         }
//   })
  
  // file validation
  
  // const fileFiter = (req,file,cb) => {
  //   if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jfif"){
  //     cb(null,true); 
  //   }else {
  //     // prevent upload
  //     cb({message:"Unsupported file format"}, false)
  //   }
  // }
  
  // const upload = multer({
  //   storage :storage,
  //   fileFilter:fileFiter,
  // })
  

  // module.exports.send = (req,res,next)=> {
  //   return upload.array("image")(req,res, ()=>{
  //       next()
  //   })
  // }