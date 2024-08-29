const express=require('express');
const router=express.Router();

const userController=require('../../controller/client/user.controller');

router.post('/register',userController.register);  //đăng ký

router.post('/login',userController.login);  //đăng nhập

router.post('/password/forgot',userController.forgotPassword);  //quên mật khẩu
module.exports=router