import React from "react";

const CreateArticle = () => {
    return(
        <form> 
 <label for="title">Заголовок</label> 
 <input type="text" id="title" name="title" placeholder="Введите заголовок статьи"/> 
  
 <label for="content">Содержание</label> 
 <textarea id="content" name="content" placeholder="Введите содержание статьи"></textarea> 
  
 <button type="submit">Опубликовать</button> 
</form> 
    );
}

export default CreateArticle;