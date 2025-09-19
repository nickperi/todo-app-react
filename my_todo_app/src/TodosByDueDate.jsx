import { use } from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import { FaPlus } from 'react-icons/fa';

function TodosByDueDate({todos, toggleTodo, enableEditing, enableCategoryDropdown, saveTitle, saveCategory, disableEditing, disableCategoryDropdown, isEditing, isEditingCategory}) {
    const {date_due} = useParams();
    const todosDue = todos.filter(todo => todo.date_due === date_due);

    function TodoItems({todos}) {
        if(todos.length > 0) {
            return todos.map(todo => {
                return <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory} disableEditing={disableEditing} disableCategoryDropdown={disableCategoryDropdown} isEditing={isEditing} isEditingCategory={isEditingCategory}/>
            });
        }
        else {
            return (<p>No Tasks</p>);
        }
    }

    return (
        <>
            <div>
               <h2>Tasks</h2>
               <Link id="add-todo-link" to={`/add-todo/${date_due}`}><button className='add-todo'><FaPlus/> Add To-do</button></Link>
               <br></br>
               <TodoItems todos={todosDue}/>
             </div>
        </>
    );
}

export default TodosByDueDate;