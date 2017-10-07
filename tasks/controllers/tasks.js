const Task = require ('../models/tasks')
save = (req, res)=>{
    if(!req.body.title) return res.json({isValid:false, message: 'Title is required!'})
    if(!req.body.description) return res.json({isValid:false, message: 'Description is required!'})
    Task.save(req.body, (err,data)=>{
        if(err) return res.json({isValid:false, message:'Erro!'})
        res.json({isValid:true, data:data})
    })



}
getID = (req, res)=>{
    Task.getID(req.params.id,(err,data)=>{
        if(err) return res.json({isValid:false, message:'Erro!'})
        res.json({isValid:true, data:data})
    })

}
getAll = (req, res) =>{
    Task.getAll((err,data)=>{
        if(err) return res.json({isValid:false, message:'Erro!'})
        res.json({isValid:true, data:data})
    })
}
remove = (req, res) =>{
    Task.remove(req.params.id,(err, data)=>{
        if(err) return res.json({isValid:false, message:'Erro!'})
            console.log('opa', data.result)
        if(data.result.n === 0)return res.json({isValid:false, message:'Task não encontrada!'})
            res.json({isValid:true, data:data})
    })
}



module.exports = { save, getID, getAll, remove}