import {useState} from 'react';
import { Navigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import TodoItem from './TodoItem';

function TodoList({todos, todosByDateCreated, todosByDateDue, toggleTodo, enableEditing, enableEditingDC, enableEditingDD, enableCategoryDropdown, enableCategoryDropdownDC, enableCategoryDropdownDD, saveTitle, saveTitleDC, saveTitleDD, saveCategory, saveCategoryDC, saveCategoryDD, isEditing, isEditingCategory, isLoggedIn}) {
    const [filter, setFilter] = useState('all');

    function TodoListItems({filter}) {
        
        if(filter === 'date-due') {
            return todosByDateDue.map(todo => {
               return <TodoItem todo={todo} key={todo.id} toggleTodo={toggleTodo} enableEditing={enableEditingDD} enableCategoryDropdown={enableCategoryDropdownDD} saveTitle={saveTitleDD} saveCategory={saveCategoryDD} isEditing={isEditing} isEditingCategory={isEditingCategory}/>;
            });
        }

        if(filter === 'date-created') {
            return todosByDateCreated.map(todo => {
                return <TodoItem todo={todo} key={todo.id} toggleTodo={toggleTodo} enableEditing={enableEditingDC} enableCategoryDropdown={enableCategoryDropdownDC} saveTitle={saveTitleDC} saveCategory={saveCategoryDC} isEditing={isEditing} isEditingCategory={isEditingCategory}/>;
            });
        }

        if(filter === 'all') {
            return todos.map(todo => {
                return <TodoItem todo={todo} key={todo.id} toggleTodo={toggleTodo} enableEditing={enableEditing} enableCategoryDropdown={enableCategoryDropdown} saveTitle={saveTitle} saveCategory={saveCategory} isEditing={isEditing} isEditingCategory={isEditingCategory}/>;
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
            <br/><br/>
    
            <div style={{ display: "grid", gap: "1rem", maxWidth: "400px", margin: "auto", overflowAnchor: 'none'}}><TodoListItems filter={filter}/></div>

        </div>
    );
}
export default TodoList;