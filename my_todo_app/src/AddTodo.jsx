import {useState} from 'react';
import {useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const AddTodo = ({addTodo}) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('personal');
    const {date_due} = useParams();
    const [dueDate, setDueDate] = useState(date_due);
    const [dueTime, setDueTime] = useState('');
    const [taskCommand, setCommand] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const todo = {text:title, category:category, date_due:dueDate, time_due:dueTime};  
        addTodo(todo);
        //setTitle('');
        //setCategory('personal');
        //setDueDate('');
        //setDueTime('');
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleDateChange = (event) => {  
        setDueDate(event.target.value);
    };

    const handleTimeChange = (event) => {
        setDueTime(event.target.value);
    };

    const handleCommandChange = (event) => {
        setCommand(event.target.value);
    };

    const fetchCommandDetails = () => {
        fetch('https://projectflaskmvc.onrender.com/parse-todo', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            credentials: 'include',
            body: JSON.stringify({'command': taskCommand})
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setTitle(data.task_title);
            setCategory(data.category);
            setDueDate(data.date_due);
            setDueTime(data.time_due);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    return (
    <div>
        <h1>Add Todo</h1>
        <label htmlFor='task-command'>Enter task command: </label>
        <input name='task-command' type="text" value={taskCommand} onChange={handleCommandChange}></input>
        <button onClick={fetchCommandDetails}>Enter</button>

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Enter Title:</label>
                <input
                    id="title" 
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Todo title"
                />
            </div>
            
            <div>
                <label htmlFor="category">Select Category:</label>
                <select id="category" name="category" value={category} onChange={handleCategoryChange}>
                    <option value="job application">Job Application</option>
                    <option value="work">Work</option>
                    <option value="school">School</option>
                    <option value="personal">Personal</option>
                    <option value="shopping">Shopping</option>
                    <option value="urgent">Urgent</option>
                    <option value="reminder">Reminder</option>
                    <option value="other">Other</option>    
                </select>
            </div>
            
            <div>
                <label htmlFor="due-date">Enter Date Due:</label>
                <input 
                    id="due-date"
                    type="date"
                    value={dueDate}
                    onChange={handleDateChange}
                    placeholder="Date Due"
                />      
            </div>
           
            <div>
                <label htmlFor="due-time">Enter Time Due:</label>
                <input 
                    id="due-time"
                    type="time"
                    value={dueTime}
                    onChange={handleTimeChange}
                    placeholder="Time Due"
                />
            </div>

            <button type="submit">Add Todo</button>
           
        </form>

    </div>);
};
export default AddTodo;