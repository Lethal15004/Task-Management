//Router
const taskRoute=require('./task.route');
const userRoute=require('./user.route');

const authMiddleware = require('../../middleware/auth.middleware');
module.exports = (app)=>{
    app.use('/tasks',authMiddleware,taskRoute);
    app.use('/users',userRoute);
}