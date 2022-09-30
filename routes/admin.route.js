const express = require("express");
const multer = require("multer");
// const cloudinary = require('cloudinary');
// import {UploadApiResponse,v2 as cloudinary} from "cloudinary";
const Cloudinary= require("../middleware/cloudiary.config");
// const uploadedApi = require("UploadApiResponse");
// const multer = require("../middleware/multer");
// const getUpload = require("../controllers/adminController");
// const uploadDoc = require("../controllers/adminController");
const   router = express.Router();
// const upload = require("../controllers/adminController");
const adminController = require("../controllers/adminController")
const parser = require("../middleware/cloudiary.config");
// const upload = require("../controllers/adminController");

router.post("/upload",adminController.upload.array("uploaded_Image",12),adminController.UploadFile);
// router.get("/upload",adminController.GetUpload);

module.exports = router;