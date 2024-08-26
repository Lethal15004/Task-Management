const express=require('express');
const router=express.Router();

const taskController=require('../../controller/client/task.controller');

router.get('/',taskController.index);
router.get('/detail/:idTask',taskController.detail);

router.patch('/change-status',taskController.changeStatus);

router.post('/create',taskController.create);

module.exports=router
