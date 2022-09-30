const express = require("express");
const PDF = require("../models/models");



const GetUpload =async (req,res) =>{
    try {
      let user = await PDF.find({});
      res.json(user);
      } catch (err) {
          console.log(err);
      }
  
  }
  
  
module.exports = {GetUpload};
