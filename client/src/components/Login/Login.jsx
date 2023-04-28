import React from "react";
import {Link, useLocation } from 'react-router-dom';
import AuthService from "../../services/authService";
import styles from './styles/loginStyles.module.css'

const Login = ({navigate, setUser}) => {
    const location = useLocation();
    const props = location.state;
    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const loginData = { 
            nickname: form.elements['nickname'].value, 
            password: form.elements['password'].value 
        };    
        const resp = await AuthService.logIn(loginData);
        if (resp.status === 200) {
            await resp.clone().json().then(data => localStorage.setItem('accessToken' , data.accessToken));
            await resp.json().then( data => setUser(data));
            navigate(props.from, {state: props.props});
        } else if (resp.status === 401) {
            alert('Wrong nickname or email');
        }
    }
    return(
        <div className={styles.login_container}>
           <nav className={styles.nav_bar}>
                <h1>Автомобильный блог</h1>
                <Link to='..'>
                    <button className={styles.nav_btn}> {"<"} На главную</button>
                </Link>
            </nav> 
            <form className={styles.login_form} onSubmit={onSubmit}> 
                <label>Имя пользователя</label> 
                <input className={styles.form_input} type="text" id="nickname" name="nickname" placeholder="Введите имя пользователя"/> 
                
                <label>Пароль</label> 
                <input className={styles.form_input} type="password" id="password" name="password" placeholder="Введите пароль"/>
                <div className={styles.button_wrapper}>
                    <button className={styles.form_button} type="submit">Войти</button> 
                </div>
            </form>
        </div>
    );
};

export default Login;