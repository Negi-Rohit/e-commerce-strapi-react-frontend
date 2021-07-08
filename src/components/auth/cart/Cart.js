import { useContext} from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

import AuthContext from "../../../context/AuthContext";
import Spinner from "../../UI/spinner/Spinner";
import styles from "./cart.module.css";
import { imageUrl, STRIPE_PK, API_URL } from "../../../utils/url";

const stripePromise = loadStripe(STRIPE_PK);

const Cart = () => {
    const { user, getToken, cartList, fetchCart, loading, setLoading } = useContext(AuthContext);

    const deleteFromCart = async (id) => {
        setLoading(true);
        const token = await getToken();
        await axios.delete(`${API_URL}/carts/${cartList[0].id}/${id}`,{
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        fetchCart();
    }
    
    const checkoutHandler = async () => {
        setLoading(true);
        const stripe = await stripePromise
        const token = await getToken();
        const cart = cartList;
        
        const res = await axios.post(`${API_URL}/orders`, cart, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
          });
          
        const session = res.data;
        await stripe.redirectToCheckout({
            sessionId: session.id
        })
        setLoading(false);
    }

return(
    <div style={{textAlign: "center"}}>
        { loading ? <Spinner /> :
        
            !user ? <p 
                        style={{fontSize: "4rem", marginTop: "2rem"}}
                    >
                        please login first!
                    
                    </p>
                  :
                    cartList ? <div className={styles.Cart}>
                                    <h3>YOUR CART</h3>
                                    {
                                        cartList[0].items.map(item => {
                                            return (
                                                <div key={item.id} className={styles.CartItems}>
                                                    <img src={imageUrl(item.products[0].image.formats.thumbnail)} 
                                                         alt={item.products[0].title} 
                                                    />
                                                    <div className={styles.CartData}>
                                                        <div>
                                                            <h4>{item.products[0].title}</h4>
                                                            <p>Rs <span>{item.products[0].price}</span></p>
                                                        </div>
                                                        <div>
                                                            <button onClick={() =>deleteFromCart(item.id)}>
                                                                <DeleteForeverIcon />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <p>Total: Rs <strong>{cartList[0].total_price.toFixed(2)}</strong></p>
                                    <button 
                                        className={styles.Checkout}
                                        onClick={checkoutHandler}
                                    >CHECKOUT</button>
                                </div>
                              :
                                <p className={styles.CartIconWrapper}>
                                    <ShoppingCartOutlinedIcon className={styles.CartIcon} />
                                    <br />
                                    Empty
                                </p>
                    
        }
    </div>
)
}

export default Cart;