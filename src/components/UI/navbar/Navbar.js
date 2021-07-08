import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

import AuthContext from "../../../context/AuthContext";
import styles from "./navbar.module.css";
import Sidebar from "./sidebar/Sidebar";

const Navbar = () => {
    const {user, logoutUser} = useContext(AuthContext);

    const [showSidebar, setShowSidebar] = useState(false);

    const sidebarHandler = () => {
        setShowSidebar(!showSidebar);
    }

    const logoutHandler = () => {
        logoutUser();
    }    

    let links;
    if(user) {
        links = <>
                    <li>
                        <NavLink to="/user/orders" activeStyle={{color: "#f2a154"}}>
                            {user}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/cart" activeStyle={{color: "#f2a154"}}>
                            <ShoppingCartOutlinedIcon />
                        </NavLink>
                    </li>
                    <li onClick={logoutHandler}>Logout</li>
                </>
    }else {
        links = <>
                    <li><Link to="/login">Login</Link></li>
                </>
    }
    return(
            <nav className={styles.Navbar}>
            <div>
                <Link to="/">
                    E-commerce
                </Link>
            </div>

            <button 
                className={styles.SidebarToggler}
                onClick={sidebarHandler}
            >
                <MenuRoundedIcon />
            </button>

            <Sidebar
                open={showSidebar}
                clicked={sidebarHandler}
            >
                {links}
            </Sidebar>

            <ul className={styles.Toolbar}>
                {links}
            </ul>

            </nav>
    )
}

export default Navbar;