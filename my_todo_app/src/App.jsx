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
import TodosByDueDate from './TodosByDueDate.jsx';

function App() {
  const [todos, setTodos] = useState([]);
  const [todosByDateCreated, setTodosByDateCreated] = useState([]);
  const [todosByDateDue, setTodosByDateDue] = useState([]);
  const [todosDueOnDate, setTodosDueOnDate] = useState([]);
  const [students, setStudents] = useState([]);

  const [isEditing, setEditing] = useState(false);
  const [isEditingCategory, setEditingCategory] = useState(false);

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
        todo.isCategoryEditable = false;
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
        todo.isCategoryEditable = false;
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
        todo.isCategoryEditable = false;
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
    todo.isEditable = false;
    todo.isCategoryEditable = false;
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
    setTodosByDateCreated(todosCopy);
    setTodosByDateDue(todosCopy);
    setTodosDueOnDate(todosCopy);

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


  function enableEditingDC(id) {
    const todosByDateCreatedCopy = [...todosByDateCreated];
    const todoByDateCreated = todosByDateCreatedCopy.find(t => t.id === parseInt(id));
    todoByDateCreated.isEditable = true;
    setTodosByDateCreated(todosByDateCreatedCopy);
    setEditing(true);
  }

  function enableEditingDD(id) {
    const todosByDateDueCopy = [...todosByDateDue];
    const todoByDateDue = todosByDateDueCopy.find(t => t.id === parseInt(id));
    todoByDateDue.isEditable = true;
    setTodosByDateDue(todosByDateDueCopy);
    setEditing(true);
  }


  function enableCategoryDropdown(id) {
    const todosCopy = [...todos];
    const todo = todosCopy.find(t => t.id === parseInt(id));
    todo.isCategoryEditable = true;
    setTodos(todosCopy);
    setEditingCategory(true);
  }



  function enableCategoryDropdownDC(id) {
    const todosByDateCreatedCopy = [...todosByDateCreated];
    const todoByDateCreated = todosByDateCreatedCopy.find(t => t.id === parseInt(id));
    todoByDateCreated.isCategoryEditable = true;
    setTodosByDateCreated(todosByDateCreatedCopy);
    setEditingCategory(true);
  }


  function enableCategoryDropdownDD(id) {
    const todosByDateDueCopy = [...todosByDateDue];
    const todoByDateDue = todosByDateDueCopy.find(t => t.id === parseInt(id));
    todoByDateDue.isCategoryEditable = true;
    setTodosByDateDue(todosByDateDueCopy);
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



   function saveTitleDC(id, newTitle) {
    const todosByDateCreatedCopy = [...todosByDateCreated];
    const todoByDateCreated = todosByDateCreatedCopy.find(t => t.id === parseInt(id));
    todoByDateCreated.text = newTitle;
    console.log("New title: ", newTitle);
    todoByDateCreated.isEditable = false;
    setTodosByDateCreated(todosByDateCreatedCopy);
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


  function saveTitleDD(id, newTitle) {
    const todosByDateDueCopy = [...todosByDateDue];
    const todoByDateDue = todosByDateDueCopy.find(t => t.id === parseInt(id));
    todoByDateDue.text = newTitle;
    console.log("New title: ", newTitle);
    todoByDateDue.isEditable = false;
    setTodosByDateDue(todosByDateDueCopy);
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



  function saveCategoryDC(id, newCategory) {
    const todosByDateCreatedCopy = [...todosByDateCreated];
    const todoByDateCreated = todosByDateCreatedCopy.find(t => t.id === parseInt(id));
    todoByDateCreated.category = newCategory;
    console.log("New category: ", newCategory);
    todoByDateCreated.isCategoryEditable = false;
    setTodosByDateCreated(todosByDateCreatedCopy);
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


  function saveCategoryDD(id, newCategory) {
    const todosByDateDueCopy = [...todosByDateDue];
    const todoByDateDue = todosByDateDueCopy.find(t => t.id === parseInt(id));
    todoByDateDue.category = newCategory;
    console.log("New category: ", newCategory);
    todoByDateDue.isCategoryEditable = false;
    setTodosByDateDue(todosByDateDueCopy);
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
          <Route path="/" element={<TodoList todos={todos} todosByDateCreated={todosByDateCreated} todosByDateDue={todosByDateDue} toggleTodo={toggleTodo} enableEditing={enableEditing} enableEditingDC={enableEditingDC} enableEditingDD={enableEditingDD} enableCategoryDropdown={enableCategoryDropdown} enableCategoryDropdownDC={enableCategoryDropdownDC} enableCategoryDropdownDD={enableCategoryDropdownDD} saveTitle={saveTitle} saveTitleDC={saveTitleDC} saveTitleDD={saveTitleDD} saveCategory={saveCategory} saveCategoryDC={saveCategoryDC} saveCategoryDD={saveCategoryDD} isEditing={isEditing} isEditingCategory={isEditingCategory} isLoggedIn={isLoggedIn} />}/>
          <Route path="/todos/:id" element={<TodoDetail todos={todos} isLoggedIn={isLoggedIn}/>} />
          <Route path="/add-todo" element={<AddTodo addTodo={addTodo} isLoggedIn={isLoggedIn}/>} />
          <Route path="/login" element={<Login loginUser={loginUser} />} />
          <Route path="/todos-due-on/:date_due" element={<TodosByDueDate todos={todos} toggleTodo={toggleTodo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory} isEditing={isEditing} isEditingCategory={isEditingCategory}/>} />
      </Routes>
    </div>
  );
}
export default App;
