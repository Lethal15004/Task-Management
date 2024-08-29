const express=require('express');
const router=express.Router();

const userController=require('../../controller/client/user.controller');

router.get('/profile/:id',userController.profile); //trang cá nhân

router.post('/register',userController.register);  //đăng ký

router.post('/login',userController.login);  //đăng nhập

router.post('/password/forgot',userController.forgotPassword);  //quên mật khẩu

router.post('/password/otp',userController.confirmOTP);// Xác nhận OPT

router.patch('/password/reset',userController.resetPassword)// Đổi mật khẩu
module.exports=router