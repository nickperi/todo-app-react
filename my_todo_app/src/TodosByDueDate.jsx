import { use } from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TodoItemDueOnDate from './TodoItemDueOnDate';

function TodosByDueDate({token}) {
    const navigate = useNavigate();
    const {date_due} = useParams();
    const [todos, setTodos] = useState([]);
    const [isEditing, setEditing] = useState(false);
    const [isEditingCategory, setEditingCategory] = useState(false);

     useEffect(() => {
        console.log(date_due);
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


    function toggleTodo(id) {
        const todosCopy = [...todos];
        const todo = todosCopy.find(t => t.id === parseInt(id));
        todo.done = !todo.done;
        setTodos(todosCopy);

        // Here you would also want to update the backend about the change
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', // Crucial for indicating JSON content     
            }
        }

        fetch('https://projectflaskmvc.onrender.com/todos/'+id+'/check', options)
        .then(response => {
            if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Assuming the server responds with JSON
            })
            .then(data => {
                console.log(data);
                const todosCopy = [...todos];
                const todo = todosCopy.find(t => t.id === parseInt(id));
                todo.done = data.done;
                todo.date_completed = data.date_completed;
                setTodos(todosCopy);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    function enableEditing(id) {
        const todosCopy = [...todos];
        const todo = todosCopy.find(t => t.id === parseInt(id));
        todo.isEditable = true;
        setTodos(todosCopy);
        setEditing(true);
    }

    function enableCategoryDropdown(id) {
        const todosCopy = [...todos];
        const todo = todosCopy.find(t => t.id === parseInt(id));
        todo.isCategoryEditable = true;
        setTodos(todosCopy);
        setEditingCategory(true);
    }


    function saveTitle(id, newTitle) {
        const todosCopy = [...todos];
        const todo = todosCopy.find(t => t.id === parseInt(id));
        todo.text = newTitle;
        console.log("New title: ", newTitle);
        todo.isEditable = false;
        setTodos(todosCopy);
        setEditing(false);
    
        // Here you would also want to update the backend about the change
        fetch(`https://projectflaskmvc.onrender.com/todos/${id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newTitle }), // Send only the updated title
        }).then(response => { 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }                       
        return response.json();
      }).then(data => {
        console.log('Title updated successfully:', data); 
      }).catch(error => {
        console.error('Error updating title:', error);      
      });  

    }

    function saveCategory(id, newCategory) {
        const todosCopy = [...todos];
        const todo = todosCopy.find(t => t.id === parseInt(id));
        todo.category = newCategory;
        console.log("New category: ", newCategory);
        todo.isCategoryEditable = false;
        setTodos(todosCopy);
        setEditingCategory(false);
    
        // Here you would also want to update the backend about the change
        fetch(`https://projectflaskmvc.onrender.com/todos/${id}/change-category`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ category: newCategory }), // Send only the updated title
        }).then(response => { 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }                       
            return response.json();
        }).then(data => {
            console.log('Category updated successfully:', data); 
        }).catch(error => {
            console.error('Error updating category:', error);      
      });  

    }

    /*const handleDateChange = (e) => {
        setDateDue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getTodosDueOnDate(dateDue);
    };*/

    function getTodos() {
        if(todos.length > 0) {
            return todos.map(todo => {
                return <TodoItemDueOnDate key={todo.id} todo={todo} toggleTodo={toggleTodo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory} isEditing={isEditing} isEditingCategory={isEditingCategory}/>
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