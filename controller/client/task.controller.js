const Task=require('../../model/task.model');
module.exports.index=async(req,res)=>{
    const find={
        deleted:false
    }
    if(req.query.status){
        find.status=req.query.status;
    }
    const tasks = await Task.find(find);
    res.json(tasks);
}
module.exports.detail=async(req,res)=>{
    try {
        const task = await Task.findOne({
          _id:req.params.idTask,
          deleted: false
        });
        res.json(task);
    } catch (error) {
        res.json({message: 'Task not found'});
    }
}