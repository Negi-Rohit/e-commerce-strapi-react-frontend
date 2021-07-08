import {useState, useEffect, useContext} from "react"
import axios from "axios";

import {API_URL, imageUrl } from "../../../utils/url";
import AuthContext from "../../../context/AuthContext";
import styles from "./product.module.css";
import Modal from "../../UI/modal/Modal";
import Spinner from "../../UI/spinner/Spinner";

const Product = (props) => {
    const id = props.match.params.id;
    const { addCartItem } = useContext(AuthContext);
    
    const [product, setProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios
          .get(`${API_URL}/products?slug=${id}`)
          .then(res => setProduct(res.data))
          .catch(err => console.error(err));
    },[id])

    const addToCartHandler = async (product) => {
        setShowModal(!showModal)
       await addCartItem(product)
    }

    const modalHandler = () => {
        setShowModal(!showModal);
    }

    return(
        product ?
        (
            <>
                <Modal
                    show={showModal}
                    closed={modalHandler} 
                    msg="Successfully added to cart"
                    sendTo="/cart"
                    sendToMsg="Go To Cart"
                />
               
                <div className={styles.Product}  style={{ opacity: showModal ? "0.2": "1"}}>
                    <img src={imageUrl(product[0].image.formats.small)} alt={product[0].title}/>
                    
                    <div>
                        <div>
                            <h2>{product[0].title}</h2>
                            <h5>Rs <strong>{product[0].price}</strong></h5>
                            <p>{product[0].description}</p>
                        </div>
                        <button onClick={ () => addToCartHandler(product[0])}>ADD TO CART</button>
                    </div>
                </div>            
            </>
        )
        : <Spinner/>
    )
}

export default Product;