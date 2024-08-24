const Task=require('../../model/task.model');
module.exports.index=async(req,res)=>{
    const find={
        deleted:false
    }
    const sort={};
    if(req.query.status){
        find.status=req.query.status;
    }
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey]=req.query.sortValue;
    }
    const tasks = await Task.find(find).sort(sort);
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