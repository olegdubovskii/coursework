import React from "react";
import "./styles/loginStyles.css";
import {Link} from 'react-router-dom';
import AuthService from "../../services/authService";


const Login = ({navigate, setUser}) => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const loginData = { 
            nickname: form.elements['nickname'].value, 
            password: form.elements['password'].value 
        };    
        const resp = await AuthService.logIn(loginData);
        await resp.clone().json().then(data=> localStorage.setItem('accessToken' , data)); 
        if (resp.status === 200) {
            await resp.json().then( data => setUser(data));
            navigate('/', {replace: true});
        }
    }
    return(
        <div>
           <nav>
                <ul>
                    <li>
                        <Link to='/'>
                            <button>На главную</button>
                        </Link>
                    </li>
                </ul>
            </nav> 
            <form onSubmit={onSubmit}> 
                <label>Имя пользователя</label> 
                <input type="text" id="nickname" name="nickname" placeholder="Введите имя пользователя"/> 
                
                <label>Пароль</label> 
                <input type="password" id="password" name="password" placeholder="Введите пароль"/>
                
                <button type="submit">Войти</button> 
            </form>
        </div>
    );
};

export default Login;