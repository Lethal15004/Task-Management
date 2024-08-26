const express=require('express');
const router=express.Router();

const taskController=require('../../controller/client/task.controller');

router.get('/',taskController.index);
router.get('/detail/:idTask',taskController.detail);

router.patch('/change-status',taskController.changeStatus);

module.exports=router
