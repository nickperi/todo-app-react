import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { GiCancel, GiConfirmed } from "react-icons/gi";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function TodoItem({todo, toggleTodo, enableEditing, enableCategoryDropdown, saveTitle, saveCategory, disableEditing, disableCategoryDropdown, isEditing, isEditingCategory}) {
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

            return (
            
            <li 
                key={todo.id}
                style={{backgroundColor: todo.done ? '#339966':'#ff8080', listStyleType: 'none', maxWidth: '1000px', marginBottom: '10px', border: '1px solid grey', padding: '10px', borderRadius: '5px'}}>
                {todo.done ? <button className='added' onClick={() => toggleTodo(todo.id)}><MdCheckBox/></button> : <button className='removed' onClick={() => toggleTodo(todo.id)}><MdCheckBoxOutlineBlank/></button>} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <h4 style={{display:'inline'}} ref={itemRef} contentEditable={todo.isEditable} onBlur={(e) => {console.log(e.currentTarget.textContent); setTitle(e.currentTarget.textContent);}}>{todo.text}</h4> &nbsp;
                
                {todo.isEditable ? 
                    (<>
                        <button title='Save task title' className='confirm' onClick = {() => handleSave(todo.id)}><GiConfirmed/></button>
                         &nbsp;
                        <button title='Cancel' className='cancel' onClick = {() => disableEditing(todo.id)}><GiCancel/></button>
                        &nbsp;
                    </>) : 
                    (<button title='Edit task title' className='edit' onClick = {() => handleEdit(todo.id)}><MdEdit/></button>)
                } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                {todo.isCategoryEditable ?
                    (<>
                        <select value={selectedCategory} onChange={changeCategory}>
                            {options.map((option) => (
                                <option value={option.value}>{option.label}</option>
                            ))}
                        </select> &nbsp;
                        <button title='Save category' className='confirm-category' onClick={() => handleCategorySave()}><GiConfirmed/></button>&nbsp;&nbsp;
                        <button title='Cancel' className='cancel' onClick = {() => disableCategoryDropdown(todo.id)}><GiCancel/></button>
                    </>) :

                    (<>
                        <span>{options[options.findIndex(option => option.value===selectedCategory)].label}</span> &nbsp;
                        <button title='Edit category' className='edit-category' onClick={() => handleCategorySelect()}><MdEdit/></button>
                    </>)
                    } &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    {todo.done ?
                        <span style={{color:'#00FF66'}}>Completed</span> :
                        <span style={{color:'red'}}>Not Completed</span>
                    } &nbsp;

                    <Link title='View task' to={`/todos/${todo.id}`}><FaInfoCircle/></Link>
                </li> );
    }
    export default TodoItem;