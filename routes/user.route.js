const { Router } = require("express");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
 
     

  router.get("/getdoc", userController.GetUpload);
   router.get("/find/:id",userController.getProduct);
   router.post("/signUp",userController.UserSignUp);
  router.post("/userAuth",userController.UserLogin);
  //  router.get("/estate", userController.GetUpload);
module.exports = router;