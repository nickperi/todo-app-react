import {Link} from 'react-router-dom'
import { BsCheckSquare } from "react-icons/bs";
import { BsCheckSquareFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { FaInfoCircle } from "react-icons/fa";
import {useState} from 'react';
import { Navigate } from 'react-router-dom';

function TodoList({todos, todosByDateCreated, todosByDateDue, toggleTodo, enableEditing, saveTitle, isLoggedIn}) {
    const [filter, setFilter] = useState('all');

    const IconWithCaption = ({IconComponent, caption}) => {
        return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconComponent />
          <span style={{ marginLeft: '8px' }}>{caption}</span>
        </div>
        );
    };

    function getTodoItem(todo) {
        if(todo.done) {
              if(todo.isEditable) {
                    return <tr key={todo.id}> 
                            <td><button className='added' onClick={() => toggleTodo(todo.id)}><BsCheckSquareFill/></button>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td><span contentEditable={todo.isEditable} onBlur={(e) => {saveTitle(todo.id, e.currentTarget.textContent)}}>{todo.text}</span>&nbsp;&nbsp;</td>
                            <td><button className='confirm'><GiConfirmed/></button>&nbsp;&nbsp;</td>
                            <td><span>Completed on {todo.date_completed}</span>&nbsp;&nbsp;</td>
                            <td><Link to={`todos/${todo.id}`}><FaInfoCircle/></Link></td>
                        </tr>
                    }

                else {
                        return <tr key={todo.id}> 
                            <td><button className='added' onClick={() => toggleTodo(todo.id)}><BsCheckSquareFill/></button>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td><span contentEditable={todo.isEditable}>{todo.text}</span>&nbsp;&nbsp;</td>
                            <td><button className='edit' onClick={() => enableEditing(todo.id)}><MdEdit/></button>&nbsp;&nbsp; </td>
                            <td><span> Completed on {todo.date_completed}</span>&nbsp;&nbsp;</td>
                            <td><Link to={`todos/${todo.id}`}><FaInfoCircle/></Link></td>
                        </tr>
                    }
        }

        else {
                if(todo.isEditable) {
                    return <tr key={todo.id}> 
                        <td><button className='removed' onClick={() => toggleTodo(todo.id)}><BsCheckSquare/></button>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td><span contentEditable={todo.isEditable} onBlur={(e) => saveTitle(todo.id, e.target.textContent)}>{todo.text}</span>&nbsp;&nbsp;</td>
                        <td><button className='confirm'><GiConfirmed/></button>&nbsp;&nbsp;</td>
                        <td><span>Due on {todo.date_due}</span>&nbsp;&nbsp;</td>
                        <td><Link to={`todos/${todo.id}`}><FaInfoCircle/></Link></td>
                    </tr>
                    } 
                    
                    else {
                         return <tr key={todo.id}> 
                        <td><button className='removed' onClick={() => toggleTodo(todo.id)}><BsCheckSquare/></button>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td><span contentEditable={todo.isEditable}>{todo.text}</span>&nbsp;&nbsp;</td>
                         <td><button className='edit' onClick={() => enableEditing(todo.id)}><MdEdit/></button>&nbsp;&nbsp;</td>
                        <td><span>Due on {todo.date_due}</span> &nbsp;&nbsp;</td>
                        <td><Link to={`todos/${todo.id}`}><FaInfoCircle/></Link></td>
                    </tr>
                    }
        }
    }

    function getTodoList(filter) {
        if(filter === 'date-due') {
            return todosByDateDue.map(todo => {
               return getTodoItem(todo);
            });
        }

        if(filter === 'date-created') {
            return todosByDateCreated.map(todo => {
                return getTodoItem(todo);
            });
        }

        if(filter === 'all') {
            return todos.map(todo => {
                return getTodoItem(todo);
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
            <table>
                <thead>
                    <th>Mark as Done &nbsp;&nbsp;&nbsp;&nbsp;</th>
                    <th>Title</th>
                    <th>Edit Title&nbsp;&nbsp;&nbsp;&nbsp;</th>
                    <th>Date Due / Completed</th>
                    <th>View</th>
                </thead>

                <tbody>{getTodoList(filter)}</tbody>
            </table>
        </div>
    );
}
export default TodoList;