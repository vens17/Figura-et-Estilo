import React from 'react';
import _ from 'lodash';

import { motion } from 'framer-motion';

import "../../styles/product-card.css";
import { Col } from "reactstrap";

import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from "react-redux";
import { cartActions } from '../../redux/slices/cartSlice';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

const ProductCard = ( {item} ) => {

const dispatch = useDispatch()

const userID = useSelector((state) => state.cart.userID)
const likeItems = useSelector((state) => state.cart.likeItems)

const addToCart = async (id) => {
    dispatch( cartActions.likeItem({ id }) );

    try{
        const userRef = doc(db, "users", userID);
        const isLiked = _.includes(likeItems, id);
        const likeData = isLiked ? _.filter(likeItems, o => o !== id) : [...likeItems, id];
        
        await updateDoc(userRef, {
            likes: likeData
        });
        
        toast.success(`item successfully ${isLiked ? 'unliked' : 'liked'}`);
    } catch(error) {
        toast.error(error);  
    }

    // dispatch(
    //      cartActions.addItem({
    //         id: item.id,
    //         productName: item.itemProductName,
    //         price: item.price,
    //         imgUrl: item.imgUrl,
    //     })
    // );

    // toast.success('item added successfully to the cart')

};

    return (
        <Col lg='3' md='4' className="mb-2">
            <div className="product__item" >
            <div className="product__img">
                <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" />
            </div>
            <div className="p-2 product__info">
            <h3 className="product__name"><Link to={`/shop/${item.id}`}>{item.itemProductName}</Link></h3>
            <span>{item.category}</span>    
            </div>
            <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
                <span className="price">Php {item.price}</span>

                {
                    !_.includes(window.location.pathname, 'home') ?
                        <motion.span whileTap={{ scale: 1.2 }}  onClick={() => addToCart(item.id)}>
                            <i className={`ri-heart-${_.includes(likeItems, item.id) ? 'fill' : 'line'} ${_.includes(likeItems, item.id) ? 'bg-danger' : ''}`}></i>
                        </motion.span>
                    : ''
                }
            </div>
        </div>
        </Col>
    );
};

export default ProductCard;