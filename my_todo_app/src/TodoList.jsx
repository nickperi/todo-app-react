import {Link} from 'react-router-dom'
import { BsCheckSquare } from "react-icons/bs";
import { BsCheckSquareFill } from "react-icons/bs";
import {useState} from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function TodoList({todos, todosByDateCreated, todosByDateDue, toggleTodo, isLoggedIn}) {
    const [filter, setFilter] = useState('all');

    function getTodoList(filter) {
        if(filter === 'date-due') {
            return todosByDateDue.map(todo => {
                if(todo.done) {
                    return <li key={todo.id}> <button className='added' onClick={() => toggleTodo(todo.id)}><BsCheckSquareFill/></button> <Link to={`todos/${todo.id}`}>{todo.text} - Completed on {todo.date_completed}</Link></li>
                } else {
                    return <li key={todo.id}> <button className='removed' onClick={() => toggleTodo(todo.id)}><BsCheckSquare/></button> <Link to={`todos/${todo.id}`}>{todo.text} - Due on {todo.date_due}</Link></li>
                }
            });
        }

        if(filter === 'date-created') {
            return todosByDateCreated.map(todo => {
                if(todo.done) {
                    return <li key={todo.id}> <button className='added' onClick={() => toggleTodo(todo.id)}><BsCheckSquareFill/></button> <Link to={`todos/${todo.id}`}>{todo.text} - Completed on {todo.date_completed}</Link></li>
                }  else {
                    return <li key={todo.id}> <button className='removed' onClick={() => toggleTodo(todo.id)}><BsCheckSquare/></button> <Link to={`todos/${todo.id}`}>{todo.text} - Due on {todo.date_due}</Link></li>
                }
            });
        }

        if(filter === 'all') {
            return todos.map(todo => {
                if(todo.done) {
                    return <li key={todo.id}> <button className='added' onClick={() => toggleTodo(todo.id)}><BsCheckSquareFill/></button> <Link to={`todos/${todo.id}`}>{todo.text} - Completed on {todo.date_completed}</Link></li>
                } else {
                    return <li key={todo.id}> <button className='removed' onClick={() => toggleTodo(todo.id)}><BsCheckSquare/></button> <Link to={`todos/${todo.id}`}>{todo.text} - Due on {todo.date_due}</Link></li>
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
            <select name="filter" id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="date-due">Sort by Date Due</option>
                <option value="date-created">Sort by Date Created</option>
            </select>

            <h1>Todo List</h1>
            <ul>
                {getTodoList(filter)}
            </ul>
        </div>
    );
}
export default TodoList;