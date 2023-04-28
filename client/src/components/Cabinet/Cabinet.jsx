import React, { useState, useEffect } from "react";
import styles from './styles/cabinetStyles.module.css'
import CabinetArticlePlate from "./CabinetArticlePlate";

import {Link} from 'react-router-dom';

const Cabinet = ({user, navigate, setUser}) => {
    const [cabinetArticles, setCabinetArticles] = useState([]);

    const getCabinetArticles = async () => {
        const response = await fetch(`http://localhost:3030/api/v1/users/${user.id}/userArticles`);
        if (response.status === 200) {
            return response.json();
        } else {
            return [];
        }
    };

    useEffect(() => {
        getCabinetArticles().then(data => {setCabinetArticles(data)});
        //getCabinetArticles().then(data => {console.log(data)});
    }, []);

    

    return(
        <div className={styles.main_articles}>
            <nav className={styles.nav_bar}>
                <h1>Автомобильный блог</h1>
                <div>
                <Link to='..'>
                    <button className={styles.nav_btn}> {"<"} На главную</button>
                </Link>
                <Link to='/createArticle' state={user}>
                    <button className={styles.nav_btn}>Создать статью</button> 
                </Link>
                <button className={styles.nav_btn} onClick={() => { localStorage.removeItem('accessToken'); setUser({}); navigate('/')}}>Выйти</button> 
                </div>      
            </nav> 
            <div className={styles.user_info}>
                <div className={styles.user_info_section}>
                    <p className={styles.user_info_title}>имя пользователя:</p>
                    <h3>{user.nickname}</h3>
                </div>
                <div className={styles.user_info_section}>
                    <p className={styles.user_info_title}>email:</p>
                    <h3>{user.emailadress}</h3>
                </div>
            </div>
            <section>
                { cabinetArticles.map((article, key) => { return <CabinetArticlePlate key = {key} user={user} article = {article} cabinetArticles={cabinetArticles} setCabinetArticles={setCabinetArticles}/>})}
            </section>
        </div>
    );
};

export default Cabinet;