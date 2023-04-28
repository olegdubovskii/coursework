import React, { useEffect, useState } from "react";
import styles from './styles/userPageStyles.module.css';
import {Link, useLocation} from 'react-router-dom';
import UserArticlePlate from "./UserArticlePlate";


const UserPage = ({user, navigate, setUser}) => {
    const location = useLocation();
    const usr = location.state;
    const [userData, setUserData] = useState({});
    const [userArticles, setUserArticles] = useState([]);

    const getUserArticles = async () => {
        const response = await fetch(`http://localhost:3030/api/v1/users/${usr}/userArticles`);
        if (response.status === 200) {
            return response.json();
        } else {
            return [];
        }
    };

    const getUserData = async () => {
        const response = await fetch(`http://localhost:3030/api/v1/users/${usr}/userData`);
        if (response.status === 200) {
            return response.json();
        } else {
            return '';
        }
    }

    useEffect(() => {
        if (usr === user.id) {
            navigate('/cabinet');
        } else {
            getUserArticles().then(data => {setUserArticles(data)});
            getUserData().then(data => {setUserData(data)});
        }
    }, []);
    return( 
            localStorage.getItem('accessToken') ?
                <div className={styles.main_articles}>
                    <nav className={styles.nav_bar}>
                        <h1>Автомобильный блог</h1>
                        <div>
                            <Link to='..'>
                                <button className={styles.nav_btn}> {"<"} На главную</button>
                            </Link>
                            <Link to='/cabinet'>
                                <button className={styles.nav_btn}>Личный кабинет</button>
                            </Link>
                            <button className={styles.nav_btn} onClick={() => { localStorage.removeItem('accessToken'); setUser({})}}>Выйти</button>
                        </div>      
                    </nav> 
                    <div className={styles.user_info}>
                        <div className={styles.user_info_section}>
                            <p className={styles.user_info_title}>имя пользователя:</p>
                            <h3>{userData.nickname}</h3>
                        </div>
                        <div className={styles.user_info_section}>
                            <p className={styles.user_info_title}>email:</p>
                            <h3>{userData.emailadress}</h3>
                        </div>
                    </div>
                    <section>
                        { userArticles.map((article, key) => { return <UserArticlePlate key = {key} article = {article}/>})}
                    </section>
                </div>
            :
                <div className={styles.main_articles}>
                    <nav className={styles.nav_bar}>
                        <h1>Автомобильный блог</h1>
                        <div>
                            <Link to='..'>
                                <button className={styles.nav_btn}> {"<"} На главную</button>
                            </Link>
                            <Link to='/login' state={{from: `/users/${userData.nickname}`, props: usr}}>
                                <button className={styles.nav_btn}>Войти</button>
                            </Link>
                            <Link to='/registration' state={{from: `/users/${userData.nickname}`, props: usr}}>
                                <button className={styles.nav_btn}>Регистрация</button>
                            </Link>  
                        </div>      
                    </nav> 
                    <div className={styles.user_info}>
                        <div className={styles.user_info_section}>
                            <p className={styles.user_info_title}>имя пользователя:</p>
                            <h3>{userData.nickname}</h3>
                        </div>
                        <div className={styles.user_info_section}>
                            <p className={styles.user_info_title}>email:</p>
                            <h3>{userData.emailadress}</h3>
                        </div>
                    </div>
                    <section>
                        { userArticles.map((article, key) => { return <UserArticlePlate key = {key} article = {article}/>})}
                    </section>
                </div>
    );
};

export default UserPage;