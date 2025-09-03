import {Link} from 'react-router-dom'
import { BsCheckSquare } from "react-icons/bs";
import { BsCheckSquareFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import {useState} from 'react';
import { Navigate } from 'react-router-dom';

function TodoList({todos, todosByDateCreated, todosByDateDue, toggleTodo, enableEditing, saveTitle, isLoggedIn}) {
    const [filter, setFilter] = useState('all');

const handleBlur = (id, e) => {
    saveTitle(id, e.target.innerText);
}

    function getTodoList(filter) {
        if(filter === 'date-due') {
            return todosByDateDue.map(todo => {
                if(todo.done) {
                    return <li key={todo.id}> <button className='added' onClick={() => toggleTodo(todo.id)}><BsCheckSquareFill/></button> <Link to={`todos/${todo.id}`}>{todo.text} - Completed on {todo.date_completed}</Link> <button>Edit Title</button></li>
                } else {
                    return <li key={todo.id}> <button className='removed' onClick={() => toggleTodo(todo.id)}><BsCheckSquare/></button> <Link to={`todos/${todo.id}`}>{todo.text} - Due on {todo.date_due}</Link> <button>Edit Title</button></li>
                }
            });
        }

        if(filter === 'date-created') {
            return todosByDateCreated.map(todo => {
                if(todo.done) {
                    return <li key={todo.id}> <button className='added' onClick={() => toggleTodo(todo.id)}><BsCheckSquareFill/></button> <Link to={`todos/${todo.id}`}>{todo.text} - Completed on {todo.date_completed}</Link> <button>Edit Title</button></li>
                }  else {
                    return <li key={todo.id}> <button className='removed' onClick={() => toggleTodo(todo.id)}><BsCheckSquare/></button> <Link to={`todos/${todo.id}`}>{todo.text} - Due on {todo.date_due}</Link> <button>Edit Title</button></li>
                }
            });
        }

        if(filter === 'all') {
            return todos.map(todo => {
                if(todo.done) {

                    if(todo.isEditable) {
                        return <li key={todo.id}> 
                        <div>
                            <button className='added' onClick={() => toggleTodo(todo.id)}><BsCheckSquareFill/></button> 
                            <span contentEditable={todo.isEditable}> {todo.text}</span> 
                            <span>Completed on {todo.date_completed}</span> 
                            <button onClick={(e) => saveTitle(todo.id, e.target.value)}>Save</button> 
                            <Link to={`todos/${todo.id}`}>View</Link>
                        </div>
                    </li>
                    } 
                    
                    else {
                         return <li key={todo.id}> 
                        <div>
                            <button className='added' onClick={() => toggleTodo(todo.id)}><BsCheckSquareFill/></button> 
                            <span contentEditable={todo.isEditable}>{todo.text}</span> 
                            <span>Completed on {todo.date_completed}</span> <button onClick={() => enableEditing(todo.id)}>Edit Title</button> 
                            <Link to={`todos/${todo.id}`}>View</Link>
                        </div>
                    </li>
                    }

                } else {

                    if(todo.isEditable) {
                         return <li key={todo.id}> 
                    <div>
                        <button className='removed' onClick={() => toggleTodo(todo.id)}><BsCheckSquare/></button> 
                        <span contentEditable={todo.isEditable}>{todo.text}</span> 
                        <span>Due on {todo.date_due}</span> 
                        <button onClick={(e) => saveTitle(todo.id, e.target.value)}>Save</button> 
                        <Link to={`todos/${todo.id}`}>View</Link>
                    </div> 
                    </li>
                    } 
                    
                    else {
                         return <li key={todo.id}> 
                    <div>
                        <button className='removed' onClick={() => toggleTodo(todo.id)}><BsCheckSquare/>
                        </button> <span contentEditable={todo.isEditable}>{todo.text}</span> 
                        <span>Due on {todo.date_due}</span> <button onClick={() => enableEditing(todo.id)}>Edit Title</button> 
                        <Link to={`todos/${todo.id}`}>View</Link>
                    </div> 
                    </li>
                    }
                   
                }               
        });
        }
        return null;
    }

    if(!isLoggedIn) {
        return <Navigate to="/login" replace/>;
    }


    return (
        <div>
            <label htmlFor="filter">Filter Todos: </label>
            <select name="filter" id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="date-due">Sort by Date Due</option>
                <option value="date-created">Sort by Date Created</option>
            </select>

            <h1>Todo List</h1>
            <Link id="add-todo-link" to="/add-todo"><button><FaPlus/> Add To-do</button></Link>
            <br/><br/>
            <ul>
                {getTodoList(filter)}
            </ul>
        </div>
    );
}
export default TodoList;