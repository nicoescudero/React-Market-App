import './App.css';
import Home from './components/home';
import Register from'./components/register';
import Login from'./components/login';
import User from'./components/user';
import{BrowserRouter as Router,Routes,Route} from "react-router-dom";


function App() {
  return (
    <Router>
        <Routes>
  				<Route path="/" element={<Home/>} exact/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<User/>}/>
  			</Routes>
    </Router>
  );
}

export default App;