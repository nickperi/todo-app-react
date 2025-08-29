import { use, useState } from 'react'
import { useEffect } from 'react'
import {Routes, Route, Router, Link } from 'react-router-dom';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { useParams } from 'react-router-dom';
import Login from './Login.jsx';
import TodoList from './TodoList.jsx';
import AddTodo from './AddTodo.jsx';
import TodoDetail from './TodoDetail.jsx';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/todos')
    .then(response => {
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setTodos(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, []);


    useEffect(() => {
    fetch('http://127.0.0.1:5000/api/students')
    .then(response => {
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setStudents(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, []);

  const addTodo = (todo) => {
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Crucial for indicating JSON content
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(todo) // Convert the JavaScript object to a JSON string
    };

    fetch('http://127.0.0.1:5000/api/todos', options)
      .then(response => {
        if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Assuming the server responds with JSON
        })
        .then(data => {
            console.log(data);
            setTodos([...todos, data.todo]); // Append the new todo to the existing list
        })
        .catch(error => {
            console.error('Error:', error);
        });
      
  }

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

    fetch('http://127.0.0.1:5000/todos/'+id+'/check', options)
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

  const loginUser = (user) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Crucial for indicating JSON content
        },
        body: JSON.stringify(user) // Convert the JavaScript object to a JSON string
    };

    fetch('http://127.0.0.1:5000/api/login', options)
      .then(response => {
        if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Assuming the server responds with JSON
        })
        .then(data => {
            console.log(data);
            localStorage.setItem('token', data.access_token);
            setIsLoggedIn(true);
        })
        .catch(error => {
            console.error('Error:', error);
        });
      
  }


  return (
    <div>
      
      <Routes>
          <Route path="/" element={<TodoList todos={todos} toggleTodo={toggleTodo} />}/>
          <Route path="/todos/:id" element={<TodoDetail todos={todos}/>} />
          <Route path="/add-todo" element={<AddTodo addTodo={addTodo} />} />
          <Route path="/login" element={<Login loginUser={loginUser} />} />
      </Routes>
    </div>
  );
}
export default App;
