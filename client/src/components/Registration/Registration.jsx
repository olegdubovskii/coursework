import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/customStyles.css";
import AuthService from "../../services/authService";

const Registration = ({navigate}) => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const registationData = { username: form.elements['username'].value, password: form.elements['password'].value };    
        const resp = await AuthService.register(registationData);
        if (resp.status === 200) {
            navigate('/login');
        }
    }
    return(
        <form className="auth-form" onSubmit={onSubmit}>
            <h1>Registration</h1>
            <div className="form-group">
                <label>Username</label>
                <input className="form-control" id="username" name="username" placeholder="Username"/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="Password"/>
            </div>
            <button type="submit" id="register-btn" className="btn btn-primary">Register</button>
            <Link to="/login">
                <button type="button" id="to-log-btn" className="btn btn-primary">Login</button>
            </Link>
        </form>
    );
}

export default Registration;