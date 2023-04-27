import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import styles from "./styles/mainPageStyles.module.css";
import MainArticlePlate from "./MainArticlePlate";

const Main = ({setUser}) => {

    const [allArticles, setAllArticles] = useState([]);

    const getArticles = async () => {
        const response = await fetch('http://localhost:3030/api/v1/allArticles');
        if (response.status === 200) {
            return response.json();
        } else {
            return [];
        }
    };

    useEffect(() => {
        getArticles().then(data => setAllArticles(data));
    }, []);


    return ( localStorage.getItem('accessToken') ?

    <div className={styles.main_articles}>
            <nav className={styles.nav_bar}>
                <h1>Автомобильный блог</h1>
                <div>
                    <Link to='/cabinet'>
                        <button className={styles.nav_btn}>Личный кабинет</button>
                    </Link>
                    <button className={styles.nav_btn} onClick={() => { localStorage.removeItem('accessToken'); setUser({})}}>Выйти</button> 
                </div>   
            </nav>
        <section> 
            { allArticles.map((article, key) => { return <MainArticlePlate key = {key} article = {article}/>})}
        </section>
    </div>
    :
    <div className={styles.main_articles}>
    <nav className={styles.nav_bar}>
        <h1>Автомобильный блог</h1>
        <div>
        <Link to='/login' state={{from: '/'}}>
                        <button className={styles.nav_btn}>Войти</button>
                    </Link>
            <Link to='/registration'>
                <button className={styles.nav_btn}>Регистрация</button>
            </Link>  
        </div>   
    </nav>
    <section> 
        { allArticles.map((article, key) => { return <MainArticlePlate key = {key} article = {article}/>})}
    </section>
    </div> 
    );
};

export default Main;