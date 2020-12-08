import { Avatar, Button, FormControl, InputLabel, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { auth, db } from "../component/firebase";
import Item from "../component/Item";
import firebase from 'firebase';
import { useStateValue } from "../StateProvider";
import './Todo.css'
import { Link, useHistory } from "react-router-dom";
function Todo() {
  const [todos, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [{user}, dispatch] = useStateValue();

  const handleAuth = () => {
    if(user){
        auth.signOut();
    }
}
  useEffect(()=>{
   if(user)
   {
    db.collection("users").doc(user?.uid).collection("todos").orderBy('timestamp','desc').onSnapshot(snapshot=>{
      console.log(snapshot.docs.map(doc=>({
       todo: doc.data().todo
    })));
      setTodo(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
   } else{
     setTodo([]);
   }
  },[user])

  const submit = (e) => {
    e.preventDefault();
    db.collection("users").doc(user?.uid).collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput("");
  };


  return (
    <div className="todopage">
      <nav className="navbar">
        <div className="left">
        <h1>Todo App</h1>
        </div>
        <div className="right">
        {!user?(
                <Link to="/login">
                <Avatar src={user?.photoURL}/>
                </Link>
            ):(
                <Link to="/login">
            <Avatar src={user?.photoURL} onClick={handleAuth}/>
            </Link>
            )}
        </div>
      </nav>
      <form>
      <FormControl>
        <TextField label = "Add Todo Here" id="time" type="text"  value={input} onChange={(event) => setInput(event.target.value)}/>
      </FormControl>
      <Button variant="contained" type="submit" onClick={submit} disabled={!input}>Add Todo</Button>
      </form>
      <ul className="todo_ul">
      {todos.map((todo) => (
        <Item todo = {todo}/>
      ))}
      </ul>
    </div>
  );
}

export default Todo;
