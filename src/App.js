import Navbar from "./Components/Navbar";
import TodoState from "./Context/todo/TodoState";
import Home from "./Components/Home"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import AddTodo from "./Components/AddTodo"
import Todos from "./Components/Todos";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <TodoState>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/archive' element={<Todos archive={true}/>}/>
            <Route path='/add' element={<AddTodo/>} />
            <Route path='/today' element={<Todos today={true} />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </Router>
      </TodoState>
    </>
  );
}

export default App;
