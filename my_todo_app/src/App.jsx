import { use, useState } from 'react'
import { useEffect } from 'react'
import {Routes, Route, Router, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import SignUp from './SignUp.jsx';
import Login from './Login.jsx';
import TodoList from './TodoList.jsx';
import AddTodo from './AddTodo.jsx';
import TodoDetail from './TodoDetail.jsx';
import './App.css';
import TodosByDueDate from './TodosByDueDate.jsx';
import Calendar from './Calendar.jsx';
import CustomTodoList from './CustomTodoList.jsx';

function App() {
  const [todos, setTodos] = useState([]);
  const [todosByDateCreated, setTodosByDateCreated] = useState([]);
  const [todosByDateDue, setTodosByDateDue] = useState([]);
  const [todosDueOnDate, setTodosDueOnDate] = useState([]);
  const [customTodos, setCustomTodos] = useState([]);

  const [isEditing, setEditing] = useState(false);
  const [isEditingCategory, setEditingCategory] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {

      fetch('https://projectflaskmvc.onrender.com/api/todos', {headers: {
            'Content-Type': 'application/json', // Crucial for indicating JSON content
          },
          credentials: 'include'
      })
    .then(response => {
      if(!response.ok) {
        navigate('/login');
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    })
    .then(data => {
      data.map(todo => {
        todo.isEditable = false;
        todo.isCategoryEditable = false;
        todo.syncStatus = 'synced';
      });

      setTodos(data);
      if(navigator.online) {
        saveData('myDatabase', 'todos', data, 1); 
      }
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);

      if(navigator.online)
        navigate('/login');
    });

    if(!navigator.online) {
      getData("myDatabase", "todos")
      .then((data) => {
          console.log("Retrieved data:", data);
          setTodos(data[0]);
        });
    }
  }, [todos]);



  async function saveData(dbName, storeName, data, key) {
    return new Promise( (resolve, reject) => {

      const request = indexedDB.open(dbName, 3);

      request.onerror = (e) => {
        reject(`Database error: ${e.target.errorCode}`);
      };

      request.onupgradeneeded = (e) => {
        const db = e.target.result;

        if(!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      };

      request.onsuccess = (e) => {
        const db = e.target.result;
        const transaction = db.transaction([storeName], 'readwrite');

        transaction.onerror = (e) => {
          reject(`Transaction error: ${e.target.errorCode}`);
        };

        transaction.oncomplete = () => {
          resolve('Data saved successfully!');
        };

        const objectStore = transaction.objectStore(storeName);

        const putRequest = objectStore.put(data, key);

        putRequest.onerror = (e) => {
           reject(`Error saving data: ${e.target.errorCode}`);
        };

        putRequest.onsuccess = () => {
          // Data successfully added to the object store
        };

      };
    });
  }


function getData(dbName, storeName) {
  return new Promise((resolve, reject) => {
    // Open the database
    const request = indexedDB.open(dbName);

    request.onerror = (event) => {
      reject("Error opening database: " + event.target.errorCode);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;

      // Start a read-only transaction
      const transaction = db.transaction([storeName], "readonly");
      const objectStore = transaction.objectStore(storeName);

      // Request all data from the object store
      const getAllRequest = objectStore.getAll();

      getAllRequest.onerror = (event) => {
        reject("Error retrieving data: " + event.target.errorCode);
      };

      getAllRequest.onsuccess = (event) => {
        resolve(event.target.result); // Resolve with the retrieved data
      };

      // Handle transaction completion (optional, but good practice)
      transaction.oncomplete = () => {
        db.close(); // Close the database connection
      };

      transaction.onabort = () => {
        reject("Transaction aborted.");
      };
    };
  });
}



  const addTodo = (todo) => {
    todo.isEditable = false;
    todo.isCategoryEditable = false;
    todo.syncStatus = 'added';
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        credentials: 'include',
        body: JSON.stringify(todo) // Convert the JavaScript object to a JSON string
    };

    fetch('https://projectflaskmvc.onrender.com/api/todos', options)
      .then(response => {
        if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

        if(response.status === 401) {
              navigate('/login');
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
    todo.syncStatus = 'toggled';
    setTodos(todosCopy);
    setTodosByDateCreated(todosCopy);
    setTodosByDateDue(todosCopy);
    setTodosDueOnDate(todosCopy);
    setCustomTodos(todosCopy);

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


  function disableEditing(id) {
    const todosCopy = [...todos];
    const todo = todosCopy.find(t => t.id === parseInt(id));
    todo.isEditable = false;
    setTodos(todosCopy);
    setEditing(false);
  }


  function enableCategoryDropdown(id) {
    const todosCopy = [...todos];
    const todo = todosCopy.find(t => t.id === parseInt(id));
    todo.isCategoryEditable = true;
    setTodos(todosCopy);
    setEditingCategory(true);
  }

  function disableCategoryDropdown(id) {
    const todosCopy = [...todos];
    const todo = todosCopy.find(t => t.id === parseInt(id));
    todo.isCategoryEditable = false;
    setTodos(todosCopy);
    setEditingCategory(false);
  }


  function updateTitle(id, newTitle) {

      fetch(`https://projectflaskmvc.onrender.com/todos/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        credentials: 'include',
        body: JSON.stringify({ text: newTitle }), // Send only the updated title
      }).then(response => { 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }   
        
        if(response.status === 401) {
          navigate('/login');
        }
        return response.json();
      }).then(data => {
        console.log('Title updated successfully:', data); 
      }).catch(error => {
        console.error('Error updating title:', error);      
      });  
  }


  function updateCategory(id, newCategory) {

      fetch(`https://projectflaskmvc.onrender.com/todos/${id}/change-category`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json',},
        credentials: 'include',
        body: JSON.stringify({ category: newCategory }), // Send only the updated title
      }).then(response => { 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }     
        
        if(response.status === 401) {
          navigate('/login');
        }
        return response.json();
      }).then(data => {
        console.log('Category updated successfully:', data); 
      }).catch(error => {
        console.error('Error updating category:', error);      
      });  

  }


  function saveTitle(id, newTitle) {
    const todosCopy = [...todos];
    const todo = todosCopy.find(t => t.id === parseInt(id));
    todo.text = newTitle;
    console.log("New title: ", newTitle);
    todo.isEditable = false;
    todo.syncStatus = 'updated-title';
    setTodos(todosCopy);
    setEditing(false);
    
    // Here you would also want to update the backend about the change
    updateTitle(id, newTitle);
  }


  function saveCategory(id, newCategory) {
    const todosCopy = [...todos];
    const todo = todosCopy.find(t => t.id === parseInt(id));
    todo.category = newCategory;
    console.log("New category: ", newCategory);
    todo.isCategoryEditable = false;
    todo.syncStatus = 'updated-category';
    setTodos(todosCopy);
    setEditingCategory(false);
    
    // Here you would also want to update the backend about the change
    updateCategory(id, newCategory);
  }



 const addUser = (user) => {
    const options = {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    };

    fetch('https://projectflaskmvc.onrender.com/api/students', options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Assuming the server responds with JSON
      })
      .then(data => {
        console.log(data);
        navigate('/login');
      })
      .catch(error => {
        console.error('Error:', error);
      });
 };


  const loginUser = (user) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Crucial for indicating JSON content
        },
        credentials: 'include',
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
        <Route path="/" element={<CustomTodoList todos={todos} toggleTodo={toggleTodo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory} disableEditing={disableEditing} disableCategoryDropdown={disableCategoryDropdown} isEditing={isEditing} isEditingCategory={isEditingCategory}/>} />
        <Route path="/todos" element={<TodoList todos={todos} toggleTodo={toggleTodo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory}  disableEditing={disableEditing} disableCategoryDropdown={disableCategoryDropdown} isEditing={isEditing} isEditingCategory={isEditingCategory} />}/>
        <Route path="/todos/:id" element={<TodoDetail todos={todos}/>} />
        <Route path="/add-todo/:date_due" element={<AddTodo addTodo={addTodo}/>} />
        <Route path="/add-todo" element={<AddTodo addTodo={addTodo}/>} />
        <Route path="/sign-up" element={<SignUp addUser={addUser} />} />
        <Route path="/login" element={<Login loginUser={loginUser} />} />
        <Route path="/todos-due-on/:date_due" element={<TodosByDueDate todos={todos} toggleTodo={toggleTodo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory} disableEditing={disableEditing} disableCategoryDropdown={disableCategoryDropdown} isEditing={isEditing} isEditingCategory={isEditingCategory}/>} />
        <Route path="/todos-calendar" element={<Calendar/>} />
      </Routes>
    </div>
  );
}
export default App;
