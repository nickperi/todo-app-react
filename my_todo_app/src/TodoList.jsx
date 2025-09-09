import {Link} from 'react-router-dom'
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { FaInfoCircle } from "react-icons/fa";
import {useState} from 'react';
import { Navigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';

function TodoList({todos, todosByDateCreated, todosByDateDue, toggleTodo, enableEditing, enableCategoryDropdown, saveTitle, saveCategory, isLoggedIn}) {
    const [filter, setFilter] = useState('all');
    const [isEditing, setEditing] = useState(false);
    const [isEditingCategory, setEditingCategory] = useState(false);


    function TodoItem({todo, }) {
        const itemRef = useRef(null);
        const [newTitle, setTitle] = useState(todo.text);
        const [selectedCategory, setCategory] = useState(todo.category);

        const options = [
            {label:'Job Application', value:"job application"},
            {label:'Work', value:"work"},
            {label: 'School', value:"school"},
            {label:'Personal', value:"personal"},
            {label:'Shopping', value:"shopping"},
            {label:'Urgent', value:"urgent"},
            {label:'Reminder', value:"reminder"},
            {label:'Other', value:"other"}
        ]; 


        const handleEdit = (id) => {
            if(!isEditing){
                enableEditing(id);
                setEditing(true);
            }
        };

        const handleSave = (id) => {
            if(isEditing) {
                saveTitle(id, newTitle);
                setEditing(false);
            }
        }

        const handleCategorySelect = () => {
            if(!isEditingCategory) {
                enableCategoryDropdown(todo.id);
                setEditingCategory(true);
            }
        };

        const changeCategory = (e) => {
            if(isEditingCategory)
                setCategory(e.target.value);
        };

        const handleCategorySave = () => {
            saveCategory(todo.id, selectedCategory);
            setEditingCategory(false);
        };

        useEffect(() => {
            if (itemRef.current && todo.isEditable) {
                itemRef.current.focus();
                // Optionally, set the caret position if needed
                const range = document.createRange();
                const selection = window.getSelection();
                range.selectNodeContents(itemRef.current);
                range.collapse(false); // Collapses the range to the end
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }, []);

            return <>
                {todo.done ?
                    <div 
                        key={todo.id}           
                        style={{
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        padding: "1rem",
                        backgroundColor: todo.done ? "royalblue" : "darkorchid",
                    }}>

                        <div>
                            <button className='added' onClick={() => toggleTodo(todo.id)}><MdCheckBox/></button> &nbsp;&nbsp;
                            <h2 style={{display:'inline-block'}} ref={itemRef} contentEditable={todo.isEditable} onBlur={(e) => {console.log(e.currentTarget.textContent); setTitle(e.currentTarget.textContent)}}>{todo.text}</h2> &nbsp;&nbsp;

                            {todo.isEditable ? 
                                (<button title='Save task title' className='confirm' onClick = {() => handleSave(todo.id)}><GiConfirmed/></button>) : 
                                (<button title='Edit task title' className='edit' onClick = {() => handleEdit(todo.id)}><MdEdit/></button>)
                            }
                        </div>
                        
                        {todo.isCategoryEditable ?
                            (<div>
                                <span>Category:</span>
                                <select value={selectedCategory} onChange={changeCategory}>
                                    {options.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select> &nbsp;&nbsp;
                                <button title='Save category' className='confirm-category' onClick={() => handleCategorySave()}><GiConfirmed/></button>
                            </div>) :

                            (<div>
                                <span>Category: </span>
                                <span>{options[options.findIndex(option => option.value===selectedCategory)].label}</span> &nbsp;&nbsp;
                                 <button title='Edit category' className='edit-category' onClick={() => handleCategorySelect()}><MdEdit/></button>
                            </div>)
                            } 

                        <Link title='View task' to={`/todos/${todo.id}`}><FaInfoCircle/></Link>
                    </div> :
                    
                    <div 
                        key={todo.id}
                        style={{
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        padding: "1rem",
                        backgroundColor: todo.done ? "royalblue" : "darkorchid",
                    }}>
                        <div>
                            <button className='removed' onClick={() => toggleTodo(todo.id)}><MdCheckBoxOutlineBlank /></button>&nbsp;&nbsp;
                            <h2 style={{display:'inline-block'}} ref={itemRef} contentEditable={todo.isEditable} onBlur={(e) => {setTitle(e.currentTarget.textContent)}}>{todo.text}</h2>&nbsp;&nbsp;

                            {todo.isEditable ? 
                                (<button title='Save task title' className='confirm' onClick = {() => handleSave(todo.id)}><GiConfirmed/></button>) : 
                                (<button title='Edit task title' className='edit' onClick = {() => handleEdit(todo.id)}><MdEdit/></button>)
                            }
                        </div>

                        {todo.isCategoryEditable ?
                        
                            (<div>
                                <span>Category: </span>
                                <select value={selectedCategory} onChange={changeCategory}>
                                    {options.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select> &nbsp;&nbsp;
                                <button title='Save category' className='confirm-category' onClick={() => handleCategorySave()}><GiConfirmed/></button>
                            </div>) :

                            (<div>
                                <span>Category: </span> 
                                <span>{options[options.findIndex(option => option.value===selectedCategory)].label}</span> &nbsp;&nbsp;
                                <button title='Edit category' className='edit-category' onClick={() => handleCategorySelect()}><MdEdit/></button>
                            </div>)
                        }

                        <Link title='View task' to={`/todos/${todo.id}`}><FaInfoCircle/></Link>

                    </div>} 
                </>  
    }

    function TodoListItems({filter}) {
        
        if(filter === 'date-due') {
            return todosByDateDue.map(todo => {
               return <TodoItem todo={todo} key={todo.id}/>;
            });
        }

        if(filter === 'date-created') {
            return todosByDateCreated.map(todo => {
                return <TodoItem todo={todo} key={todo.id}/>;
            });
        }

        if(filter === 'all') {
            return todos.map(todo => {
                return <TodoItem todo={todo} key={todo.id}/>;
        });
        }
        return null;
    }

    if(!isLoggedIn) {
        return <Navigate to="/login" replace/>;
    }


    return (
        <div>
            <label htmlFor="filter">Filter Todos: </label>
            <select name="filter" id="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="date-due">Sort by Date Due</option>
                <option value="date-created">Sort by Date Created</option>
            </select>

            <h1>Todo List</h1>
            <Link id="add-todo-link" to="/add-todo"><button className='add-todo'><FaPlus/> Add To-do</button></Link>
            <br/><br/>
    
            <div style={{ display: "grid", gap: "1rem", maxWidth: "400px", margin: "auto", overflowAnchor: 'none'}}><TodoListItems filter={filter}/></div>

        </div>
    );
}
export default TodoList;