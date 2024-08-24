const Task=require('../../model/task.model');
module.exports.index=async(req,res)=>{
    const tasks = await Task.find({
        deleted: false
      });
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