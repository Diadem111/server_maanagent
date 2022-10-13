const mongoose = require("mongoose"	);

const imgSchema = new mongoose.Schema({
    name:{
        type:String,},

    location :{
        type:String,},

    price:{
        type:String,
    },
    market_price:{
        type:String,},

    days:{
        type:String,},

    year:{
        type:String,},

    volume:{
        type:String,},

    available_supply:{
        type:String,},

    Circulating_supply:{
        type:String,},

    Average_supply:{
        type:String,},

    description:{
        type:[String],},

    img1:[ ],

   cloudinary_id_img:[ ]
})

 module.exports = mongoose.model("PDF", imgSchema);