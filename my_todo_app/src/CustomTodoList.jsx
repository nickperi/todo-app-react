import {useState} from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import TodoItem from './TodoItem';
import { FaChartArea, FaRegCalendarDays } from "react-icons/fa6";
import { FaPlus } from 'react-icons/fa';

function CustomTodoList({todos, toggleTodo, enableEditing, enableCategoryDropdown, saveTitle, saveCategory, disableEditing, disableCategoryDropdown, isEditing, isEditingCategory, }) {
    const [sort, setSort] = useState(localStorage.getItem('sort') || '');
    const [categoryFilter, setCategory] = useState(localStorage.getItem('categoryFilter') || '');
    const [dateDue, setDateDue] = useState(localStorage.getItem('dateDue') || '');
    const [statusFilter, setStatus] = useState(localStorage.getItem('statusFilter') || '');
    const [filteredTasks, setFilteredTasks] = useState(todos);
    const navigate = useNavigate();

    function TodoListItems({todos}) {
        return <ul>
                    {todos.length > 0 ? todos.map(todo => {
                        return <TodoItem todo={todo} toggleTodo={toggleTodo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory} disableEditing={disableEditing} disableCategoryDropdown={disableCategoryDropdown} isEditing={isEditing} isEditingCategory={isEditingCategory}/>
                    }) : <span>No Tasks</span>}
                </ul>;
    }

    useEffect(() => {
        handleApply();
    }, [todos, sort, categoryFilter, dateDue, statusFilter]);


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
        }
        
        else if(categoryFilter !== '' && dateDue !== '' && statusFilter !== '') {
            filteredTodos = filterTodosByCategory(todos, categoryFilter);
            filteredTodos = filterTodosByDueDate(filteredTodos, dateDue);
            filteredTodos = filterTodosByStatus(filteredTodos, statusFilter);
            setFilteredTasks(filteredTodos);
        }

        else if(sort !== '' && dateDue !== '' && statusFilter !== '') {
            sortedTodos = sortTodos(todos, sort);
            filteredTodos = filterTodosByCategory(sortedTodos, categoryFilter);
            filteredTodos = filterTodosByStatus(filteredTodos, statusFilter);
            setFilteredTasks(filteredTodos);
        }

        else if(sort !== '' && categoryFilter !== '' && dateDue !== '') {
            sortedTodos = sortTodos(todos, sort);
            filteredTodos = filterTodosByCategory(sortedTodos, categoryFilter);
            filteredTodos = filterTodosByDueDate(filteredTodos, dateDue);
            setFilteredTasks(filteredTodos);
        }

        else if(sort !== '' && categoryFilter !== '' && statusFilter !== '') {
            sortedTodos = sortTodos(todos, sort);
            filteredTodos = filterTodosByCategory(sortedTodos, categoryFilter);
            filteredTodos = filterTodosByStatus(filteredTodos, statusFilter);
            setFilteredTasks(filteredTodos);
        }

        else if (sort !== '' && categoryFilter !== '') {
            sortedTodos = sortTodos(todos, sort);
            filteredTodos = filterTodosByCategory(sortedTodos, categoryFilter);
            setFilteredTasks(filteredTodos);
        }

        else if(sort !== '' && dateDue !== '') {
            sortedTodos = sortTodos(todos, sort);
            filteredTodos = filterTodosByDueDate(sortedTodos, dateDue);
            setFilteredTasks(filteredTodos);
        }

        else if(sort !== '' && statusFilter !== '') {
            sortedTodos = sortTodos(todos, sort);
            filteredTodos = filterTodosByStatus(sortedTodos, statusFilter);
            setFilteredTasks(filteredTodos);
        }

        else if(categoryFilter !== '' && dateDue !== '') {
            filteredTodos = filterTodosByCategory(todos, categoryFilter);
            filteredTodos = filterTodosByDueDate(filteredTodos, dateDue);
            setFilteredTasks(filteredTodos);
        }

        else if(categoryFilter !== '' && statusFilter !== '') {
            filteredTodos = filterTodosByCategory(todos, categoryFilter);
            filteredTodos = filterTodosByStatus(filteredTodos, statusFilter);
            setFilteredTasks(filteredTodos);
        }

        else if(dateDue !== '' && statusFilter !== '') {
            filteredTodos = filterTodosByDueDate(todos, dateDue);
            filteredTodos = filterTodosByStatus(filteredTodos, statusFilter);
            setFilteredTasks(filteredTodos);
        }

        else if(sort !== '') {
            sortedTodos = sortTodos(todos, sort);
            setFilteredTasks(sortedTodos);
        }

        else if(categoryFilter !== '') {
            filteredTodos = filterTodosByCategory(todos, categoryFilter);
            setFilteredTasks(filteredTodos);
        }

        else if(dateDue !== '') {
            filteredTodos = filterTodosByDueDate(todos, dateDue);
            setFilteredTasks(filteredTodos);
        }

        else if(statusFilter !== '') {
            filteredTodos = filterTodosByStatus(todos, statusFilter);
            setFilteredTasks(filteredTodos);
        }

        else {
             setFilteredTasks(todos);
        }
    };


    return (
        <div>
            
            <button className='option' onClick={() => navigate('/add-todo')}>Add To-do <FaPlus /></button> &nbsp;
            <button className='option' onClick={() => navigate('/todos-calendar')}>My Calendar <FaRegCalendarDays /></button> &nbsp;
            <button className='option' onClick={() => navigate('/todo-stats')}>View Stats <FaChartArea /></button>
            <br></br><br></br>
            
            <label htmlFor="sort">Sort Todos by: </label>
            <select name="sort" id="sort" value={sort} onChange={(e) => {setSort(e.target.value); localStorage.setItem('sort', e.target.value); }}>
                <option value="">Select</option>
                <option value="date-due">Date Due</option>
                <option value="date-created">Date Created</option>
            </select>
            <br></br>

            <label htmlFor="date-filter">Select Date Due: </label>
            <input name='date-filter' type="date" value={dateDue} onChange={(e) => {setDateDue(e.target.value); localStorage.setItem('dateDue', e.target.value);}}></input>
            <br></br>

            <label htmlFor="category-filter">Select Category: </label>
            <select name="category-filter" value={categoryFilter} onChange={(e) => {setCategory(e.target.value); localStorage.setItem('categoryFilter', e.target.value); }}>
                <option value="">Any</option>
                <option value="job application">Job Application</option>
                <option value="work">Work</option>
                <option value="school">School</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="urgent">Urgent</option>
                <option value="reminder">Reminder</option>
                <option value="other">Other</option>  
            </select>
            <br></br>

            <label htmlFor="status-filter">Select status: </label>
            <select name='status-filter' value={statusFilter} onChange={(e) => {setStatus(e.target.value); localStorage.setItem('statusFilter', e.target.value); }}>
                <option value="">Any</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
                <option value="overdue">Overdue</option>
            </select>
            <br></br>

            <button onClick={handleApply}>Apply</button>

            <h1>Todo List</h1>
            <br/><br/>
    
            <div style={{ display: "flex", flexDirection:'column', alignItems:'center', margin: "auto"}}><TodoListItems todos={filteredTasks}/></div>

        </div>
    );
}
export default CustomTodoList;