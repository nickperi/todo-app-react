import {Link} from 'react-router-dom'
import { BsCheckSquare } from "react-icons/bs";
import { BsCheckSquareFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { FaInfoCircle } from "react-icons/fa";
import {useState} from 'react';
import { Navigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';

function TodoList({todos, todosByDateCreated, todosByDateDue, toggleTodo, enableEditing, saveTitle, saveCategory, isLoggedIn}) {
    const [filter, setFilter] = useState('all');
    const itemRefs = useRef([]);
    const [currIndex, setIndex] = useState(-1);
    const [newTitle, setTitle] = useState('');
    const [isEditing, setEditing] = useState(false);

    const IconWithCaption = ({IconComponent, caption}) => {
        return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconComponent />
          <span style={{ marginLeft: '8px' }}>{caption}</span>
        </div>
        );
    };


    function TodoItem({todo}) {
        const [selectedCategory, setCategory] = useState(todo.category);
        const options = [
            {label:1, value:"job application"},
            {label:2, value:"work"},
            {label:3, value:"personal"},
            {label:4, value:"shopping"},
            {label:5, value:"urgent"},
            {label:6, value:"reminder"},
            {label:7, value:"other"}
        ]; 

        const changeCategory = (e) => {
            setCategory(e.target.value);
            saveCategory(todo.id, e.target.value);
        };

            return <>
                {todo.done ?
                    <tr key={todo.id}>
                        <td><button className='added' onClick={() => toggleTodo(todo.id)}><BsCheckSquareFill/></button>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td><span  ref={element => (itemRefs.current[todo.id-1] = element)} contentEditable={todo.isEditable} onBlur={(e) => {console.log(e.currentTarget.textContent); setTitle(e.currentTarget.textContent)}}>{todo.text}</span></td>
                        
                        <td>
                            <select value={selectedCategory} onChange={changeCategory} disabled>
                                {options.map((option) => (
                                    <option value={option.value}>{option.value}</option>
                                ))}
                            </select>
                        </td>
                        

                        {todo.isEditable ? 
                            (<td><button className='confirm' onClick = {() => handleSave(todo.id)}><GiConfirmed/></button></td>) : 
                            (<td><button className='edit' onClick = {() => handleEdit(todo.id)}><MdEdit/></button></td>)
                        }
                        
                    </tr> :
                    
                    <tr key={todo.id}>
                        <td><button className='removed' onClick={() => toggleTodo(todo.id)}><BsCheckSquareFill/></button>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td><span  ref={element => (itemRefs.current[todo.id-1] = element)} contentEditable={todo.isEditable} onBlur={(e) => {setTitle(e.currentTarget.textContent)}}>{todo.text}</span></td>
                        <td>
                            <select value={selectedCategory} onChange={changeCategory} disabled>
                                {options.map((option) => (
                                    <option value={option.value}>{option.value}</option>
                                ))}
                            </select>
                        </td>
                        
                        
                        {todo.isEditable ? 
                            (<td><button className='confirm' onClick = {() => handleSave(todo.id)}><GiConfirmed/></button></td>) : 
                            (<td><button className='edit' onClick = {() => handleEdit(todo.id)}><MdEdit/></button></td>)
                        }
                        

                    </tr>} 
                </>  
    }

    const handleEdit = (id) => {
        setIndex(id-1);
        console.log('Editing: ' + isEditing);

        if(!isEditing){
            enableEditing(id);
            setEditing(true);
            console.log("title editing enabled for title ");

                todos.forEach(todo => {
                    if (todo.id === parseInt(id)) {
                        console.log(todo.text);
                    }
                });

            console.log('Editing: ' + isEditing);
        }
        else {
            console.log("Cannot edit title ");

                todos.forEach(todo => {
                    if (todo.id === parseInt(id)) {
                        console.log(todo.text);
                    }
                }); 
                
            console.log(" as another title is editable");
        }
    };

    const handleSave = (id) => {
        setIndex(-1);
        console.log('Editing: ' + isEditing);

        if(isEditing) {
            setEditing(false);
            saveTitle(id, newTitle);
            console.log("title saved");
            console.log('Editing: ' + isEditing);
            console.log('');
            setTitle('');
        } else {
             console.log("Could not save this title: " + newTitle);
        }
    }

    function TodoListItems({filter}) {
        
        if(filter === 'date-due') {
            return todosByDateDue.map(todo => {
               return <TodoItem todo={todo}/>;
            });
        }

        if(filter === 'date-created') {
            return todosByDateCreated.map(todo => {
                return <TodoItem todo={todo}/>;
            });
        }

        if(filter === 'all') {
            return todos.map(todo => {
                return <TodoItem todo={todo}/>;
        });
        }
        return null;
    }

    if(!isLoggedIn) {
        return <Navigate to="/login" replace/>;
    }

    useEffect(() => {
        //console.log(itemRefs.current[currIndex]);
      if (currIndex > -1 && itemRefs.current[currIndex]) {
        itemRefs.current[currIndex].focus();
        // Optionally, set the caret position if needed
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(itemRefs.current[currIndex]);
        range.collapse(false); // Collapses the range to the end
        selection.removeAllRanges();
        selection.addRange(range);
        //setEditing(false);
      }
    }, [currIndex, isEditing]);


    return (
        <div>
            <label htmlFor="filter">Filter Todos: </label>
            <select name="filter" id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="date-due">Sort by Date Due</option>
                <option value="date-created">Sort by Date Created</option>
            </select>

            <h1>Todo List</h1>
            <Link id="add-todo-link" to="/add-todo"><button><FaPlus/> Add To-do</button></Link>
            <br/><br/>
            <table>
                <thead>
                    <tr>
                        <th>Mark Done</th><th>Title</th><th>Category</th><th>Edit Task</th><th>Edit Category</th>
                    </tr>
                </thead>

                <tbody><TodoListItems filter={filter}/></tbody>
            </table>

        </div>
    );
}
export default TodoList;