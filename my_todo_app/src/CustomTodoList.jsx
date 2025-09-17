import {useState} from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import TodoItem from './TodoItem';
import { FaRegCalendarDays } from "react-icons/fa6";

function CustomTodoList({fetchTodos, todos, toggleTodo, enableEditing, enableCategoryDropdown, saveTitle, saveCategory, isEditing, isEditingCategory, }) {
    const [sort, setSort] = useState('date-due');
    const [categoryFilter, setCategory] = useState('personal');
    const [dateDue, setDateDue] = useState('2025-09-16');
    const [statusFilter, setStatus] = useState('pending');
    const navigate = useNavigate();

    useEffect(() => {
         fetchTodos(`https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}&category=${categoryFilter}&date_due=${dateDue}&status=${statusFilter}`);
    });

    function TodoListItems({sort, categoryFilter, dateDue, statusFilter}) {
        
        const url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}&category=${categoryFilter}&date-due=${dateDue}&status=${statusFilter}`;
        console.log(url);

        return todos.map(todo => {
            return <TodoItem todo={todo} key={todo.id} toggleTodo={toggleTodo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory} isEditing={isEditing} isEditingCategory={isEditingCategory}/>;
        });
    }


    return (
        <div>
            <label htmlFor="sort">Sort Todos by: </label>
            <select name="sort" id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="all">Select</option>
                <option value="date-due">Date Due</option>
                <option value="date-created">Date Created</option>
            </select>

            <label htmlFor="date-filter">Select Date Due: </label>
            <input name='date-filter' type="date" value={dateDue} onChange={(e) => setDateDue(e.target.value)}></input>

            <label htmlFor="category-filter">Select Category: </label>
            <select name="category-filter" value={categoryFilter} onChange={(e) => setCategory(e.target.value)}>
                <option value="job application">Job Application</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="urgent">Urgent</option>
                <option value="reminder">Reminder</option>
                <option value="other">Other</option>  
            </select>

            <label htmlFor="status-filter">Select status: </label>
            <select name='status-filter' value={statusFilter} onChange={(e) => setStatus(e.target.value)}>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
                <option value="pending">Pending</option>
            </select>

            <br></br><br></br>
            <button className='view-calendar' onClick={() => navigate('/todos-calendar')}>Go to Calendar <FaRegCalendarDays /></button>

            <h1>Todo List</h1>
            <br/><br/>
    
            <div style={{ display: "grid", gap: "1rem", maxWidth: "400px", margin: "auto", overflowAnchor: 'none'}}><TodoListItems sort={sort} categoryFilter={categoryFilter} dateDue={dateDue} statusFilter={statusFilter} /></div>

        </div>
    );
}
export default CustomTodoList;