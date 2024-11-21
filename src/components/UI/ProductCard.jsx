import React from 'react';
import _ from 'lodash';

import { motion } from 'framer-motion';
import "../../styles/product-card.css";
import { Col } from "reactstrap";
import ARButton from "../UI/ArButton"; // Import the AR Button
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from "react-redux";
import { cartActions } from '../../redux/slices/cartSlice';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const userID = useSelector((state) => state.cart.userID);
  const likeItems = useSelector((state) => state.cart.likeItems);

  // Function to handle the virtual try-on
  const handleTryOn = (imageUrl) => {
    console.log("Trying on with image:", imageUrl);
    // Integrate your virtual try-on logic here
    // Example: send the image URL to a backend or API
  };

  const addToCart = async (data) => {
    const productData = _.pick(data, [
      'id',
      'imgUrl',
      'itemProductName',
      'price',
      'category',
      'gender',
    ]);
    dispatch(cartActions.likeItem(productData));

    try {
      const userRef = doc(db, "users", userID);
      const isLiked = _.find(likeItems, (o) => o.id === data.id);
      const likeData = isLiked
        ? _.filter(likeItems, (o) => o.id !== data.id)
        : [...likeItems, productData];

      await updateDoc(userRef, {
        likes: likeData,
      });

      toast.success(`Item successfully ${isLiked ? "unliked" : "liked"}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Col lg="3" md="4" className="mb-2">
  

      <Link to={`/shop/${item.id}`}>
      <div className="product__item">
<<<<<<< HEAD
        <Link to={`/shop/${item.id}`}>
          <div className="product__img">
            <motion.img
              whileHover={{ scale: 0.9 }}
              src={item.imgUrl}
              alt={item.itemProductName}
            />
          </div>
          <div className="p-2 product__info">
            <h3 className="product__name">
            {item.itemProductName}
            </h3>
            <span>{item.category}</span>
          </div>
        </Link>
=======
        <div className="product__img">
          <motion.img
            whileHover={{ scale: 0.9 }}
            src={item.imgUrl}
            alt={item.itemProductName}
          />
        </div>
        <div className="p-2 product__info">
          <h3 className="product__name">
         {item.itemProductName}
          </h3>
          <span>{item.category}</span>
        </div>
>>>>>>> ff0b06b (AR)
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">Php {item.price}</span>
          {/* Pass the image URL and handleTryOn function to ARButton */}
          <ARButton itemImage={item.imgUrl} onTryOn={handleTryOn} />
          {!_.includes(window.location.pathname, "home") && (
            <motion.span
              whileTap={{ scale: 1.2 }}
              onClick={() => addToCart(item)}
            >
              <i
                className={`ri-heart-${
                  _.find(likeItems, (o) => o.id === item.id) ? "fill" : "line"
                } ${
                  _.find(likeItems, (o) => o.id === item.id) ? "bg-danger" : ""
                }`}
              ></i>
            </motion.span>
          )}
        </div>
      </div></Link>
    </Col>
  );
};

export default ProductCard;
