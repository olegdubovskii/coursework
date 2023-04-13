import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/customStyles.css";
import AuthService from "../../services/authService";

const Login = ({navigate}) => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const loginData = { username: form.elements['username'].value, password: form.elements['password'].value };    
        const resp = await AuthService.logIn(loginData);
        resp.clone().json().then(data=> localStorage.setItem('accessToken' , data.accessToken)); 
        if (resp.status === 200) {
            navigate('/', {replace: true});
        }
    }
    return (
        <form className="auth-form" onSubmit={onSubmit}>
            <h1>Login</h1>
            <div className="form-group">
                <label>Username</label>
                <input className="form-control" id="username" name="username" placeholder="Username"/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="Password"/>
            </div>
            <button type="submit" id="login-btn" className="btn btn-primary">Login</button>
            <Link to="/registration">
                <button type="button" id="to-reg-btn" className="btn btn-primary">Registration</button>
            </Link>
        </form>
    );
}

export default Login;