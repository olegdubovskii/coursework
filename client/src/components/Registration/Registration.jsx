import React from "react";
import './styles/registrationStyles.css';
import {Link} from 'react-router-dom';
import AuthService from "../../services/authService";

const Registration = ({navigate}) => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const registationData = { 
            nickname: form.elements['nickname'].value,
            emailAdress: form.elements['emailAdress'].value, 
            password: form.elements['password'].value 
        };    
        const resp = await AuthService.register(registationData);
        if (resp.status === 200) {
            navigate('/login');
        } else {
            alert('Wrong nickname or email');
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

                <label>Email</label> 
                <input type="text" id="emailAdress" name="emailAdress" placeholder="Введите email"/> 
         
                <label>Пароль</label> 
                <input type="password" id="password" name="password" placeholder="Введите пароль"/> 
         
                <button type="submit">Зарегистрироваться</button> 
            </form> 
       </div>
    );
}

export default Registration;