import {useState} from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import TodoItem from './TodoItem';
import { FaRegCalendarDays } from "react-icons/fa6";

function CustomTodoList({todos, toggleTodo, enableEditing, enableCategoryDropdown, saveTitle, saveCategory, disableEditing, disableCategoryDropdown, isEditing, isEditingCategory, }) {
    const [sort, setSort] = useState(localStorage.getItem('sort') || '');
    const [categoryFilter, setCategory] = useState(localStorage.getItem('categoryFilter') || '');
    const [dateDue, setDateDue] = useState(localStorage.getItem('dateDue') || '');
    const [statusFilter, setStatus] = useState(localStorage.getItem('statusFilter') || '');
    const [filteredTasks, setFilteredTasks] = useState(todos);
    const navigate = useNavigate();

    function TodoListItems({todos}) {
        return todos.map(todo => {
            return <TodoItem todo={todo} key={todo.id} toggleTodo={toggleTodo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory} disableEditing={disableEditing} disableCategoryDropdown={disableCategoryDropdown} isEditing={isEditing} isEditingCategory={isEditingCategory}/>;
        });
    }

    useEffect(() => {
        handleApply();
    }, [sort, categoryFilter, dateDue, statusFilter]);

    function sortTodos(todos, sort) {
        let sortedTodos = [];
        if(sort === 'date-due') {
           sortedTodos = todos.toSorted((a, b) => new Date(b.date_due).getTime() - new Date(a.date_due).getTime());
        }

        else {
           sortedTodos = todos.toSorted((a, b) => new Date(a.date_created).getTime() - new Date(b.date_created).getTime());
        }
        return sortedTodos;
    }

    function filterTodosByCategory(todos, category) {
        let filteredTodos = [];
        if(category !== '') {
            filteredTodos = todos.filter(todo => {
                return todo.category === category;
            });
        }
        return filteredTodos;
    }

    function filterTodosByDueDate(todos, dateDue) {
        let filteredTodos = [];
        if(dateDue !== '') {
            filteredTodos = todos.filter(todo => {
                return todo.date_due === dateDue
            });
        }
        return filteredTodos;
    }

    function filterTodosByStatus(todos, status) {
        const today = new Date();
        let filteredTodos = [];

        if(status === 'completed') {
            filteredTodos = todos.filter(todo => {
                return todo.done === true
            });
        }
        else if(status === 'incomplete') {
            filteredTodos = todos.filter(todo => {
                const day = new Date(todo.date_due);
                return todo.done === false && day > today
            });
        }
        else {
            filteredTodos = todos.filter(todo => {
                const day = new Date(todo.date_due);
                return todo.done === false && day <= today
            });
        }
        return filteredTodos;
    }

    const handleApply = () => {
        let url;
        let sortedTodos;
        let filteredTodos;

        if (sort !== '' && categoryFilter !== '' && dateDue !== '' && statusFilter !== '')  {
            sortedTodos = sortTodos(todos, sort);
            filteredTodos = filterTodosByCategory(sortedTodos, categoryFilter);
            filteredTodos = filterTodosByDueDate(filteredTodos, dateDue);
            filteredTodos = filterTodosByStatus(filteredTodos, statusFilter);
            setFilteredTasks(filteredTodos);
            //url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}&category=${categoryFilter}&date_due=${dateDue}&status=${statusFilter}`;
        }
        
        else if(categoryFilter !== '' && dateDue !== '' && statusFilter !== '') {
            filteredTodos = filterTodosByCategory(todos, categoryFilter);
            filteredTodos = filterTodosByDueDate(filteredTodos, dateDue);
            filteredTodos = filterTodosByStatus(filteredTodos, statusFilter);
            setFilteredTasks(filteredTodos);
           //url = `https://projectflaskmvc.onrender.com/custom-todos?category=${categoryFilter}&date_due=${dateDue}&status=${statusFilter}`;
        }

        else if(sort !== '' && dateDue !== '' && statusFilter !== '') {
            sortedTodos = sortTodos(todos, sort);
            filteredTodos = filterTodosByCategory(sortedTodos, categoryFilter);
            filteredTodos = filterTodosByStatus(filteredTodos, statusFilter);
            setFilteredTasks(filteredTodos);
            //url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}&date_due=${dateDue}&status=${statusFilter}`;
        }

        else if(sort !== '' && categoryFilter !== '' && dateDue !== '') {
            sortedTodos = sortTodos(todos, sort);
            filteredTodos = filterTodosByCategory(sortedTodos, categoryFilter);
            filteredTodos = filterTodosByDueDate(filteredTodos, dateDue);
            setFilteredTasks(filteredTodos);
            //url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}&category=${categoryFilter}&date_due=${dateDue}`;
        }

        else if(sort !== '' && categoryFilter !== '' && statusFilter !== '') {
            sortedTodos = sortTodos(todos, sort);
            filteredTodos = filterTodosByCategory(sortedTodos, categoryFilter);
            filteredTodos = filterTodosByStatus(filteredTodos, statusFilter);
            setFilteredTasks(filteredTodos);
           //url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}&category=${categoryFilter}&status=${statusFilter}`;
        }

        else if (sort !== '' && categoryFilter !== '') {
            sortedTodos = sortTodos(todos, sort);
            filteredTodos = filterTodosByCategory(sortedTodos, categoryFilter);
            setFilteredTasks(filteredTodos);
            //url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}&category=${categoryFilter}`;
        }

        else if(sort !== '' && dateDue !== '') {
            sortedTodos = sortTodos(todos, sort);
            filteredTodos = filterTodosByDueDate(sortedTodos, dateDue);
            setFilteredTasks(filteredTodos);
            //url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}&date_due=${dateDue}`;
        }

        else if(sort !== '' && statusFilter !== '') {
            sortedTodos = sortTodos(todos, sort);
            filteredTodos = filterTodosByStatus(sortedTodos, statusFilter);
            setFilteredTasks(filteredTodos);
            //url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}&status=${statusFilter}`;
        }

        else if(categoryFilter !== '' && dateDue !== '') {
            filteredTodos = filterTodosByCategory(todos, categoryFilter);
            filteredTodos = filterTodosByDueDate(filteredTodos, dateDue);
            setFilteredTasks(filteredTodos);
            //url = `https://projectflaskmvc.onrender.com/custom-todos?category=${categoryFilter}&date_due=${dateDue}`;
        }

        else if(categoryFilter !== '' && statusFilter !== '') {
            filteredTodos = filterTodosByCategory(todos, categoryFilter);
            filteredTodos = filterTodosByStatus(filteredTodos, statusFilter);
            setFilteredTasks(filteredTodos);
            //url = `https://projectflaskmvc.onrender.com/custom-todos?category=${categoryFilter}&status=${statusFilter}`;
        }

        else if(dateDue !== '' && statusFilter !== '') {
            filteredTodos = filterTodosByDueDate(todos, dateDue);
            filteredTodos = filterTodosByStatus(filteredTodos, statusFilter);
            setFilteredTasks(filteredTodos);
            //url = `https://projectflaskmvc.onrender.com/custom-todos?date_due=${dateDue}&status=${statusFilter}`;
        }

        else if(sort !== '') {
            sortedTodos = sortTodos(todos, sort);
            setFilteredTasks(sortedTodos);
          //url = `https://projectflaskmvc.onrender.com/custom-todos?sort=${sort}`;
        }

        else if(categoryFilter !== '') {
            filteredTodos = filterTodosByCategory(todos, categoryFilter);
            setFilteredTasks(filteredTodos);
           //url = `https://projectflaskmvc.onrender.com/custom-todos?category=${categoryFilter}`;
        }

        else if(dateDue !== '') {
            filteredTodos = filterTodosByDueDate(todos, dateDue);
            setFilteredTasks(filteredTodos);
            //url = `https://projectflaskmvc.onrender.com/custom-todos?date_due=${dateDue}`;
        }

        else if(statusFilter !== '') {
            filteredTodos = filterTodosByStatus(todos, statusFilter);
            setFilteredTasks(filteredTodos);
            //url = `https://projectflaskmvc.onrender.com/custom-todos?status=${statusFilter}`;
        }

        else {
             setFilteredTasks(todos);
            //url = `https://projectflaskmvc.onrender.com/custom-todos`;
        }

        //fetchTodos(url);
    };


    return (
        <div>
            <label htmlFor="sort">Sort Todos by: </label>
            <select name="sort" id="sort" value={sort} onChange={(e) => {setSort(e.target.value); localStorage.setItem('sort', e.target.value); }}>
                <option value="">Select</option>
                <option value="date-due">Date Due</option>
                <option value="date-created">Date Created</option>
            </select>

            <label htmlFor="date-filter">Select Date Due: </label>
            <input name='date-filter' type="date" value={dateDue} onChange={(e) => {setDateDue(e.target.value); localStorage.setItem('dateDue', e.target.value);}}></input>

            <label htmlFor="category-filter">Select Category: </label>
            <select name="category-filter" value={categoryFilter} onChange={(e) => {setCategory(e.target.value); localStorage.setItem('categoryFilter', e.target.value); }}>
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
            <select name='status-filter' value={statusFilter} onChange={(e) => {setStatus(e.target.value); localStorage.setItem('statusFilter', e.target.value); }}>
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
    
            <div style={{ display: "grid", gap: "1rem", maxWidth: "400px", margin: "auto", overflowAnchor: 'none'}}><TodoListItems todos={filteredTasks}/></div>

        </div>
    );
}
export default CustomTodoList;