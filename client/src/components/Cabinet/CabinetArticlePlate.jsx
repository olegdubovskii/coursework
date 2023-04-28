import React from "react";
import styles from './styles/cabinetStyles.module.css'
import deleteImg from '../../delete.png'
import penImg from '../../pen.png'
import userImg from "../../user.png";
import {Link} from 'react-router-dom';

const CabinetArticlePlate = ({user, article, cabinetArticles, setCabinetArticles}) => {

    const deleteArticle = async () => {
        const response = await fetch(`http://localhost:3030/api/v1/users/${user.id}/articles/${article.id}`, {
            method:'DELETE'
        });
        if (response.status === 200) {
            response.json().then((data) => {setCabinetArticles(data)});   
        } else if (response.status === 404) {
            alert('file not found');
        }
    };

return(
    <article className={styles.main_article}>
        <img className={styles.article_img} src={article.imagelink} alt=""/>   
        <div className={styles.article_text}> 
            <h3>{article.title}</h3> 
            <p>{article.content}</p> 
            <div className={styles.article_btn_wrapper}>
                <Link to={`/articles/${article.id}`} state={article}>
                    <button className={styles.article_btn}>Читать далее</button>
                </Link>
            </div>
            <div className={styles.article_info}>
                <p>{article.creation_date}</p>
                <div className={styles.buttons}>
                    <img className={styles.article_btn_img} src={deleteImg} onClick={() => deleteArticle()} alt="" />
                    <Link to='/editArticle' state={ { user: user, article: article } }>
                        <img className={styles.article_btn_img} src={penImg} alt="" />
                    </Link>
                    <Link to={`/users/${article.user_name}`} state={article.user_id}>
                        <button className={styles.article_btn}>
                            <img className={styles.article_btn_img} src={userImg} alt="" />
                            {article.user_name}
                        </button>
                    </Link>
            </div>
            </div>
        </div> 
    </article> 
);
};

export default CabinetArticlePlate;