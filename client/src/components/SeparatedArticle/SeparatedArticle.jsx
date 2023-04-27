import React from "react";
import styles from './styles/separatedArticleStyles.module.css';
import { Link, useLocation } from 'react-router-dom';


const SeparatedArticle = ({setUser}) => {
    const location = useLocation();
    const article = location.state;
    return( localStorage.getItem('accessToken') ?
        <div className={styles.separatedArticle_container}>
        <nav className={styles.nav_bar}>
                <h1>Автомобильный блог</h1>
                <div>
                    <Link to='..'>
                        <button className={styles.nav_btn}>{"<"} На главную</button>
                    </Link>
                    <Link to='/cabinet'>
                        <button className={styles.nav_btn}>Личный кабинет</button>
                    </Link>
                    <button className={styles.nav_btn} onClick={() => { localStorage.removeItem('accessToken'); setUser({})}}>Выйти</button> 
                </div>   
            </nav>
        <section className={styles.section_styles}>
            <article> 
                <h1 className={styles.article__title}>{article.title}</h1> 
                <Link to={`/users/${article.user_name}`}>
                    <p className={styles.article__author}>Пользователь: {article.user_name}</p>
                </Link> 
                <p className={styles.article__date}>{article.creation_date}</p> 
                <p className={styles.article__text}>{article.content}</p> 
            </article>
        </section>
        </div>
        :
        <div className={styles.separatedArticle_container}>
        <nav className={styles.nav_bar}>
                <h1>Автомобильный блог</h1>
                <div>
                    <Link to='..'>
                        <button className={styles.nav_btn}>{"<"} На главную</button>
                    </Link>
                    <Link to='/login' state={{from: `/articles/${article.id}`, props: article}}>
                        <button className={styles.nav_btn}>Войти</button>
                    </Link>
                    <Link to='/registration'>
                        <button className={styles.nav_btn}>Регистрация</button> 
                    </Link>
                </div>   
            </nav>
        <section className={styles.section_styles}>
            <article> 
                <h1 className={styles.article__title}>{article.title}</h1>
                <Link to={`/users/${article.user_name}`}>
                    <p className={styles.article__author}>Пользователь: {article.user_name}</p>
                </Link> 
                <p className={styles.article__date}>{article.creation_date}</p> 
                <p className={styles.article__text}>{article.content}</p> 
            </article>
        </section>
        </div>
    );
};

export default SeparatedArticle;