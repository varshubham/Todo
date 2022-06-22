import React, { useContext, useState  } from 'react'
import TodoContext from '../Context/todo/TodoContext';
import Alert from './Alert';

const Addnote = () => {
    const context = useContext(TodoContext);
    const [show,setShow] = useState(false)
    const { addTodo } = context;
    const [todo, setTodo] = useState({ todo: "", edate: "", tag: "Personal" })
    const handleclick = (e) => {
        e.preventDefault();
        addTodo(todo.todo, todo.edate, todo.tag)
        setShow(true)
        setTimeout(() => {
            setShow(false)
        }, 1500);
        document.getElementById('form').reset()
    }
    const onChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value })
    }
    const alerts = {
        type:"success",
        msg:"Todo Added Successfully"
    }
    
    return (
        <>
        {show && <Alert alert={alerts}/>}
        <div className="container my-3" style={{width:"60%"}}>
            <h1>Add a Todo</h1>
            <form id='form'>
                <div className="mb-3">
                    <label htmlFor="todo" className="form-label">Todo</label>
                    <input type="text" className="form-control" id="todo" name='todo' onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="edate" className="form-label">Last Date of Todo</label>
                    <input type="date" className="form-control" id="edate" name='edate' onChange={onChange} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="tag" className='form-label d-block'>Tag</label>
                    <select id='tag' name='tag' defaultValue={'Personal'} style={{width:"200px",textAlign:"center"}} onChange={onChange}>
                        <option value="Personal">Personal</option>
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleclick}>Submit</button>
            </form>
        </div>
        </>
    )
}

export default Addnote