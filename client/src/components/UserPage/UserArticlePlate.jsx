import React from "react";
import styles from './styles/userPageStyles.module.css';
import userImg from "../../user.png";
import {Link} from 'react-router-dom';

const UserArticlePlate = ({article}) => {
    return(
        <article className={styles.main_article}>
        <img className={styles.article_img} src="https://picsum.photos/400/300" alt=""/>   
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
                    <Link to={`/users/${article.user_name}`} state={article.user_name}>
                        <button className={styles.article_btn}>
                            <img className={styles.article_btn_img} src={userImg} alt="" />
                            {article.user_name}
                        </button>
                    </Link>
            </div>
        </div> 
    </article> 
    );
};

export default UserArticlePlate;