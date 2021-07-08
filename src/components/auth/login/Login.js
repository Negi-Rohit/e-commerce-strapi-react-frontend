import { useState, useContext } from "react";

import AuthContext from "../../../context/AuthContext";
import styles from "./login.module.css";

const Login = (props) => {
    const [email, setEmail] = useState("");

    const { loginUser } = useContext(AuthContext);

    const submitHandler = e => {
        e.preventDefault();
        loginUser(email);
        props.history.replace("/products");
    }
    return (
        <div className={styles.Login}>
            <p>Enter a Valid email to Login/Register</p>
            <form onSubmit={submitHandler}>
                <input
                    type="email"
                    value={email}
                    placeholder="Enter A valid email"
                    onChange={e => setEmail(e.target.value)} 
                />
                <button type="submit">
                    Log in
                </button>
            </form>
        </div> 
    )
}

export default Login;