import { use } from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TodoItemDueOnDate from './TodoItemDueOnDate';

function TodosByDueDate({todos, enableEditing, enableCategoryDropdown, saveTitle, saveCategory}) {
    const { date_due } = useParams();
    const [dateDue, setDateDue] = useState(null);
    const navigate = useNavigate();

    const handleDateChange = (e) => {
        setDateDue(e.target.value);
    };

    function getTodos() {
        if(todos.length > 0) {
            return todos.map(todo => {
                return <TodoItemDueOnDate key={todo.id} todo={todo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory}/>
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
               {getTodos()}
             </div>
        </>
    );
}

export default TodosByDueDate;