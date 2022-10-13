const express = require("express");
const PDF = require("../models/models");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");


const GetUpload =async (req,res) =>{
  console.log("na way o")
    try {
      let user = await PDF.find({});
      
      res.status(200).json({message:"successfully", status:true,user});
      } catch (err) {
        res.status(500).json({message:"Internal server error",err})
          console.log(err);
      }
  
  }

  // get single product
  const getProduct = async (req,res) => {
    try {
      const product = await PDF.findById(req.params.id)
      res.status(200).json(product);
    }catch(error){
      res.status(500).json(error);
    }
  }
    

  // set signin user
  const UserSignUp = async (req,res) => {
    //  console.log(req.body);
        const adminDetails1 = req.body;
        const email = req.body.email;
        UserModel.findOne({email:email}, (err,result) => {
          if(err){
            res.status(500).json({message:"Internal server error",status:false});
          }else {
            if(result){
              res.status(500).json({message:"admin already exist!",status:false});
            }else {
              let form1 = new UserModel(adminDetails1);
              console.log("na me b this");
                form1.save((err) => {
                  if(err){
                    res.status(400).json({message:"could not sign up", 
                    status:false,err});
                  }else{
                    console.log("i don save am")
                    res.status(200).json({message:"data sent successful",
                    status:true,form1});
                  }
                })
              // res.send({message:"signup succcessfully",status:true})
            }
          }
        })
    }

    // FOR AUTH
const UserLogin= async (req,res) => {
 console.log(req.body);
 const userDetails = req.body;
 const password = userDetails.password;
 const email = userDetails.email;
   UserModel.findOne({email:email},
    (err,user) => {
      if(err){
        res.status(500).send({message:"Internal server error",status:false})
      }else {
        if(!user){
          res.status(401).json({message:"Email not Found!",status:false});
        }else {
            user.validatePassword(password,(err,same) => {
                if(err) {
                  res.status(500).json(err);
                }else{
                  if(!same){
                    res.status(401).json({messaage:"Wrong password",status:false});
                  }else {
                   const token =  jwt.sign({email},
                      process.env.JWT_SEC,
                      {expiresIn:30})
                      console.log(token);
                    res.status(200).json({message:"correct details",status:true,
                    token,user});
                  }
                }
            })
        }
      }
    })
}

      

    
  
module.exports = {GetUpload,getProduct,UserSignUp,UserLogin};
