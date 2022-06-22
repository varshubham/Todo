const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Todos = require('../models/Todos')
const { body, validationResult } = require('express-validator');


//Route 1 : get all the todos using : Get 


router.get('/fetchall',fetchuser, async (req,res)=>{
    try{
    const todos = await Todos.find({user:req.user.id})
    res.json(todos)
    }catch(error){
        res.status(500).send("Internal Server error")
    }
})

//route 2 : add a todo: post
router.post('/add',fetchuser,[
    body('todo','Enter a valid todo').isLength({min:5}),
    body('edate','Must be date').isDate()
],async (req,res)=>{
    try{
    const {todo,edate,tag} = req.body
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const todos = new Todos({
        todo,edate,tag,user:req.user.id
    })
    const savedTodo = await todos.save();

    res.json(savedTodo)
}catch(error){
    res.status(500).send("Internal Server error")
}
})

// route 3 : update a existing user
router.put('/update/:id',fetchuser,async (req,res)=>{
    try{
    const {todo,edate,tag,completed,cdate} = req.body;
    const newTodo = {}
    if(todo){newTodo.todo = todo}
    if(edate){newTodo.edate = edate}
    if(tag){newTodo.tag = tag};
    newTodo.completed = completed
    newTodo.cdate = cdate
    
    
    //find the todo to be updated and update it
    let todos =await Todos.findById(req.params.id)
    if(!todos){return res.status(404).send("Not found")}

    if(todos.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed")
    }
    todos = await Todos.findByIdAndUpdate(req.params.id,{$set:newTodo},{new:true})
    res.json({todos})
}catch(error){
    res.status(500).send("Internal Server error")
}
})

// route 4: deleting a todo
router.delete('/delete/:id',fetchuser,async (req,res)=>{
    try{
        // find the todo to be delete and delete it
        let todos = await Todos.findById(req.params.id);
        if(!todos){return res.status(404).send("Not found")}
        
        if (todos.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        todos = await Todos.findByIdAndDelete(req.params.id);
        res.json({"Success":"Todo has been deleted",todo:todos})
    }catch(error){
        res.status(500).send("Internal Server error")
    }
})
module.exports = router