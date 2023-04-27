import React from "react";
import styles from './styles/createArticleStyles.module.css'
import {Link} from 'react-router-dom';

const CreateArticle = () => {
    return(
        <div className={styles.container}>
             <nav className={styles.nav_bar}>
                <h1>Автомобильный блог</h1>
                <Link to='/cabinet'>
                    <button className={styles.nav_btn}> {"<"} В личный кабинет</button>
                </Link>
            </nav> 
            <form className={styles.form}> 
                <label for="title">Заголовок</label> 
                <input className={styles.input} type="text" id="title" name="title" placeholder="Введите заголовок статьи"/> 
                
                <label for="content">Содержание</label> 
                <textarea className={styles.input_text} id="content" name="content" placeholder="Введите содержание статьи"></textarea> 
                <div className={styles.small_inputs}>
                    <input className={styles.input_small} type="file"  id="file" name="file"/>
                    <input className={styles.input_small} type="date" id="dueTo" name="dueTo"/>
                </div>
         
                <button  className={styles.nav_btn} type="submit">Опубликовать</button> 
            </form> 
        </div>
    );
}

export default CreateArticle;