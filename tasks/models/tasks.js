const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title : String,
    description : String,
    created:{ type: Date, default : new Date()}
})
const taskModel = mongoose.model('task',taskSchema)

save = (task, callback) =>{
    var newTask = new taskModel(task)
    newTask.save(callback)
}
getAll = (callback) =>{
    taskModel.find().sort({created:-1}).exec(callback)
}
getID = (id, callback) =>{
    taskModel.findById(id).exec(callback)
}
remove = (id, callback) => {
    taskModel.remove({_id: id}).exec(callback)
}
module.exports = { save, getAll, getID,remove}