const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require('multer');
// const multer = require("multer");
// const upload = multer({ dest: 'upload/' })
const AdminModel = require("./models/admin.model");
require('dotenv').config();
// app.use(bodyParser.urlencoded({extended:true}));
// const path = require('path');
// global.__basedir = __dirname;
// app.use('./uploads', express.static(path.join(__dirname, 'uploads')));
const fileupload = require("express-fileupload");
// app.use(bodyParser.json({limit: "50mb"}));
// const route = require("./controllers/adminController");
// const upload = require("./controllers/adminController");
const cloudiary = require("./middleware/cloudiary.config");
// const fs = require("fs");
// const userRoute = require("./routes/route");
const adminRouter = require("./routes/admin.route");
const UserRoute = require("./routes/user.route");
app.use('/admin',adminRouter);
app.use("/user", UserRoute);
// app.use(bodyParser.json());
const URI = process.env.MONGODB_URI;

// set up mongoose connection

mongoose.connect(URI)
.then (() => console.log("mongoose connected!"))
.catch ((err) => console.log(err));
// mongoose.connect(URI, (err) => {
//     if(err) {
//       console.log("Mongoose no gree connect");
//     } else {
//       console.log("Mongoose don connect");
//     }
//   })
  

  const PORT = process.env.PORT || 2000;
  
app.listen(PORT,() => {
    console.log(`app is listening at PORT 4000`)
})