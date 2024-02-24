
const { RegisterUserService, VerifyOTPService, LoginService, SendOtpService, ResetPasswordService, ProfileUpdateService, ProfileService, ChangePasswordService } = require("../services/UserService")

exports.RegisterUser = async(req, res) =>{
    const result = await RegisterUserService(req)
    return res.status(200).json(result)
}


exports.VerifyOTP = async(req, res) =>{
    const result = await VerifyOTPService(req);
    if(result['status']==="success"){
        // Cookies Option
        const cookieOption={expires:new Date(Date.now()+24*60*60*1000), httpOnly:false}
        // Set Cookies With Response
        res.cookie('token', result['token'], cookieOption)
        return res.status(200).json(result)

    }else {
        return res.status(200).json(result)
    }   
    
}


exports.Login = async(req, res) =>{
    const result = await LoginService(req);
    if(result['status']==="success"){
        
        // Cookies Option
        const cookieOption={expires:new Date(Date.now()+24*60*60*1000), httpOnly:false}
        // Set Cookies With Response
        res.cookie('token', result['token'], cookieOption);
        
    
        return res.status(200).json(result)

    }else {
        
        return res.status(200).json(result)
    }
}


exports.Logout = async(req, res) =>{
 
        
    let cookieOption={expires:new Date(Date.now()-24*60*60*1000), httpOnly:false}

    // Set Cookies With Response
    res.cookie('token',"", cookieOption)
    return res.status(200).json({status:"success"})

}



exports.SendOtp = async(req, res) =>{
    const result = await SendOtpService(req)
    return res.status(200).json(result)
}




exports.ResetPassword = async(req, res) =>{
    const result = await ResetPasswordService(req)
    return res.status(200).json(result)
}

exports.ChangePassword = async(req, res) =>{
    const result = await ChangePasswordService(req)
    return res.status(200).json(result)
}




exports.Profile = async(req, res) =>{
    const result = await ProfileService(req)
    return res.status(200).json(result)
}

exports.ProfileUpdate = async(req, res) =>{
    const result = await ProfileUpdateService(req)
    return res.status(200).json(result)
}