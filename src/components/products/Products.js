import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import styles from "./products.module.css";
import Spinner from "../UI/spinner/Spinner";
import { API_URL, imageUrl } from "../../utils/url";
import AuthContext from "../../context/AuthContext";

const Products = () => {
    const { loading, setLoading } = useContext(AuthContext);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoading(true)
        axios
          .get(`${API_URL}/products`)
          .then(res => {
              setProducts(res.data);
              setLoading(false);
          })
          .catch(err => console.error(err));
    },[])
    return(
            <>
                <div className={styles.Headlines}>
                    <h1>Find it, Love it, Buy it</h1>
                    <h6>Everything is a CLICK away!</h6>
                </div>
                
                <hr />

                <ResponsiveMasonry  columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}} className={styles.Products}>
                    <Masonry gutter="30px">
                    {
                        loading ?
                            <Spinner />
                                :
                                    products && (
                                        products.map(product => {
                                            return (
                                                <div key={product.slug} className={styles.Media} >
                                                    <div className={styles.Overlay}></div>
                                                    <div>
                                                        <img src={imageUrl(product.image.formats.medium)} alt={product.slug}/>
                                                    </div>
                                                    <div className={styles.ProductDetails}>
                                                        <h1>{product.title}</h1>
                                                        <>Price: {product.price} Rs</>
                                                        <p>{product.description}</p>
                                                        <Link to={`/product/${product.slug}`}>VIEW PRODUCT</Link>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )
                    }
                    </Masonry>
                </ResponsiveMasonry>
            </>
    )
}

export default Products;