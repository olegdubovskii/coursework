import React, {useState} from "react";
import styles from './styles/editArticleStyles.module.css'
import { Link, useLocation } from 'react-router-dom';

const EditArticle = ({navigate}) => {
    const location = useLocation();
    const user = location.state.user;
    const article = location.state.article;

    const [titleInput, setTitleInput] = useState(article.title);
    const [contentInput, setContentInput] = useState(article.content);

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        
        if (form.elements['file'].files[0]) {
            const formData = new FormData();
            formData.append('image', form.elements['file'].files[0]);
            const responseLink = await fetch(`http://localhost:3030/api/v1/image`, {
                // headers: {
                //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                // },
                method:'POST',
                body: formData,
            }).then(res => res.json());
            article.imagelink = responseLink;
        }

        
        const editedArticle = {
            title: titleInput,
            content: contentInput,
            user_id: user.id,
            dueTo: new Date(),
            user_name: user.nickname,
            imageLink: article.imagelink
        };

        const responseEditedArticle = await fetch(`http://localhost:3030/api/v1/users/${user.id}/articles/${article.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method:'PUT',
            body: JSON.stringify(editedArticle),
        }); 
        if (responseEditedArticle.status === 200) {
            navigate('/cabinet');
        } else if (responseEditedArticle.status === 404) {
            alert('something wrong');
        }
    }
    return(
        <div className={styles.container}>
             <nav className={styles.nav_bar}>
                <h1>Автомобильный блог</h1>
                <Link to='/cabinet'>
                    <button className={styles.nav_btn}> {"<"} В личный кабинет</button>
                </Link>
            </nav> 
            <form className={styles.form} onSubmit={onSubmit}> 
                <label>Заголовок</label> 
                <input className={styles.input} type="text" id="title" name="title" value={titleInput} onChange={e => setTitleInput(e.target.value)}/> 
                
                <label>Содержание</label> 
                <textarea className={styles.input_text} id="content" name="content" value={contentInput} onChange={e => setContentInput(e.target.value)}></textarea> 
                <div className={styles.small_inputs}>
                    <input className={styles.input_small} type="file"  id="file" name="file"/>
                </div>
         
                <button  className={styles.nav_btn} type="submit">Опубликовать</button> 
            </form> 
        </div>
    );
}

export default EditArticle;