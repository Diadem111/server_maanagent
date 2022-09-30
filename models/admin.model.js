const mongoose = require("mongoose");


const userSchema = new mongoose.Schema (
    {
              name:String,
              location :String,
              price:String,
              market_price:String,
              days:String,
              year:String,
              volume:String,
              available_supply:String,
              Circulating_supply:String,
              Average_supply:String,
              description:String,
              img1:String,
              img2:String,
              img3:String,
              img4:String,
              img5:String,
              img6:String,
              img7:String,
              img8:String,
              img9:String,
              img10:String,
        
    }
)
userSchema.set('toJSON',{
    transform: (document,returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        delete returnedObj._id;
        delete returnedObj._v;
    }
})

const AdminModel  = mongoose.model("adminUpload",userSchema);
module.exports = AdminModel;