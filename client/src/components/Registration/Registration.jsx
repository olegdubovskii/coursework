import React from "react";
import styles from './styles/registrationStyles.module.css';
import {Link, useLocation} from 'react-router-dom';
import AuthService from "../../services/authService";

const Registration = ({navigate}) => {
    const location = useLocation();
    const props = location.state;
    console.log(props);
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
            navigate(props.from, {state: props.props});
        } else if (resp.status === 409) {
            alert('Wrong nickname or email');
        }
    }
    return(
        <div className={styles.login_container}>
            <nav className={styles.nav_bar}>
                <h1>Автомобильный блог</h1>
                    <Link to='..'>
                        <button className={styles.nav_btn}>{"<"} На главную</button>
                    </Link>
            </nav> 
            <form className={styles.login_form} onSubmit={onSubmit}> 
                <label>Имя пользователя</label> 
                <input className={styles.form_input} type="text" id="nickname" name="nickname" placeholder="Введите имя пользователя"/> 

                <label>Email</label> 
                <input className={styles.form_input} type="text" id="emailAdress" name="emailAdress" placeholder="Введите email"/> 
         
                <label>Пароль</label> 
                <input className={styles.form_input} type="password" id="password" name="password" placeholder="Введите пароль"/> 
                <div className={styles.button_wrapper}>
                    <button className={styles.form_button} type="submit">Зарегистрироваться</button> 
                </div>
            </form> 
       </div>
    );
}

export default Registration;