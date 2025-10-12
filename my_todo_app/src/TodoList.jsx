import {useState} from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import TodoItem from './TodoItem';
import { FaRegCalendarDays } from "react-icons/fa6";
import { FaPlus, FaSortAlphaDown } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";

function TodoList({todos, toggleTodo, enableEditing, enableCategoryDropdown, saveTitle, saveCategory, disableEditing, disableCategoryDropdown, isEditing, isEditingCategory}) {
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    function TodoListItems({}) {
        return <ul>
            {filter === 'all' && todos.map(todo => {
                return <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory} disableEditing={disableEditing} disableCategoryDropdown={disableCategoryDropdown} isEditing={isEditing} isEditingCategory={isEditingCategory}/>
            })}
            {filter === 'date-due' && [...todos].sort((a, b) => new Date(b.date_due) - new Date(a.date_due)).map(todo => {
                return <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory} disableEditing={disableEditing} disableCategoryDropdown={disableCategoryDropdown} isEditing={isEditing} isEditingCategory={isEditingCategory}/>
            })}
            {filter === 'date-created' && [...todos].sort((a, b) => new Date(a.date_created) - new Date(b.date_created)).map(todo => {
                return <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory} disableEditing={disableEditing} disableCategoryDropdown={disableCategoryDropdown} isEditing={isEditing} isEditingCategory={isEditingCategory}/>
            })}
        </ul>
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
            <button className='option' onClick={() => navigate('/add-todo')}>Add To-do <FaPlus /></button>
            <button className='option' onClick={() => navigate('/todos-calendar')}>Go to Calendar <FaRegCalendarDays /></button>
            <button className='option' onClick={() => navigate('/')}>Sort & Filter Todos <FaSortAlphaDown /> <FaFilter/></button>

            <h1>Todo List</h1>
            <br/><br/>
    
            <div style={{ display: "flex", gap: "1rem", maxWidth: "1000px", margin: "auto", overflowAnchor: 'none'}}><TodoListItems/></div>

        </div>
    );
}
export default TodoList;