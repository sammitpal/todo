import './App.css';
import Todo from './Pages/Todo';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Start from './Pages/Start';
import { useStateValue } from './StateProvider';
import { auth } from './component/firebase';
import {useEffect} from 'react';
function App() {
  const [{},dispatch] = useStateValue();

  useEffect(()=>{
    auth.onAuthStateChanged(authUser => {
      console.log("USER ->", authUser);
      if(authUser){
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }
      else{
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  },[])
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Start/>
          </Route>
          <Route path="/">
            <Todo/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
