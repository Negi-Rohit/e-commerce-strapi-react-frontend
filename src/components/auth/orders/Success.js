import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import axios from "axios";

import Modal from "../../UI/modal/Modal";
import AuthContext from "../../../context/AuthContext";
import { API_URL } from "../../../utils/url";
import Spinner from "../../UI/spinner/Spinner";

const Success = (props) => {
    const { session_id } = useParams();
    const { user, getToken, loading, setLoading, setCartList } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if(user){
            const checkoutSuccess = async () => {
                const token = await getToken();
                await axios.post(`${API_URL}/orders/confirm`, session_id, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                  .then(() => {
                      setShowModal(true);
                      setLoading(false);
                      setCartList(null);
                  })
                  .catch(() => {
                      setShowModal(false);
                      setLoading(false);
                      setCartList(null);
                });
            }
            checkoutSuccess();
        }
    },[user])
    
    const goToHome = () => {
        props.history.replace("/products");
    }

    return(
        <>
           {
               loading ?
                            <Spinner />
                       :
                            <Modal 
                                show={showModal}
                                closed={goToHome}
                                msg="Payment Successful"
                                sendTo="/products"
                                sendToMsg="Go to Home"
                            />

           }
        </>
    ) 
}

export default Success;