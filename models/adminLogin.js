const  mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const adminLogin =  new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    address:{type:String,required:true},
    number:{type:String,required:true},
    active:{type:String,required:true},
    gender:{type:String,required:true},
    // img:{type:String}
},
//    {timestamps:true}
);
// adminLogin.set('toJSON',{
//     transform: (document,returnedObj) => {
//         returnedObj.id = returnedObj._id.toString();
//         // delete returnedObj._id;
//         delete returnedObj._v;
//     }
// })

const saltRound = 10
adminLogin.pre("save", function(next){
   console.log(this);
    bcrypt.hash(this.password,saltRound, (err,hashedPassword)=> {
        if(err){
            console.log(err);
        }else {
         this.password = hashedPassword;
         next();
        }
    })
})

adminLogin.methods.validatePassword = function 
(password,callback) {
    console.log(this);
    console.log(password);
    bcrypt.compare(password, this.password, (err,same) => {
        if(!err) {
            callback(err,same);
        }else {
           next();
        }
    });
}


module.exports = mongoose.model("Admin_table", adminLogin);
// const AdminModel =mongoose.model("Admin_tb",adminLogin);
// module.exports = AdminModel;
