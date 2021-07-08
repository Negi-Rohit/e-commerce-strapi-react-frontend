import { createContext, useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import axios from "axios";

import { MAGIC_KEY, API_URL } from "../utils/url";

const AuthContext = createContext();

let magic;

export const AuthProvider = (props) => {
    const [empty, setEmpty] = useState(null);
    const [user, setUser] = useState(null);
    const [cartItem, setCartItem] = useState(null);
    const [cartList, setCartList] = useState(null);
    const [loading, setLoading] = useState(false);

    const loginUser = async (email) => {
        try{
            await magic.auth.loginWithMagicLink({email});
            setUser(email);
        } catch(err) {
            setUser(null);
        }
    }

    const logoutUser = async () => {
        try{
            await magic.user.logout()
            setUser(null);
            window.location("/");
        } catch(err) {

        }
    }

    const checkUserLoggedIn = async () => {
        try{
            const isLoggedIn = await magic.user.isLoggedIn()
            if(isLoggedIn){
                const { email } = await magic.user.getMetadata()
                setUser(email)
            } 
        } catch(err){

        }
    }

    
    const getToken = async () => {
        try {
            const token = await magic.user.getIdToken()
            
            return token;
        } catch(err){

        }
    }

    const addCartItem = async (item) => {
        try {
             setCartItem(item)
        }catch(err){
        }
    }

    const fetchCart = async () => {
        if(user) {
                setLoading(true)
                const token = await getToken();
                const res = await axios.get(`${API_URL}/carts`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                if(res.data.length === 0){
                    setEmpty(true)
                    setLoading(false)
                    setCartList(null);
                }else {
                    setEmpty(false)
                    setCartList(res.data)
                    setLoading(false);
                }
        } 
    }

    const addToCart = async () => {
        setLoading(true);
        const token = await getToken();
        await axios.post(`${API_URL}/carts`, cartItem, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        setLoading(false);
        setCartItem(null);
        fetchCart();
    }
    const updateCart = async () => {
        setLoading(true);

        const token = await getToken();
        const item = {
            products: cartItem
        }
        await axios.put(`${API_URL}/carts/${cartList[0].id}`, item, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        setLoading(false);
        setCartItem(null);
        fetchCart();
    }
    useEffect(() => {
        if(empty && cartItem){
           addToCart();

        } else if(cartList && cartItem) {
           updateCart();
        }
    },[cartItem, empty, cartList])

    useEffect(() => {
        magic = new Magic(MAGIC_KEY)
        checkUserLoggedIn();
    },[])

    useEffect(() => {
        if(user){
            fetchCart();
        }
    },[user])
    
    return (
        <AuthContext.Provider 
            value={{
                empty,
                user, 
                cartItem, 
                cartList,
                loading,
                loginUser, 
                logoutUser, 
                getToken, 
                addCartItem,
                fetchCart,
                setLoading,
                setCartList
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;