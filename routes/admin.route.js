const express = require("express");
const   router = express.Router();
const adminController = require("../controllers/adminController")
const signUpController = require("../controllers/adminLogin");
const { Router } = require("express");

router.post("/upload",adminController.upload.array("uploaded_Image",12),adminController.UploadFile);
// router.get("/upload",adminController.GetUpload);

router.put("/products/:id",adminController.updateProduct);

router.get('/myProduct',adminController.GetUpload);

router.get('/find/:id',adminController.getSingleProduct);
router.delete("/delete/:id", adminController.deleteProduct);
router.post("/signUp",signUpController.AdminSignUp);
router.post("/login",signUpController.logIn);
router.get("/workers",signUpController.getWorkers);
router.get("/dashboard",signUpController.getDashboard);
router.put("/admin/:id",signUpController.updateAdmin);
router.delete("/term/:id",signUpController.deleteUser);

module.exports = router;