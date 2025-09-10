import { use } from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function TodosByDueDate() {
    const { date_due } = useParams();
    const [todos, setTodos] = useState([]);
    const [dateDue, setDateDue] = useState(null);
    const [token, setToken] = useState(sessionStorage.getItem('token'));
    const navigate = useNavigate();

    const handleDateChange = (e) => {
        setDateDue(e.target.value);
    };

    useEffect(() => {
        const date = new Date(date_due);
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        const dateString = `${year}_${month}_${day}`;
        console.log(dateString);

        fetch(`https://projectflaskmvc.onrender.com/api/todos/${dateString}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json', // Crucial for indicating JSON content
            "Authorization": `Bearer ${token}`},
        })
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            data.forEach(todo => {
            todo.isEditable = false;
            todo.isCategoryEditable = false;
        });

        setTodos(data);
        })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        navigate('/login');
        });
    }, []);

    function getTodos() {
        if(todos.length > 0) {
            return (
                <ul>
                    {todos.map((item) => (
                        <li key={item.id}>{item.text}</li>
                    ))}
                </ul> 
            );
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
               {getTodos()}
             </div>
        </>
    );
}

export default TodosByDueDate;