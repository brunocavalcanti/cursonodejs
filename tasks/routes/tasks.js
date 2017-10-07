const tasksController = require ('../controllers/tasks')

module.exports = (app)=>{
    app.post('/tasks', tasksController.save)
    app.get('/tasks', tasksController.getAll)
    app.get('/tasks/:id', tasksController.getID)
    app.delete('/tasks/:id', tasksController.remove)


}