import styles from "./sidebar.module.css";

const Sidebar = (props) => {

    let sidebarClasses = [styles.Sidebar, styles.Close];
    let backdropClasses = [styles.Backdrop, styles.Close];

    if(props.open){
        sidebarClasses = [styles.Sidebar, styles.Open]
        backdropClasses = [styles.Backdrop, styles.Open]
    }

    return(
        <>
            <div className={backdropClasses.join(" ")} onClick={props.clicked}></div>

            <ul className={sidebarClasses.join(" ")}>
                {
                    props.children
                }
            </ul>

        </>
    )
}

export default Sidebar;