
import React, { useContext } from 'react'
import TodoContext from '../Context/todo/TodoContext'

const Todoitem = (props) => {
  const { todo, updatetodo } = props;
  const context = useContext(TodoContext)
  const { deleteTodo ,editTodo} = context
  var newdate = new Date(todo.edate)
  const dd = newdate.getDate();
  const mm = newdate.getMonth()+1;
  const yyyy = newdate.getFullYear();
  newdate = dd + "/" + mm + "/" + yyyy

  const completedtodo = ()=>{
    
    if(todo.completed){
       editTodo(todo._id, todo.todo, todo.edate, todo.tag ,false,null)
       console.log("false")
    }
    else if(!todo.completed)
    {
       editTodo(todo._id, todo.todo, todo.edate, todo.tag ,true,Date.now())
       console.log("true")
    }
  }

  return (
    <div className='col-md-3 m-auto' style={{ width: "90%" }}>
      <div className="card my-3" style={{ border: "2px solid blue" }}>
        <div className="card-body">
          <h5 className="card-title" style={{ fontWeight: "bold" }}>{todo.todo}</h5>
          <div className='d-flex' style={{ justifyContent: "space-between" }}>
            <p className="card-text">Due Date : {newdate}</p>
            {(new Date(Date.now()).getTime() > new Date(todo.edate).getTime()) && (new Date(Date.now()).getDate() > new Date(todo.edate).getDate()) && <p style={{ color: "red" }}>Due date  is over</p>}
            { (new Date(Date.now()).getDate() === new Date(todo.edate).getDate()) && (new Date(Date.now()).getMonth() === new Date(todo.edate).getMonth()) && (new Date(Date.now()).getFullYear() === new Date(todo.edate).getFullYear()) && <p style={{color:"red" }}>Due Today </p>}
          </div>
          <p style={{color : "blue"}}>{todo.tag}</p>
          <div className='d-flex' style={{ justifyContent: "space-between" }}>
            <div>
              <i style={{ cursor: "pointer" }} className="far fa-trash-alt mx-2" onClick={() => { deleteTodo(todo._id) }}></i>
              <i style={{ cursor: "pointer" }} className="far fa-edit mx-2" onClick={() => { updatetodo(todo) }}></i>
            </div>
            <div>
              <label htmlFor="completed">Completed :</label>
              <input type="checkbox" id='completed' className='mx-2' onClick={completedtodo}  defaultChecked={todo.completed ? true : false}   />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todoitem
