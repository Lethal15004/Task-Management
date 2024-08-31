const Task=require('../../model/task.model');
const User=require('../../model/user.model');
module.exports.index=async(req,res)=>{
    //Lọc theo trạng thái và tìm kiếm 
    const find={
        deleted:false
    }
    if(req.query.status){
        find.status=req.query.status;
    }
    if(req.query.keyword){
        const title=new RegExp(req.query.keyword,'i');
        find.title=title;
    }

    //Sắp xếp theo trường nào đó
    const sort={};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey]=req.query.sortValue;
    }

    //Phân trang
    const pagination={
        currentPage:1,
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

module.exports.changeStatus =async(req,res)=>{
    try {
        const ids=req.body.ids;
        const status=req.body.status;
        await Task.updateMany({_id:{$in:ids}},{status:status}); 
        res.json({message: 'Cập nhật dữ liệu thành công'});
    } catch (error) {
        res.json({message: 'Not Found'});
    }
}

module.exports.create=async(req,res)=>{
    const data=req.body;
    data.createdBy=req.user.id;
    if(req.body.listUser){
        for(const idUser of req.body.listUser){
            try {
                const user=await User.findOne({_id:idUser});
                if(!user){
                    res.json({
                        code:400,
                        message:`User không tồn tại`
                    })
                }
            } catch (error) {
                res.json({
                    code:400,
                    message:`User không tồn tại`
                })
            }
        }
    }
    const newTask= new Task(data);
    await newTask.save();
    res.json({
        message:'Tạo mới công việc thành công',
        task:newTask
    });
}

module.exports.edit=async(req, res)=>{
    try {
        const id =req.params.idTask;
        const dataChange=req.body;
        await Task.updateOne({_id:id},dataChange);
        res.json({message: 'Thay đổi dữ liệu thành công'});
    } catch (error) {
        res.json({message: 'Not Found'});
    }
}

module.exports.delete= async(req, res)=>{
    try {
        const ids=req.body.ids;
        await Task.updateMany({_id:{$in:ids}},{deleted:true});
        res.json({message: 'Xóa công việc thành công'});
    } catch (error) {
        res.json({message: 'Not Found'});
    }
}