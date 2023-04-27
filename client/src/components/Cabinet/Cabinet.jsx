import React from "react";
import styles from './styles/cabinetStyles.module.css'
import deleteImg from '../../delete.png'
import penImg from '../../pen.png'

import {Link} from 'react-router-dom';

const Cabinet = () => {
    return(
        <div className={styles.main_articles}>
            <nav className={styles.nav_bar}>
                <h1>Автомобильный блог</h1>
                <div>
                <Link to='..'>
                    <button className={styles.nav_btn}> {"<"} На главную</button>
                </Link>
                <button className={styles.nav_btn}>Создать статью</button>
                </div>      
            </nav> 
            <div className={styles.user_info}>
                <div className={styles.user_info_section}>
                    <p className={styles.user_info_title}>имя пользователя:</p>
                    <h3>Такой-то Такой-то</h3>
                </div>
                <div className={styles.user_info_section}>
                    <p className={styles.user_info_title}>email:</p>
                    <h3>qwertyuio@gmail.com</h3>
                </div>
            </div>
            <div>
            <article className={styles.main_article}>
                <img className={styles.article_img} src="https://picsum.photos/400/300" alt=""/>   
        <div className={styles.article_text}> 
            <h3>Название статьи</h3> 
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum metus vel nibh iaculis, vel tristique lorem rutrum. Sed a leo et dolor lacinia laoreet vel vel magna. Vestibulum ac libero vel sapien congue pulvinar nec in lacus. Sed a leo et dolor lacinia laoreet vel vel magna. Vestibulum ac libero vel sapien congue pulvinar nec in lacus.</p> 
            <div className={styles.article_btn_wrapper}>
                <button className={styles.article_btn}>Читать далее</button>
            </div>
            <div className={styles.buttons}>
                    <img className={styles.article_btn_img} src={deleteImg} alt="" />
                    <img className={styles.article_btn_img} src={penImg} alt="" />
            </div>
            <div className={styles.article_info}>
                    <p>01.02.2000</p>
            </div>
        </div> 
    </article> 
            
    <article className={styles.main_article}>
        <img className={styles.article_img} src="https://picsum.photos/400/300" alt=""/>   
        <div className={styles.article_text}> 
            <h3>Название статьи</h3> 
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum metus vel nibh iaculis, vel tristique lorem rutrum. Sed a leo et dolor lacinia laoreet vel vel magna. Vestibulum ac libero vel sapien congue pulvinar nec in lacus. Sed a leo et dolor lacinia laoreet vel vel magna. Vestibulum ac libero vel sapien congue pulvinar nec in lacus.</p> 
            <div className={styles.article_btn_wrapper}>
                <button className={styles.article_btn}>Читать далее</button>
            </div>
            <div className={styles.buttons}>
                    <img className={styles.article_btn_img} src={deleteImg} alt="" />
                    <img className={styles.article_btn_img} src={penImg} alt="" />
            </div>
            <div className={styles.article_info}>
                    <p>01.02.2000</p>
            </div>
        </div> 
    </article> 
            
    <article className={styles.main_article}>
        <img className={styles.article_img} src="https://picsum.photos/400/300" alt=""/>   
        <div className={styles.article_text}> 
            <h3>Название статьи</h3> 
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum metus vel nibh iaculis, vel tristique lorem rutrum. Sed a leo et dolor lacinia laoreet vel vel magna. Vestibulum ac libero vel sapien congue pulvinar nec in lacus. Sed a leo et dolor lacinia laoreet vel vel magna. Vestibulum ac libero vel sapien congue pulvinar nec in lacus.</p> 
            <div className={styles.article_btn_wrapper}>
                <button className={styles.article_btn}>Читать далее</button>
            </div>
            <div className={styles.buttons}>
                    <img className={styles.article_btn_img} src={deleteImg} alt="" />
                    <img className={styles.article_btn_img} src={penImg} alt="" />
            </div>
            <div className={styles.article_info}>
                    <p>01.02.2000</p>
            </div>
        </div> 
    </article> 
            </div>
  </div>
    );
};

export default Cabinet;