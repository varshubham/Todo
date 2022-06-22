import TodoContext from "./TodoContext";
import { useState } from "react";

const TodoState = (props) =>{
    const host = "http://localhost:5000"
    const todoinitial =[]
    const [todos,setTodos]=useState(todoinitial)

    const getTodos=async ()=>{

        const response = await fetch(`${host}/api/todo/fetchall`,{
            method:'GET',
            headers:{
                'auth-token':localStorage.getItem('token')
            }
          
        });
       const json = await response.json();
        console.log(json)     
        setTodos(json)   
    }

    //add a todo
    const addTodo=async (todo,edate,tag)=>{

        const response = await fetch(`${host}/api/todo/add`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({todo,edate,tag})
        });
        const todoo = await response.json();
        setTodos(todos.concat(todoo))
    }

     //delete a todo
     const deleteTodo = async (id)=>{

        const response = await fetch(`${host}/api/todo/delete/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            }
        });
        const json=response.json()
        console.log(json)

        console.log("deleting the note"+id);
        const newTodos=todos.filter((todo)=>{return todo._id!==id});
        setTodos(newTodos)
    }

    //edit a todo
    const editTodo = async (id,todo,edate,tag,completed,cdate)=>{
        
        const response = await fetch(`${host}/api/todo/update/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({todo,edate,tag,completed,cdate})
        });
        const json = response.json()
        console.log(json)
       
        let newTodos = JSON.parse(JSON.stringify(todos))
    
        for (let index=0; index<newTodos.length; index++){
            if(newTodos[index]._id ===id){
                newTodos[index].todo = todo;
                newTodos[index].edate = edate;
                newTodos[index].tag = tag;
                newTodos[index].completed = completed;
                newTodos[index].cdate = cdate;
                break;
            }
        }
        setTodos(newTodos)
    }

    return(
        <TodoContext.Provider value={{todos,setTodos,addTodo,deleteTodo,editTodo,getTodos}}>
                {props.children}
        </TodoContext.Provider>
    );
}

export default TodoState