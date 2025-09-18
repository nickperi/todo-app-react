import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function TodoItem({todo, toggleTodo, enableEditing, enableCategoryDropdown, saveTitle, saveCategory, isEditing, isEditingCategory}) {
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
            if(!isEditing && !isEditingCategory){
                enableEditing(id);
            }
        };

        const handleSave = (id) => {
            if(isEditing) {
                saveTitle(id, newTitle);
            }
        }

        const handleCategorySelect = () => {
            if(!isEditingCategory && !isEditing) {
                enableCategoryDropdown(todo.id);
            }
        };

        const changeCategory = (e) => {
            if(isEditingCategory)
                setCategory(e.target.value);
        };

        const handleCategorySave = () => {
            saveCategory(todo.id, selectedCategory);
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
                            } <br></br>

                        {todo.date_created ?
                            (<span>Created on {todo.date_created}</span>) :
                            (<></>)
                        } <br></br>

                         {todo.date_completed ?
                            (<span>Completed on {todo.date_completed}</span>) :
                            (<></>)
                        } <br></br>

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
                        } <br></br>

                        {todo.date_created ?
                            (<span>Created on {todo.date_created}</span>) :
                            (<></>)
                        } <br></br>

                         {todo.date_due ?
                            (<span>Due on {todo.date_time_due}</span>) :
                            (<></>)
                        }<br></br>
                        
                        <Link title='View task' to={`/todos/${todo.id}`}><FaInfoCircle/></Link>

                    </div>} 
                </>  
    }
    export default TodoItem;