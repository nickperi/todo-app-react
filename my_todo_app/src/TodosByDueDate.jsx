import { use } from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TodoItem from './TodoItem';

function TodosByDueDate({todos, toggleTodo, enableEditing, enableCategoryDropdown, saveTitle, saveCategory, isEditing, isEditingCategory}) {
    const {date_due} = useParams();

    const todosDue = todos.filter(todo => todo.date_due === date_due);

    /*const handleDateChange = (e) => {
        setDateDue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getTodosDueOnDate(dateDue);
    };*/

    function TodoItems({todos}) {
        if(todos.length > 0) {
            return todos.map(todo => {
                return <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory} isEditing={isEditing} isEditingCategory={isEditingCategory}/>
            });
        }
        else {
            return (<p>No Tasks</p>);
        }
    }

    return (
        <>
            {/*<form onSubmit={handleSubmit}>
                <label htmlFor="date-input">Enter date</label>
                <input name="date-input" type="date" placeholder="Enter date" onChange={handleDateChange}></input>
                <button type="submit">Search</button>
            </form>*/}

            <div>
               <h2>Tasks</h2>
               <TodoItems todos={todosDue}/>
             </div>
        </>
    );
}

export default TodosByDueDate;