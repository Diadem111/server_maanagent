const  mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userDetails =  new mongoose.Schema({
    firstname:{type:String,required:true,unique:true},
    lastname:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    number:{type:String,required:true},
    password:{type:String,required:true},

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
userDetails.pre("save", function(next){
   console.log(this);
    bcrypt.hash(this.password,saltRound, (err,hashedPassword)=> {
        if(err){
            console.log(err);
        }else {
         this.password = hashedPassword;
         console.log(hashedPassword);
         next();
        }
    })
})

userDetails.methods.validatePassword = function 
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


module.exports = mongoose.model("Client_table", userDetails);
// const AdminModel =mongoose.model("Admin_tb",adminLogin);
// module.exports = AdminModel;
