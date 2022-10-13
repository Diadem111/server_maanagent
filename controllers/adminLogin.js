const express = require("express");
const path = require('path');
const AdminModel= require("../models/adminLogin");
const jwt = require("jsonwebtoken");

const AdminSignUp = async (req,res) => {
//  console.log(req.body);
    const adminDetails = req.body;
    const email = req.body.email;
    AdminModel.findOne({email:email}, (err,result) => {
      if(err){
        res.status(500).send({message:"Internal server error",status:false});
      }else {
        if(result){
          res.status(500).send({message:"admin already exist!",status:false});
        }else {
          let form = new AdminModel(adminDetails);
          // console.log("na me b this");
            form.save((err) => {
              if(err){
                res.status(400).send({message:"could not sign up", 
                status:false}).json(err);
              }else{
                res.status(200).send({message:"data sent successful",
                status:true,form});
              }
            })
          // res.send({message:"signup succcessfully",status:true})
        }
      }
    })
}

// FOR AUTH
const logIn = async (req,res) => {
 console.log(req.body);
 const userDetails = req.body;
 const password = userDetails.password;
 const email = userDetails.email;
   AdminModel.findOne({email:email},
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
                    token});
                  }
                }
            })
        }
      }
    })
}

const getDashboard = (req,res) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  jwt.verify(token,process.env.JWT_SEC ,(err,result) => {
   if(err){
    console.log(err);
    res.status(402).json({message:"jwt failed",err,status:false})
   }else {
    const email = result.email;
      AdminModel.findOne({email:email}, (err,result)=> {
        res.status(200).json({message:"CONGRATULATIONS!",status:true,result})
    console.log(email);
      });
   
   }
  });
}   

const getWorkers =async (req,res) =>{
  try {
    let user = await AdminModel.find({});
    console.log("na me be this")
    res.json(user);
    console.log(user);
    } catch (err) {
        console.log(err);
    }

}

const updateAdmin= async (req,res) =>{
  try {
  const id = req.params.id;
  const updateAdmin = await AdminModel.findByIdAndUpdate(id, req.body,{
    new:true,
    $set: req.body
  }) 
  res.status(200).json({message:"seen user",status:true,updateAdmin});
  console.log(updateAdmin);
   } catch (error) {
  res.status(500).json(error)
}
}

// delete user
const deleteUser = async (req, res) => {
  console.log("na me b delete");
  try {
    await AdminModel.findByIdAndDelete(req.params.id)
    console.log(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
}


module.exports = {AdminSignUp,logIn,getDashboard,getWorkers,updateAdmin,deleteUser};