const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
 
     

  router.get("/getdoc", userController.GetUpload);


module.exports = router;