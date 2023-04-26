import React, { useState } from "react";
import { Routes, Route, useNavigate, Link} from 'react-router-dom';
import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Article from "./components/Article/Article";
import Cabinet from "./components/Cabinet/Cabinet";
import CreateArticle from "./components/CreateArticle/CreateArticle";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  
  return (
    <Routes>
      <Route path='/' element={<Main navigate={navigate} setUser={setUser}/>}/>
      <Route path='/login' element={<Login navigate={navigate} setUser={setUser}/>}/>
      <Route path='/registration' element={<Registration navigate={navigate}/>}/>
      <Route path='/article' element={<Article/>}/>
      <Route path='/cabinet' element={<Cabinet/>}/>
      <Route path='/createArticle' element={<CreateArticle/>}/>
    </Routes>
  );
}

export default App;
