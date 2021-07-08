import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../../context/AuthContext";
import styles from "./modal.module.css";

const Modal = ({ show, closed, msg, sendTo, sendToMsg }) => {

    const { user } = useContext(AuthContext);
    return(
           <div 
                className={styles.Modal}
                style={{
                    transform: show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: show ? "1" : "0"
                }}
            >
            {
                user ?
                        <>
                            <h1>{msg}</h1>
                
                            <div className={styles.ModalButtons}>
                                <Link to={sendTo}>{sendToMsg}</Link>
                                <button onClick={closed}>X</button>
                            </div>
                        </>
                     : 
                        <>
                            <h1>Please Login First</h1>
                            <div className={styles.ModalButtons}>
                                <Link to="/login">Login</Link>
                                <button onClick={closed}>X</button>
                            </div>
                        </>
            }
           </div>
    )
}

export default Modal;