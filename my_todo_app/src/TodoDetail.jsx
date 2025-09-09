//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import { useParams } from 'react-router-dom';
import './App.css'

function TodoDetail({todos, isLoggedIn}) {
  const { id } = useParams();
  const todo = todos.find(todo => todo.id === parseInt(id));

  if(!isLoggedIn) {
    return <Navigate to="/login" />;
  } 

  if(todo.done) {
    return (
    <div 
      style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "1rem", 
              backgroundColor: "navy"
            }}
    >

      <h2>{todo.text}</h2>
      <h3>User: {todo.user_id}</h3>
      <h3>Category: {todo.category}</h3>
      <h3>Done: {todo.done?"Yes":"No"}</h3>
      <h3>Date Due: {todo.date_due} {todo.time_due}</h3>
      <h3>Date Completed: {todo.date_completed}</h3>
    </div>
  );
  }

  else {
    return (
    <div  style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "1rem", 
              backgroundColor: "deeppink"
            }}>

      <h2>{todo.text}</h2>
      <h3>User: {todo.user_id}</h3>
      <h3>Category: {todo.category}</h3>
      <h3>Done: {todo.done?"Yes":"No"}</h3>
      <h3>Date Due: {todo.date_due} {todo.time_due}</h3>
    </div>
  );
  }

}
export default TodoDetail;