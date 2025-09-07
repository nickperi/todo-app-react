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

function TodoList({todos, todosByDateCreated, todosByDateDue, toggleTodo, enableEditing, enableCategoryDropdown, saveTitle, saveCategory, isLoggedIn}) {
    const [filter, setFilter] = useState('all');
    const [isEditing, setEditing] = useState(false);
    const [isEditingCategory, setEditingCategory] = useState(false);


    const IconWithCaption = ({IconComponent, caption}) => {
        return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconComponent />
          <span style={{ marginLeft: '8px' }}>{caption}</span>
        </div>
        );
    };


    function TodoItem({todo, }) {
        const itemRef = useRef(null);
        const [newTitle, setTitle] = useState(todo.text);
        const [selectedCategory, setCategory] = useState(todo.category);

        const options = [
            {label:'Job Application', value:"job application"},
            {label:'Work', value:"work"},
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
                    <tr key={todo.id}>
                        <td><button className='added' onClick={() => toggleTodo(todo.id)}><BsCheckSquareFill/></button>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td><span ref={itemRef} contentEditable={todo.isEditable} onBlur={(e) => {console.log(e.currentTarget.textContent); setTitle(e.currentTarget.textContent)}}>{todo.text}</span></td>

                        {todo.isEditable ? 
                            (<td><button className='confirm' onClick = {() => handleSave(todo.id)}><GiConfirmed/></button></td>) : 
                            (<td><button className='edit' onClick = {() => handleEdit(todo.id)}><MdEdit/></button></td>)
                        }
                        
                        {todo.isCategoryEditable ?
                        
                        (<td>
                            <select value={selectedCategory} onChange={changeCategory}>
                                {options.map((option) => (
                                    <option value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </td>) :

                        (<td>
                            <span>{options[options.findIndex(option => option.value===selectedCategory)].label}</span>
                        </td>)
                        }
                        

                        {todo.isCategoryEditable ?
                            (<td><button className='confirm-category' onClick={() => handleCategorySave()}><GiConfirmed/></button></td>) : 
                            (<td><button className='edit-category' onClick={() => handleCategorySelect()}><MdEdit/></button></td>)
                        }
                        
                    </tr> :
                    
                    <tr key={todo.id}>
                        <td><button className='removed' onClick={() => toggleTodo(todo.id)}><BsCheckSquareFill/></button>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td><span  ref={itemRef} contentEditable={todo.isEditable} onBlur={(e) => {setTitle(e.currentTarget.textContent)}}>{todo.text}</span></td>

                        {todo.isEditable ? 
                            (<td><button className='confirm' onClick = {() => handleSave(todo.id)}><GiConfirmed/></button></td>) : 
                            (<td><button className='edit' onClick = {() => handleEdit(todo.id)}><MdEdit/></button></td>)
                        }
                        
                        {todo.isCategoryEditable ?
                        
                            (<td>
                                <select value={selectedCategory} onChange={changeCategory}>
                                    {options.map((option) => (
                                        <option value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </td>) :

                            (<td>
                               <span>{options[options.findIndex(option => option.value===selectedCategory)].label}</span>
                            </td>)
                        }

                        {todo.isCategoryEditable ?
                            (<td><button className='confirm-category' onClick={() => handleCategorySave()}><GiConfirmed/></button></td>) : 
                            (<td><button className='edit-category' onClick={() => handleCategorySelect()}><MdEdit/></button></td>)
                        }
                        

                    </tr>} 
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
            <Link id="add-todo-link" to="/add-todo"><button><FaPlus/> Add To-do</button></Link>
            <br/><br/>
            <table>
                <thead>
                    <tr>
                        <th>Mark Done</th><th>Title</th><th>Edit Task</th><th>Category</th><th>Edit Category</th>
                    </tr>
                </thead>

                <tbody><TodoListItems filter={filter}/></tbody>
            </table>

        </div>
    );
}
export default TodoList;