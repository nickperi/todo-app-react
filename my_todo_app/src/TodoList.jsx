import {Link} from 'react-router-dom'
import { BsCheckSquare } from "react-icons/bs";
import { BsCheckSquareFill } from "react-icons/bs";

function TodoList({todos, toggleTodo}) {

    function getTodoList() {
        return todos.map(todo => {
            if(todo.done) {
                return <li key={todo.id}> <button className='added' onClick={() => toggleTodo(todo.id)}><BsCheckSquareFill/></button> <Link to={`todos/${todo.id}`}>{todo.text} - Completed on {todo.date_completed}</Link></li>
            } else {
                return <li key={todo.id}> <button className='removed' onClick={() => toggleTodo(todo.id)}><BsCheckSquare/></button> <Link to={`todos/${todo.id}`}>{todo.text} - Due on {todo.date_due}</Link></li>
            }
        });
    }

    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {getTodoList()}
            </ul>
        </div>
    );
}
export default TodoList;