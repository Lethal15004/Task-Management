const User=require('../../model/user.model');
const md5=require('md5');

const generateToken = require('../../helper/generateToken.helper');
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
    dataRegister.token=generateToken.generateRandomString(30);
    
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