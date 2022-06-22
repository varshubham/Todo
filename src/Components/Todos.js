import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import TodoContext from '../Context/todo/TodoContext'
import Todoitem from './Todoitem'
import { useNavigate } from 'react-router-dom'

const Todos = (props) => {
    const navigate = useNavigate();
    const context = useContext(TodoContext)
    const ref = useRef(null)
    const refclose = useRef(null)
    const { todos, getTodos, editTodo } = context
    const [todo, setTodo] = useState({ id: "", etodo: "", eedate: "", etag: "" })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getTodos();
        }
        else {
            navigate('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addtodo = () => {
        navigate('/add')
    }

    const updatetodo = (currentTodo) => {
        ref.current.click();
        setTodo({ id: currentTodo._id, etodo: currentTodo.todo, eedate: currentTodo.edate, etag: currentTodo.tag })
    }

    const handleclick = () => {
        editTodo(todo.id, todo.etodo, todo.eedate, todo.etag,false)
        refclose.current.click()
    }

    const onChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value })
    }
    return (
        <>

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etodo" className="form-label">Todo</label>
                                    <input type="text" className="form-control" id="etodo" name='etodo' value={todo.etodo} aria-describedby="emailHelp" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eedate" className="form-label">Last Date of Todo</label>
                                    <input type="date" className="form-control" id="eedate" name='eedate' value={todo.eedate} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={todo.etag} onChange={onChange} />
                                </div>


                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleclick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row m-auto my-5' style={{width:"70%"}}>
                <div className='d-flex' style={{width:"100%",justifyContent:"space-between"}}>
                {(props.today) && <h2>Tasks Completed Today</h2>}
                {(!props.today) && <h2>Your Tasks</h2>}
                
                <button className='btn btn-primary' onClick={addtodo}>Add Task +</button>
                </div>
                {(props.archive) && (todos.length!==0) && todos.map((note)=>{
                    return (note.completed) && <Todoitem key={note._id} updatetodo={updatetodo} todo={note} />
                })}
                {(props.today) && (todos.length!==0) && todos.map((note)=>{
                    return (new Date(note.cdate).getDate() === new Date(Date.now()).getDate()) && (new Date(note.cdate).getMonth() === new Date(Date.now()).getMonth()) && (new Date(note.cdate).getFullYear() === new Date(Date.now()).getFullYear()) && <Todoitem key={note._id} updatetodo={updatetodo} todo={note} />
                })}
                {(!props.archive) && (!props.today) && (todos.length!==0) && todos.map((note) => {
                    return <Todoitem key={note._id} updatetodo={updatetodo} todo={note} />
                })}
            </div>
            {props.today &&  <div className='row m-auto my-5' style={{width:"70%"}}>
                <div className='d-flex' style={{width:"100%",justifyContent:"space-between"}}>
                {(props.today) && <h2>Today Due Tasks</h2>}
                <button className='btn btn-primary' onClick={addtodo}>Add Task +</button>
                </div>
                {(todos.length!==0) && todos.map((note)=>{
                    return (!note.completed) && (new Date(note.edate).getDate() === new Date(Date.now()).getDate()) && (new Date(note.edate).getMonth() === new Date(Date.now()).getMonth()) && (new Date(note.edate).getFullYear() === new Date(Date.now()).getFullYear()) && <Todoitem key={note._id} updatetodo={updatetodo} todo={note} />
                })}
                </div> }
        </>
    )
}

export default Todos
