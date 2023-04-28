import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Link} from 'react-router-dom';
import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import SeparatedArticle from "./components/SeparatedArticle/SeparatedArticle";
import Cabinet from "./components/Cabinet/Cabinet";
import CreateArticle from "./components/Cabinet/CreateArticle/CreateArticle";
import UserPage from "./components/UserPage/UserPage";
import EditArticle from "./components/Cabinet/EditArticle/EditArticle";
import "./appStyles.css"


function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  
  return (
    <Routes>
      <Route path='/' element={<Main navigate={navigate} setUser={setUser}/>}/>
      <Route path='/login' element={<Login navigate={navigate} setUser={setUser}/>}/>
      <Route path='/registration' element={<Registration navigate={navigate}/>}/>
      <Route path='/articles/:id' element={<SeparatedArticle setUser={setUser}/>}/>
      <Route path='/users/:user_name' element={<UserPage user={user} navigate={navigate} setUser={setUser}/>}/>
      <Route path='/cabinet' element={<Cabinet user={user} navigate={navigate} setUser={setUser}/>}/>
      <Route path='/createArticle' element={<CreateArticle navigate={navigate}/>}/>
      <Route path='/editArticle' element={<EditArticle navigate={navigate}/>}/>
    </Routes>
  );
}

export default App;
