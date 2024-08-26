const Task=require('../../model/task.model');
module.exports.index=async(req,res)=>{
    //Lọc theo trạng thái
    const find={
        deleted:false
    }
    //Sắp xếp theo trường nào đó
    const sort={};
    if(req.query.status){
        find.status=req.query.status;
    }
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey]=req.query.sortValue;
    }

    //Phân trang
    const pagination={
        currentPage:1,
        limitItems:3
    }
    if(req.query.limitItems){
        pagination.limitItems=Number(req.query.limitItems);
    }
    if(req.query.page){
        pagination.currentPage=Number(req.query.page);
    }
    pagination.skip=(pagination.currentPage-1)*pagination.limitItems;
    
    const tasks = await Task.find(find).limit(pagination.limitItems).skip(pagination.skip).sort(sort);
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