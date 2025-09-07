import { use, useState } from 'react'
import { useEffect } from 'react'
import {Routes, Route, Router, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import Login from './Login.jsx';
import TodoList from './TodoList.jsx';
import AddTodo from './AddTodo.jsx';
import TodoDetail from './TodoDetail.jsx';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [todosByDateCreated, setTodosByDateCreated] = useState([]);
  const [todosByDateDue, setTodosByDateDue] = useState([]);
  const [students, setStudents] = useState([]);
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(token?true:false);
  const navigate = useNavigate();


  useEffect(() => {
    fetch('https://projectflaskmvc.onrender.com/api/todos', {headers: {
            'Content-Type': 'application/json', // Crucial for indicating JSON content
            "Authorization": `Bearer ${token}`}})
    .then(response => {
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      data.forEach(todo => {
        todo.isEditable = false;
      });
      setTodos(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      navigate('/login');
    });
  }, []);




  useEffect(() => {
    
    fetch('https://projectflaskmvc.onrender.com/api/todos/sort-by-date-created', {headers: {
            'Content-Type': 'application/json', // Crucial for indicating JSON content
            "Authorization": `Bearer ${token}`}})
    .then(response => {
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      data.forEach(todo => {
        todo.isEditable = false;
      });
      setTodosByDateCreated(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      navigate('/login');
    });
  }, []);
  
  
  useEffect(() => {

    fetch('https://projectflaskmvc.onrender.com/api/todos/sort-by-date-due', {headers: {
            'Content-Type': 'application/json', // Crucial for indicating JSON content
            "Authorization": `Bearer ${token}`}})
    .then(response => {
      if(!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      data.forEach(todo => {
        todo.isEditable = false;
      });
      setTodosByDateDue(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      navigate('/login');
    });
  }, []);



  useEffect(() => {
    fetch('https://projectflaskmvc.onrender.com/api/students')
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
      navigate('/login');
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

    fetch('https://projectflaskmvc.onrender.com/api/todos', options)
      .then(response => {
        if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Assuming the server responds with JSON
        })
        .then(data => {
            console.log(data);
            setTodos([...todos, data.todo]); // Append the new todo to the existing list
            navigate('/');
            window.location.reload();
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
    const todosByDateCreatedCopy = [...todosByDateCreated];
    const todosByDateDueCopy = [...todosByDateDue];

    const todo = todosCopy.find(t => t.id === parseInt(id));
    const todoByDateCreated = todosByDateCreatedCopy.find(t => t.id === parseInt(id));
    const todoByDateDue = todosByDateDueCopy.find(t => t.id === parseInt(id));

    todo.isEditable = true;
    todoByDateCreated.isEditable = true;
    todoByDateDue.isEditable = true;

    setTodos(todosCopy);
    setTodosByDateCreated(todosByDateCreatedCopy);
    setTodosByDateDue(todosByDateDueCopy);
  }



  function saveTitle(id, newTitle) {
    const todosCopy = [...todos];
    const todo = todosCopy.find(t => t.id === parseInt(id));

    const todosByDateCreatedCopy = [...todosByDateCreated];
    const todoByDateCreated = todosByDateCreatedCopy.find(t => t.id === parseInt(id));

    const todosByDateDueCopy = [...todosByDateDue];
    const todoByDateDue = todosByDateDueCopy.find(t => t.id === parseInt(id));

    todo.text = newTitle;
    todoByDateCreated.title = newTitle;
    todoByDateDue.title = newTitle;
    console.log("New title: ", newTitle);
    todo.isEditable = false;
    todoByDateCreated.isEditable = false;
    todoByDateDue.isEditable = false;
    setTodos(todosCopy);
    setTodosByDateCreated(todosByDateCreatedCopy);
    setTodosByDateDue(todosByDateDueCopy);
    
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

    const todosByDateCreatedCopy = [...todosByDateCreated];
    const todoByDateCreated = todosByDateCreatedCopy.find(t => t.id === parseInt(id));

    const todosByDateDueCopy = [...todosByDateDue];
    const todoByDateDue = todosByDateDueCopy.find(t => t.id === parseInt(id));

    todo.category = newCategory;
    todoByDateCreated.category = newCategory;
    todoByDateDue.category = newCategory;
    console.log("New category: ", todo.category);
    
    setTodos(todosCopy);
    setTodosByDateCreated(todosByDateCreatedCopy);
    setTodosByDateDue(todosByDateDueCopy);
    
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



  const loginUser = (user) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Crucial for indicating JSON content
        },
        body: JSON.stringify(user) // Convert the JavaScript object to a JSON string
    };

    fetch('https://projectflaskmvc.onrender.com/api/login', options)
      .then(response => {
        if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Assuming the server responds with JSON
        })
        .then(data => {
            console.log(data);
            sessionStorage.setItem('token', data.access_token);
            setToken(data.access_token);
            setIsLoggedIn(true);
            navigate('/');
            window.location.reload();
        })
        .catch(error => {
            console.error('Error:', error);
        });
      
  }


  return (
    <div>
      
      <Routes>
          <Route path="/" element={<TodoList todos={todos} todosByDateCreated={todosByDateCreated} todosByDateDue={todosByDateDue} toggleTodo={toggleTodo} enableEditing={enableEditing} saveTitle={saveTitle} saveCategory={saveCategory} isLoggedIn={isLoggedIn} />}/>
          <Route path="/todos/:id" element={<TodoDetail todos={todos} isLoggedIn={isLoggedIn}/>} />
          <Route path="/add-todo" element={<AddTodo addTodo={addTodo} isLoggedIn={isLoggedIn}/>} />
          <Route path="/login" element={<Login loginUser={loginUser} />} />
      </Routes>
    </div>
  );
}
export default App;
