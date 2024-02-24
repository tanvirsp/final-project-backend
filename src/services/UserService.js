const UserModel = require("../models/UserModel");
const EmailSend = require("../utility/EmailHelper");
const { EncodeToken } = require("../utility/TokenHelper");
const bcrypt = require('bcrypt');


exports.RegisterUserService = async(req) =>{

    try {
        
        const reqBody = req.body;
        const userExit = UserModel.find({email: reqBody.email});
    
        
        if(userExit.length === 0){
            return {status:"fail", data: `This ${reqBody.email} email already used`}
        }


        const code = Math.floor(100000+Math.random()*900000);
        reqBody.otp= code;
    
        const data = await UserModel.create(reqBody);
       
        //sendign verify code to email
        const email = reqBody.email;
        const emailText=`Your Verification Code is= ${code}`
        const emailSubject='Email Verification'
        await EmailSend(email, emailText, emailSubject );
       

        return {status:"success", message:"6 Digit OTP has been send", data: data}

    } catch (error) {
        const reqBody = req.body;
        return {status:"fail", message: `This ${reqBody.email} email already used`, data:error.toString()}
    }

}



exports.VerifyOTPService  = async(req) =>{
    try {
        const email= req.params.email;
        const otp= req.params.otp;
        const total = await UserModel.find({email: email, otp: otp}).count();

        if(total === 1) {
            // User Token Create
            const token=EncodeToken(email);
            
            // OTP Code Update To 0
            await UserModel.updateOne({email:email},{$set:{otp:"0"}});
            return {status:"success", message:"Your Email Verify Successfully", token: token}

        }else{
            return {status:"fail", message:"Invalid OTP"}
        }


    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}


exports.LoginService = async(req) =>{

    try {
        const {email, password} = req.body;

         //Validate Request
       if(!email || !password){
        return {status:"fail", message: "Please Enter email and password"}
       };

       // Check if user exists
       const user = await UserModel.findOne({ email });
       if(!user){
           return {status:"fail", message: "User not found, please Signup"}
       };


       // User exists, check if password is correct
       const passwordIsCorrect = await bcrypt.compare(password, user.password);


       if( user && passwordIsCorrect){
        
            // User Token Create
            const token=EncodeToken(email);
            return {status:"success", token: token}

        } else {
            return {status:"fail", message: "Invalid email or password"}
        }



    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

};




exports.SendOtpService = async(req) =>{
    try {
        const email= req.params.email;
        const user = await UserModel.findOne({ email });
        if(!user){
            return {status:"fail", message: "User not found, please Signup"}
        };

        //sendign verify code to email
        const code = Math.floor(100000+Math.random()*900000);
        const emailText=`Your Verification Code is= ${code}`;
        const emailSubject='Email Verification'
        await EmailSend(email, emailText, emailSubject );

        //set OTP into user database
        await UserModel.updateOne({email: email}, {$set:{otp: code}} );
        return {status:"success", message:"6 Digit OTP has been send check mail"}  

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}





exports.ResetPasswordService = async(req) =>{
    try {
    
        const {newPassword, email} = req.body;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const user = await UserModel.findOne({email: email});
        if(user.otp === "0"){
            await UserModel.updateOne({email: email}, {$set: {password: hashedPassword}});
            return {status:"success", message: "Your password have been changed"}

        } else {
            return {status:"fail", message: "Please verify your OTP"}
        }
  

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
};



exports.ChangePasswordService = async(req) =>{
    try {
    
        
        const {oldPassword, newPassword} = req.body.data;
        const email =  req.headers.email

 
       // Check if user exists
       const user = await UserModel.findOne({ email });
       if(!user){
           return {status:"fail", message: "User not found, please Signup"}
       };
       
        //check if Old password is correct
        const oldPasswordIsCorrect = await bcrypt.compare(oldPassword, user.password);
        console.log(oldPasswordIsCorrect);

        if(!oldPasswordIsCorrect){
            return {status:"fail", message: "Old password is not matching"}
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedNewassword = await bcrypt.hash(newPassword, salt);

        await UserModel.updateOne({email: email}, {$set: {password: hashedNewassword}});
        return {status:"success", message: "Your password have been changed"}


    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
};






exports.ProfileService = async(req) =>{
    try {
        const email = req.headers.email;
        const data = await UserModel.find({email: email});

        return {status:"success", data: data}

    } catch (error) {
        return {status:"fail", data:error.toString()}
    }
}


exports.ProfileUpdateService =  async(req) =>{
    

    try {
        const reqBody = req.body; 
        const email = req.headers.email;
        await UserModel.updateOne({email: email}, {$set: reqBody}, {upsert: true});
        return {status:"success", message:"Profile Save Successfully"}

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }
}