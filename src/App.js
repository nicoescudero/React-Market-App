import './App.css';
import Home from './components/home';
import Register from'./components/register';
import Login from'./components/login';
import User from'./components/user';
import Edituser from './components/data_user';
import NotFound from './components/404';
import Publications from './components/publications';
import Post from './components/post';
import{BrowserRouter as Router,Routes,Route} from "react-router-dom";


export default function App(){
  return(
    <Router>
      <Routes>
  	  	<Route path="/" element={<Home/>} exact/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/user" element={<User/>}/>
        <Route path="/user/edit" element={<Edituser/>}/>
        <Route path="/publications" element={<Publications/>}/>
        <Route path="/publications/:post" element={<Post/>}/>
        <Route path="*" element={<NotFound/>}/>
  	  </Routes>
    </Router>
  );
};

