const express = require("express");
const multer = require("multer");
const uuid = require("uuid").v4;
const cloudinary = require("../middleware/cloudiary.config");
const path = require('path');
const PDF = require("../models/models");

 
const files = [];
const fileInArray = [];

const storage = multer.diskStorage({
destination:(req,file,cb)=> {
  cb(null, "uploads")
},
filename: (req,file,cb) => {
  let filePath = [];
  // console.log("MULTER ENTRY", file.originalname);
  // console.log("files",req.files);

  const ext = path.extname(file.originalname);
  const id = uuid();
  filePath = `${id}${ext}`;
  // console.log("filepath", filePath);
  fileInArray.push([(filePath)]);
  // console.log("In Array", filePath);
  files.push(fileInArray);
  // console.log("pushed main ", fileInArray);
  cb(null,filePath);
  // console.log("current length",fileInArray.length);
}
})


const upload = multer ({
fileFilter :(req,file,cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/jfif") {
      cb(null,true);
  }else{
      cb(new Error ("only .png, .jpg, .jpeg file"),false);
      
      //  return res.status(400).send({ message: "Upload a file please!" });
  }
},
storage:storage
})


const UploadFile = async (req,res)=>{
    //  if(!req.file) return res.send("Please upload a file");
    //  console.log(req.file);
     
  try {
    // console.log(req.body);
    // console.log(req.f+iles);
    // console.log("Files", fileInArray);
    console.log("finally done");
    let img ;
    let pdff ;
    let xy;
    let yz;
    let imagesBuffer =[];
    let imgUrl = [];
    let priceBuffer = [];
  for(let i=0; i< fileInArray.length;i++){
    let fileext = fileInArray[i][0].split('.')[1];
    // console.log(fileext);
    // console.log(path.resolve(__dirname,"../uploads"));
    if(fileext == "jpg" || fileext == "png" || fileext == "jpeg" || fileext == "jfif"){
        img = await cloudinary.uploader.upload(`${path.resolve(__dirname,"../uploads")}/${fileInArray[i][0]}`,{
          folder:"JABSTOCK"
        });
        // console.log(img);
    }
    imagesBuffer.push({
      public_id:img.public_id,
      // secure_url:img.secure_url,

    })
    imgUrl.push({
      secure_url:img.secure_url,
    })
    // priceBuffer.push(
    //   {price:req.body.price}
    // )
    // console.log(imagesBuffer);
    // console.log(imgUrl)
      
  }
  let message = req.body.description;
  let arr = message.split('.');
  console.log(arr);
  
  let user = new PDF({
    name:req.body.name,
    location :req.body.location,
    price:req.body.price,
    market_price:req.body.market_price,
    days:req.body.days,
    year:req.body.year,
    volume:req.body.volume,
    available_supply:req.body.available_supply,
    Circulating_supply:req.body.Circulating_supply,
    Average_supply:req.body.Average_supply,
    description:arr,
    img1:imagesBuffer,
    cloudinary_id_img :imgUrl,
    
    
  });
 const num = await user.save();
  res.json({
    message: "images uploaded", success: true, num
  });
  //  res.send({
  //   message:"File has bben uploaded",
  //   status:true
  // })
  // res.send({message:"upload successfully whoa!"})
} catch (err) {
    console.log(err);
    res.json({
      message: "Failed to upload",
        success: false,
         err,

    })
    // res.send({
    //   message:err.message,
    //   status:false
    // })
    // res.send({message1:"upload failed"})
}
}
const GetUpload =async (req,res) =>{
  try {
    let user = await PDF.find({});
    console.log("na me be this")
    res.json(user);
    console.log(user);
    } catch (err) {
        console.log(err);
    }

}
// get single product
const getSingleProduct = async (req,res) => {
  try {
    const product = await PDF.findById(req.params.id)
    res.status(200).json(product);
  }catch(error){
    res.status(500).json(error);
  }
}
// delete product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(200).json("Product has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
}

// const updateProduct = (req,res) => {
//   console.log(req.body);
//   if(!req.body) {
//      return res.status(400).send({
//       message:"Data to update can not be empty!"
//      });
//   }
//   const id = req.params.id;
//   PDF.findByIdAndUpdate(id,req.body, {
//     useFindAndModify:false
//   }).then (data => {
//     if(!data) {
//       res.status(404).send({
//         message:`cannot update document with id=${id}. maybe document was not found`
//       });
//     }else res.send({message:"document was nupdated successfully"});
//   })
//   .catch (err => {
//     res.status(500).send ({
//       message:"error updating document with id=" + id
//     });
//   });
// }

// update product
const updateProduct = async (req,res) =>{
    try {
    const id = req.params.id;
    const updatedProduct = await PDF.findByIdAndUpdate(id, req.body,{
      new:true,
      $set: req.body
    }) 
    res.status(200).json(updatedProduct);
    console.log(updatedProduct);
     } catch (error) {
    res.status(500).json(error)
  }
}

// const updateProduct = async (req,res) => {
//   console.log(req.body);
//   try {
//      let id = req.params.id;
//      let updatedProduct = new PDF(req.body);
//      PDF.findByIdAndUpdate(id, 
//         {
//      name:updatedProduct.name,
//     // location :updatedProduct.location,
//     price:updatedProduct.price,
//     // market_price:updatedProduct.market_price,
//     // days:updatedProduct.days,
//     // year:updatedProduct.year,
//     // volume:updatedProduct.volume,
//     // available_supply:updatedProduct.available_supply,
//     // Circulating_supply:updatedProduct.Circulating_supply,
//     // Average_supply:updatedProduct.Average_supply, 
//         }
//       )
//       console.log(updatedProduct);
//       res.status(200).json(updatedProduct);

//   }catch (error) {
//     res.send(500).json(error);
//   }
// }




module.exports = {UploadFile,upload,updateProduct,getSingleProduct,GetUpload,deleteProduct};