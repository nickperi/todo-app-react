import {useState} from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import TodoItem from './TodoItem';
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaPlus, FaSortAlphaDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";

function TodoList({todos, todosByDateCreated, todosByDateDue, toggleTodo, enableEditing, enableEditingDC, enableEditingDD, enableCategoryDropdown, enableCategoryDropdownDC, enableCategoryDropdownDD, saveTitle, saveTitleDC, saveTitleDD, saveCategory, saveCategoryDC, saveCategoryDD, disableEditing, disableEditingDC, disableEditingDD, disableCategoryDropdown, disableCategoryDropdownDC, disableCategoryDropdownDD, isEditing, isEditingCategory}) {
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    function TodoListItems({filter}) {
        
        if(filter === 'date-due') {
            return todosByDateDue.map(todo => {
               return <TodoItem todo={todo} key={todo.id} toggleTodo={toggleTodo} enableEditing={enableEditingDD} enableCategoryDropdown={enableCategoryDropdownDD} saveTitle={saveTitleDD} saveCategory={saveCategoryDD} disableEditing={disableEditingDD} disableCategoryDropdown={disableCategoryDropdownDD} isEditing={isEditing} isEditingCategory={isEditingCategory}/>;
            });
        }

        if(filter === 'date-created') {
            return todosByDateCreated.map(todo => {
                return <TodoItem todo={todo} key={todo.id} toggleTodo={toggleTodo} enableEditing={enableEditingDC} enableCategoryDropdown={enableCategoryDropdownDC} saveTitle={saveTitleDC} saveCategory={saveCategoryDC} disableEditing={disableEditingDC} disableCategoryDropdown={disableCategoryDropdownDC} isEditing={isEditing} isEditingCategory={isEditingCategory}/>;
            });
        }

        if(filter === 'all') {
            return todos.map(todo => {
                return <TodoItem todo={todo} key={todo.id} toggleTodo={toggleTodo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory} disableEditing={disableEditing} disableCategoryDropdown={disableCategoryDropdown} isEditing={isEditing} isEditingCategory={isEditingCategory}/>;
        });
        }
        return null;
    }


    return (
        <div>
            <label htmlFor="filter">Filter Todos: </label>
            <select name="filter" id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="date-due">Sort by Date Due</option>
                <option value="date-created">Sort by Date Created</option>
            </select>

            <br></br><br></br>
            <button className='add-todo' onClick={() => navigate('/add-todo')}>Add To-do <FaPlus /></button>
            <button className='view-calendar' onClick={() => navigate('/todos-calendar')}>Go to Calendar <FaRegCalendarDays /></button>
            <button className='view-calendar' onClick={() => navigate('/custom-todos')}>Sort & Filter Todos <FaSortAlphaDown /> <FaFilter/></button>

            <h1>Todo List</h1>
            <br/><br/>
    
            <div style={{ display: "grid", gap: "1rem", maxWidth: "400px", margin: "auto", overflowAnchor: 'none'}}><TodoListItems filter={filter}/></div>

        </div>
    );
}
export default TodoList;