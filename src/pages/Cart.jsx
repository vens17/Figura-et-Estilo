import React from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import{ cartActions } from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import _ from 'lodash';

const Cart = ( ) => {

    const likeItems = useSelector((state) => state.cart.likeItems)
    const cartItems = useSelector((state) => state.cart.cartItems)
    const totalAmount = useSelector((state) => state.cart.totalAmount)

    return (
        <Helmet title="Favorites">
            <CommonSection title="Favorites"/>
            <section>
                <Container>
                    <Row>
                        <Col>

                        {
                            likeItems.length === 0 ? (<h2 className="fs-4 text-center">No items added to favorites</h2>) : ( 
                            <table className="table cart-table bordered">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Size</th>
                                        <th>Color</th>
                                        {/* <th>Quantity</th> */}
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        likeItems.map((item,index) => (

                                        <Tr item={item} key={index}/>

                                        ))
                                    }
                                </tbody>
                            </table>

                            )
                        }

                        </Col>

                        {/* <Col lg='3'>
                            <div>
                                <h6 className="d-flex align-items-center justify-content-between">Subtotal
                                <span className="fs-4 fw-bold">Php {totalAmount}</span>
                                </h6>
                                
                            </div>
                            <p className="fs-6 mt-2">taxes and shipping will calculate in checkout</p>
                            <div>
                                <button className="buy__btn w-100"><Link to='/checkout'>Checkout</Link></button>
                                <button className="buy__btn w-100 mt-3"><Link to='/shop'>Continue Shopping</Link></button>
                            </div>
                        </Col> */}
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
};

const Tr = ({item}) => {

    const userID = useSelector((state) => state.cart.userID)
    const likeItems = useSelector((state) => state.cart.likeItems)

    const dispatch = useDispatch()
    
    const deleteProduct = async (data) => {
        // dispatch (cartActions.deleteItem(item.id))

        const productData = _.pick(data, ['id', 'imgUrl', 'itemProductName', 'price', 'category', 'gender']);
        dispatch( cartActions.likeItem(productData) );

        try{
            const userRef = doc(db, "users", userID);
            const isLiked = _.find(likeItems, o => o.id === data.id);
            const likeData = isLiked ? _.filter(likeItems, o => o.id !== data.id) : [...likeItems, productData];
            
            await updateDoc(userRef, {
                likes: likeData
            });
            
            toast.success(`item successfully ${isLiked ? 'unliked' : 'liked'}`);
        } catch(error) {
            toast.error(error);  
        }
    }

    return (
        <tr>
            <td><img src={item.imgUrl} alt="" /></td>
            <td>{item.itemProductName}</td>
            <td>Php {item.price}</td>
            <td>{item.category}</td>
            <td> 
                {item.size ? <button type="button" className="btn btn-sm btn-dark me-3" disabled>{item.size.toUpperCase()}</button> : ''}
            </td>
            <td>
                {item.color ? <div className="color-holder" style={{ background: item.color }}></div> : ''}
            </td>            
            <td>
                <motion.i 
                    whileTap={{ scale: 1.2 }} 
                    onClick={() => deleteProduct(item)}
                    className="ri-delete-bin-5-line">
                </motion.i>
            </td>
        </tr>
    )
}

export default Cart;