import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import "./styles/mainPageStyles.css";

const Main = ({navigate, setUser}) => {



    return ( localStorage.getItem('accessToken') ?
    <div>
    <nav>
        <ul>
            <li>
                <button>Личный кабинет</button>
                <button onClick={() => { localStorage.removeItem('accessToken'); setUser({})}}>Выйти</button>
            </li>
        </ul>
    </nav>
    <section> 
    <article>
        <img src="https://picsum.photos/400/300" alt=""/>   
        <div className="text"> 
            <h3>Название статьи</h3> 
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum metus vel nibh iaculis, vel tristique lorem rutrum. Sed a leo et dolor lacinia laoreet vel vel magna. Vestibulum ac libero vel sapien congue pulvinar nec in lacus. Sed a leo et dolor lacinia laoreet vel vel magna. Vestibulum ac libero vel sapien congue pulvinar nec in lacus.</p> 
            <button>Читать далее</button>
        </div> 
    </article> 
    <article>
        <img src="https://picsum.photos/400/300" alt=""/>
        <div className="text"> 
            <h3>Название статьи</h3> 
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum metus vel nibh iaculis, vel tristique lorem rutrum. Sed a leo et dolor lacinia laoreet vel vel magna. Vestibulum ac libero vel sapien congue pulvinar nec in lacus. Sed a leo et dolor lacinia laoreet vel vel magna. Vestibulum ac libero vel sapien congue pulvinar nec in lacus.</p> 
            <button>Читать далее</button>
        </div>
    </article> 
    </section>
    </div>
    :
    <div>
    <nav>
        <ul>
            <li>
                <Link to='/login'>
                    <button>Войти</button>
                </Link>
                <Link to='/registration'>
                    <button>Регистрация</button>
                </Link>    
            </li>
        </ul>
    </nav>
    <section> 
    <article>
        <img src="https://picsum.photos/400/300" alt=""/>   
        <div className="text"> 
            <h3>Название статьи</h3> 
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum metus vel nibh iaculis, vel tristique lorem rutrum. Sed a leo et dolor lacinia laoreet vel vel magna. Vestibulum ac libero vel sapien congue pulvinar nec in lacus. Sed a leo et dolor lacinia laoreet vel vel magna. Vestibulum ac libero vel sapien congue pulvinar nec in lacus.</p> 
            <button>Читать далее</button>
        </div> 
    </article> 
    <article>
        <img src="https://picsum.photos/400/300" alt=""/>
        <div className="text"> 
            <h3>Название статьи</h3> 
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris bibendum metus vel nibh iaculis, vel tristique lorem rutrum. Sed a leo et dolor lacinia laoreet vel vel magna. Vestibulum ac libero vel sapien congue pulvinar nec in lacus. Sed a leo et dolor lacinia laoreet vel vel magna. Vestibulum ac libero vel sapien congue pulvinar nec in lacus.</p> 
            <button>Читать далее</button>
        </div>
    </article> 
    </section>
    </div> 
    );
};

export default Main;