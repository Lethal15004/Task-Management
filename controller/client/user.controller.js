const User=require('../../model/user.model');
const md5=require('md5');

const generateToken = require('../../helper/generateToken.helper');

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