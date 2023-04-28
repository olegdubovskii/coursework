import React from "react";
import styles from './styles/createArticleStyles.module.css'
import { Link, useLocation } from 'react-router-dom';

const CreateArticle = ({navigate}) => {
    const location = useLocation();
    const user = location.state;

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData();
        formData.append('image', form.elements['file'].files[0]);
        const responseLink = await fetch(`http://localhost:3030/api/v1/image`, {
            // headers: {
            //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            // },
            method:'POST',
            body: formData,
        }).then(res => res.json());

        
        const newArticle = {
            title: form.elements['title'].value,
            content: form.elements['content'].value,
            user_id: user.id,
            dueTo: new Date(),
            user_name: user.nickname,
            imageLink: responseLink
        };

        const responseNewArticle = await fetch(`http://localhost:3030/api/v1/users/${user.id}/articles/newArticle`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method:'POST',
            body: JSON.stringify(newArticle),
        }); 
        if (responseNewArticle.status === 200) {
            navigate('/cabinet');
        } else if (responseNewArticle.status === 404) {
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
                <input className={styles.input} type="text" id="title" name="title" placeholder="Введите заголовок статьи"/> 
                
                <label>Содержание</label> 
                <textarea className={styles.input_text} id="content" name="content" placeholder="Введите содержание статьи"></textarea> 
                <div className={styles.small_inputs}>
                    <input className={styles.input_small} type="file"  id="file" name="file"/>
                </div>
         
                <button  className={styles.nav_btn} type="submit">Опубликовать</button> 
            </form> 
        </div>
    );
}

export default CreateArticle;