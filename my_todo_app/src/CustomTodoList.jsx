import {useState} from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import TodoItem from './TodoItem';
import { FaRegCalendarDays } from "react-icons/fa6";

function CustomTodoList({fetchTodos, todos, toggleTodo, enableEditing, enableCategoryDropdown, saveTitle, saveCategory, isEditing, isEditingCategory, }) {
    const [sort, setSort] = useState('');
    const [categoryFilter, setCategory] = useState('');
    const [dateDue, setDateDue] = useState('');
    const [statusFilter, setStatus] = useState('');
    const navigate = useNavigate();

    function TodoListItems({todos}) {
        return todos.map(todo => {
            return <TodoItem todo={todo} key={todo.id} toggleTodo={toggleTodo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory} isEditing={isEditing} isEditingCategory={isEditingCategory}/>;
        });
    }

    const handleApply = () => {
        let url;

        if (sort !== '' && categoryFilter !== '' && dateDue !== '' && statusFilter !== '')  {
            url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}&category=${categoryFilter}&date_due=${dateDue}&status=${statusFilter}`;
        }
        
        else if(categoryFilter !== '' && dateDue !== '' && statusFilter !== '') {
           url = `https://projectflaskmvc.onrender.com/custom-todos?category=${categoryFilter}&date_due=${dateDue}&status=${statusFilter}`;
        }

        else if(sort !== '' && dateDue !== '' && statusFilter !== '') {
            url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}&date_due=${dateDue}&status=${statusFilter}`;
        }

        else if(sort !== '' && categoryFilter !== '' && dateDue !== '') {
            url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}&category=${categoryFilter}&date_due=${dateDue}`;
        }

        else if(sort !== '' && categoryFilter !== '' && statusFilter !== '') {
           url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}&category=${categoryFilter}&status=${statusFilter}`;
        }

        else if (sort !== '' && categoryFilter !== '') {
            url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}&category=${categoryFilter}`;
        }

        else if(sort !== '' && dateDue !== '') {
            url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}&date_due=${dateDue}`;
        }

        else if(sort !== '' && statusFilter !== '') {
            url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}&status=${statusFilter}`;
        }

        else if(categoryFilter !== '' && dateDue !== '') {
            url = `https://projectflaskmvc.onrender.com/custom-todos?category=${categoryFilter}&date_due=${dateDue}`;
        }

        else if(categoryFilter !== '' && statusFilter !== '') {
            url = `https://projectflaskmvc.onrender.com/custom-todos?category=${categoryFilter}&status=${statusFilter}`;
        }

        else if(dateDue !== '' && statusFilter !== '') {
            url = `https://projectflaskmvc.onrender.com/custom-todos?date_due=${dateDue}&status=${statusFilter}`;
        }

        else if(sort !== '') {
          url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}`;
        }

        else if(categoryFilter !== '') {
           url = `https://projectflaskmvc.onrender.com/custom-todos?category=${categoryFilter}`;
        }

        else if(dateDue !== '') {
            url = `https://projectflaskmvc.onrender.com/custom-todos?date_due=${dateDue}`;
        }

        else if(statusFilter !== '') {
            url = `https://projectflaskmvc.onrender.com/custom-todos?status=${statusFilter}`;
        }

        else {
            url = `https://projectflaskmvc.onrender.com/custom-todos`;
        }

        fetchTodos(url);
    };


    return (
        <div>
            <label htmlFor="sort">Sort Todos by: </label>
            <select name="sort" id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Select</option>
                <option value="date-due">Date Due</option>
                <option value="date-created">Date Created</option>
            </select>

            <label htmlFor="date-filter">Select Date Due: </label>
            <input name='date-filter' type="date" value={dateDue} onChange={(e) => setDateDue(e.target.value)}></input>

            <label htmlFor="category-filter">Select Category: </label>
            <select name="category-filter" value={categoryFilter} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Any</option>
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
                <option value="">Any</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
                <option value="overdue">Overdue</option>
            </select>

            <button onClick={handleApply}>Apply</button>

            <br></br><br></br>
            <button className='view-calendar' onClick={() => navigate('/todos-calendar')}>Go to Calendar <FaRegCalendarDays /></button>

            <h1>Todo List</h1>
            <br/><br/>
    
            <div style={{ display: "grid", gap: "1rem", maxWidth: "400px", margin: "auto", overflowAnchor: 'none'}}><TodoListItems todos={todos}/></div>

        </div>
    );
}
export default CustomTodoList;