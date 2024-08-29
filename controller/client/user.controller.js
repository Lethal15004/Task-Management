const User=require('../../model/user.model');
const ForgotPassword=require('../../model/forgot-password.model');
const md5=require('md5');

const generateRandomHelper = require('../../helper/generateToken.helper');
const sendEmailHelper=require('../../helper/sendEmail.helper');
const { json } = require('body-parser');

module.exports.register= async (req,res)=>{
    const dataRegister=req.body;
    const userExist = await User.findOne({email:dataRegister.email,deleted:false});
    if(userExist){
        return res.json({
            code:400,
            message: 'Email đã tồn tại' 
        });
    }
    dataRegister.password=md5(dataRegister.password);
    dataRegister.token=generateRandomHelper.generateRandomString(30);
    
    const newUser=new User(dataRegister);
    await newUser.save();

    res.json({
        code:200,
        message: 'Đăng ký thành công',
        token:dataRegister.token
    });
}

module.exports.login= async(req,res)=>{
    const {email,password}=req.body;
    console.log(email);
    const user =await User.findOne({
        email:email,
        deleted:false,
    })
    if(!user){
        return res.json({
            code:400,
            message: 'Email không tồn tại'
        });
    }
    if(user.password!==md5(password)){
        return res.json({
            code:400,
            message: 'Mật khẩu không đúng'
        });
    }
    res.json({
        code:200,
        message: 'Đăng nhập thành công',
        token: user.token
    });
}

module.exports.forgotPassword= async(req,res)=>{
    const {email}=req.body;
    const user = await User.findOne({
        email:email,
        deleted:false,
    })
    if(!user){
        return res.json({
            code:400,
            message: 'Email không tồn tại'
        });
    }
    // Việc 1: Lưu email, OTP vào database
    const dataSave={
        email: user.email,
        otp:generateRandomHelper.generateRandomNumber(6),
        expireAt: Date.now() + 10*60*1000
    }
    const forgotPassword=new ForgotPassword(dataSave);
    await forgotPassword.save();

    // Việc 2: Gửi mã OTP qua email của user
    const subject= 'Mã OTP lấy lại mật khẩu';
    const html = `Mã OTP xác thực của bạn là <b style="color: black;">${forgotPassword.otp}</b>. Mã OTP có hiệu lực trong 3 phút. Vui lòng không cung cấp mã OTP cho người khác`;
    sendEmailHelper.sendEmail(email,subject,html);
    res.json({
        code:200,
        message: 'Đã gửi mã OTP vào email'
    })
}

module.exports.confirmOTP=async(req,res)=>{
    const {email,otp}=req.body;
    const result = await ForgotPassword.findOne({
        email:email,
        otp:otp,
    })
    if(!result){
        return res.json({
            code:400,
            message: 'Mã OTP không đúng'
        });
    }
    const user=await User.findOne({
        email:email,
        deleted:false,
    })
    res.json({
        code:200,
        message: 'Xác thực mã OTP thành công',
        token:user.token
    })
}

module.exports.resetPassword=async(req,res)=>{
    const {token,password} = req.body;
    const user= await User.updateOne({
        token:token,
        deleted:false,
    },{
        password:md5(password)
    })
    res.json({
        code:200,
        message: 'Đổi mật khẩu thành công'
    })
}

module.exports.profile= async (req, res) => {
    try {
        const token = req.tokenVerify;
        const user = await User.findOne({
            token: token,
            deleted: false
        }).select('-token -password');
        res.json({
            code:200,
            message: 'Trang cá nhân',
            user: user
        })
    } catch (error) {
        res.json({
            code:400,
            message: 'Not Found'
        })
    }
    
}