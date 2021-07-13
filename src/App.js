import { Route, Switch ,BrowserRouter as Router } from 'react-router-dom';
import Login from "./components/login";
import Home from "./components/home";
import Header from "./components/header";
import Detail from "./components/details";
import './App.css';

function App() {
  return (
    <div className="App">      
      <Router>
        <Header/>
          <Switch>          
            <Route exact path="/">
            <Login></Login>
            </Route>
            <Route path='/home'>
              <Home></Home>
            </Route>
            <Route path="/detail/:id">
            <Detail />
          </Route>
          </Switch>
      </Router>
      
    </div>
  );
}

export default App;
