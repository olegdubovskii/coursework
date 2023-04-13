import React, {} from "react";
import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration"
import { Routes, Route, useNavigate  } from 'react-router-dom';
import PrivateRouteMain from "./components/Main/PrivateRouteMain/PrivateRouteMain";

function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path='/' element={
        <PrivateRouteMain>
          <Main navigate={navigate}/>
        </PrivateRouteMain>
      }/>
      <Route path='/login' element={<Login navigate={navigate}/>}/>
      <Route path="/registration" element={<Registration navigate={navigate}/>}/>
    </Routes>
  );
}

export default App;
