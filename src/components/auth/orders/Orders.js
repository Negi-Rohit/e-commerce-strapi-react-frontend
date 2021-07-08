import { useState, useContext, useEffect } from "react";
import axios from "axios";

import AuthContext from "../../../context/AuthContext";
import styles from "./Orders.module.css";
import { API_URL } from "../../../utils/url";
import Spinner from "../../UI/spinner/Spinner";

const Orders = () => {
    const { user, getToken, loading, setLoading } = useContext(AuthContext);

    const [ orders, setOrders ] = useState(null);

    useEffect(() => {
        if(user){
            const fetchOrders = async () => {
                setLoading(true);
                const token = await getToken();
                await axios.get(`${API_URL}/orders`,{
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                  .then(res => {
                    setOrders(res.data);
                    setLoading(false);
                  })
                  .catch(() => setLoading(false));
            }
            fetchOrders();
        }
    },[user])

    return (
        <div style={{textAlign: "center"}}>
            { loading ? <Spinner /> :
            
                !user ? <p 
                            style={{fontSize: "4rem", marginTop: "2rem"}}
                        >
                            please login first!
                        
                        </p>
                    :  orders ? 
                                <div className={styles.Orders}>
                                    {
                                        orders.map(order => {
                                            return(
                                                <div className={styles.OrdersData} key={order.id}>
                                                    <ul>
                                                    {
                                                        order.orders_data.map((data, index) => {
                                                            return(
                                                               <li key={index}>
                                                                   <span>
                                                                       {data.name}
                                                                   </span>
                                                                  <span>Rs:{data.price}</span>
                                                               </li> 
                                                            )
                                                        })
                                                    }
                                                    </ul>
                                                    <p>Status: <strong>{order.status}</strong></p>
                                                    <p>Total: <strong>{order.total}</strong></p>
                                                </div>
                                            )
                                        })
                                    }
                                    
                                </div>
                              : 
                                <p
                                    style={{fontSize: "4rem", marginTop: "2rem"}}
                                >No Orders</p>
            }
        </div>                       
    )
}

export default Orders;