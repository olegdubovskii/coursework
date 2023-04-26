import React from "react";
import styles from './styles/articleStyles.css';


const Article = () => {
    return(
        <section>
            <article className={styles.article_article}> 
                <h1 className="article__title">Заголовок статьи</h1> 
                <p className="article__author">Автор: Имя Фамилия</p> 
                <p className="article__date">Дата публикации: 01.01.2023</p> 
                <p className="article__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum metus vel nibh iaculis, vel tristique lorem rutrum. Sed a leo et dolor lacinia laoreet vel vel magna. Vestibulum ac libero vel sapien congue pulvinar nec in lacus. Sed a leo et dolor lacinia laoreet vel vel magna. Vestibulum ac libero vel sapien congue pulvinar nec in lacus.</p> 
            </article>
        </section>
    );
};

export default Article;