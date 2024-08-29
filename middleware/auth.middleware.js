const User=require('../model/user.model');
module.exports=async(req,res,next)=>{
    const authorization = req.headers.authorization
    if(!authorization){
        return res.json({
            code:400,
            message:"Vui lòng gửi kèm theo token"
        })
    }

    const token=authorization.split(' ')[1].trim();
    if(!token){
        return res.json({
            code:400,
            message:"Vui lòng gửi kèm theo token"
        })
    }

    const user=await User.findOne({
        token:token,
        deleted:false
    });

    if(!user){
        return res.json({
            code:403,
            message:"Token không hợp lệ"
        })
    }
    req.tokenVerify=token
    next();
}