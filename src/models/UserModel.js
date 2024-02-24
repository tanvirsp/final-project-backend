const mongoose=require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email:{
            type:String, 
            unique:true,  
            trim: true,
            required: [true, "Please add a email"],
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please enter a valid emaial",
              ],
        },
        password: {
            type: String,
            required: true,
            trim: true,
            // min: 6,
            // max: 64,
        },
        picture:{
            type: String,
            default: ""
        },
        mobile: {
            type: String,
            required: true,
            trim: true,
            match: [
                /^(?:(?:\+|00)88|01)?\d{11}\r?$/,
                "Please Enter a Valid Mobile Number"
            ],
        },
        otp: {type: String}


    },
    {timestamps:true,versionKey:false}
);



//   Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  });




const UserModel=mongoose.model('users', userSchema)
module.exports=UserModel