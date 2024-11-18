import React, {useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";

import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import "../styles/product-details.css";
import { motion } from "framer-motion";
import ProductsList from '../components/UI/ProductsList'
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";
import _ from 'lodash';

const ProductDetails = ( ) => {
    
    const userID = useSelector((state) => state.cart.userID)
    const likeItems = useSelector((state) => state.cart.likeItems)
    
    const [product, setProduct] = useState({})
    const [tab, setTab] = useState("desc");
    const reviewUser = useRef("");
    const reviewMsg = useRef("");
    const dispatch = useDispatch()

    const [rating, setRating] = useState(null)
    const [color, setcolor] = useState(null)
    const [size, setSize] = useState(null)

    const {id} = useParams();

    const {data: products} = useGetData('products')

    useEffect(() => {
        const docRef = doc(db, 'products', id)
        const getProduct = async() => {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProduct(docSnap.data())
            }

            else {
                console.log('no product')
            }
        }

        getProduct();

    }, [id])

    const {
            imgUrl, 
            itemProductName, 
            price, 
            avgRating, 
            reviews, 
            productDesc, 
            shortDesc, 
            category,
            colors,
            gender,
            sizes
        } = product;

    const relatedProducts = products.filter(item => item.category === category);

    const submitHandler = (e) => {
        e.preventDefault()

        const reviewUserName = reviewUser.current.value;
        const reviewUserMsg = reviewMsg.current.value;

        const reviewObj = {
            userName: reviewUserName,
            text: reviewUserMsg,
            rating,
        };

        console.log(reviewObj);
        toast.success("feedback submitted")
    };

   

    const addToCart = async () => {
        const productData = { id, imgUrl, itemProductName, price, category, gender};
        dispatch( cartActions.likeItem(productData) );

        try{
            const userRef = doc(db, "users", userID);
            const isLiked = _.find(likeItems, o => o.id === id);
            const likeData = isLiked ? _.filter(likeItems, o => o.id !== id) : [...likeItems, productData];
            
            await updateDoc(userRef, {
                likes: likeData
            });
            
            toast.success(`item successfully ${isLiked ? 'unliked' : 'liked'}`);
        } catch(error) {
            toast.error(error);  
        }

        // dispatch(
        //     cartActions.addItem({
        //         id,
        //         imgUrl,
        //         itemProductName,
        //         price,
        //         color,
        //         size
        //     })
        // );

        // toast.success("item added successfully to the cart");        
    };

    useEffect( () => {
        window.scrollTo(0,0)
    }, [product] )

    return (
        <Helmet title={itemProductName}>
        <CommonSection title={itemProductName}/>

            <section className="pt-0">
                <Container>
                    <Row>
                        <Col lg="6">
                            <img src={imgUrl} alt="" />
                        </Col>
                        <Col lg="6">
                            <div className="product__details">
                                <h2>{itemProductName}</h2>
                                <div className="product__rating d-flex align-items-center gap-5 mb-4">
                                    <div>
                                    <span>
                                        <i className="ri-star-fill"></i>
                                    </span>
                                    <span>
                                        <i className="ri-star-fill"></i>
                                    </span>
                                    <span>
                                        <i className="ri-star-fill"></i>
                                    </span>
                                    <span>
                                        <i className="ri-star-fill"></i>
                                    </span>
                                    <span>
                                        <i className="ri-star-half-s-line"></i>
                                    </span>
                                    </div>

                                    <p>
                                       (<span>{avgRating}</span> ratings) 
                                    </p>
                                    
                                </div>

                                <h3 className="product__price mb-4">Php {price}</h3>

                                <div className="d-flex align-items-center gap-5 mb-3">
                                    <span>Category: {category?.toUpperCase()}</span>
                                    { gender ? <button type="button" className="btn btn-sm btn-dark me-3" disabled>{gender?.toUpperCase()}</button> : '' }
                                </div>

                                {
                                    sizes ? 
                                    <div className="mb-4">
                                        <h6 className="mb-3" style={{ fontWeight: '600' }}>Sizes</h6>
                                        
                                        {
                                            sizes.map(o => (
                                                <div className="form-check form-check-inline" key={o}>
                                                    <input className="form-check-input" type="radio" name="size-options" id={o} value={o} onClick={e => setSize(e.target.value)} />
                                                    <label className="form-check-label" htmlFor={o}>{ o.toUpperCase() }</label>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    : ''
                                }

                                {
                                    colors ? 
                                    <div className="mb-4">
                                        <h6 className="mb-3" style={{ fontWeight: '600' }}>Colors</h6>
                                        
                                        {
                                            colors.map(o => (
                                                <div className={o === color ? 'color-holder active' : 'color-holder'} style={{ background: o, cursor: 'pointer' }} onClick={() => setcolor(o)} key={o}></div>
                                            ))
                                        }
                                    </div>
                                    : ''
                                }

                                <p className="mt-3">{shortDesc}</p>

                                <motion.button whileTap={{ scale: 1.2 }} className={_.find(likeItems, o => o.id === id) ? 'btn btn-danger mt-5' : 'buy__btn'} onClick={addToCart}> 
                                    <i className={`ri-heart-${_.find(likeItems, o => o.id === id) ? 'fill' : 'line'} mt-3`}></i> {_.find(likeItems, o => o.id === id) ? 'Liked' : 'Like'}
                                </motion.button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <div className="tab__wrapper d-flex align-items-center gap-5">
                                <h6 className={`${tab === "desc" ? "active__tab" : ""}`} 
                                onClick={() => setTab('desc')}>Description</h6>
                                <h6 className={`${tab === "rev" ? "active__tab" : ""}`}
                                onClick={() => setTab('rev')}> 

                                Reviews ({reviews?.length})
                                
                                </h6>
                            </div>


                            {
                                tab === 'desc' ? <div className="tab__content mt-5">
                                <p>{productDesc}</p>
                            </div> : (<div className="product__review mt-5">
                                <div className="review__wrapper">
                                    {/*<ul>
                                        {
                                            reviews?.map((item,index) => (
                                                <li kew={index} className="mb-4">

                                                    <h6>France</h6>

                                                    <span>{item.rating} ( rating)</span>
                                                    <p>{item.text}</p>
                                                </li>
                                            ))
                                        }
                                    </ul>*/}

                                    <div className="review__form">
                                    <h4>Leave your experience</h4>
                                        <form action="" onSubmit={submitHandler}>
                                            <div className="form__group">
                                                <input type="text" placeholder="Enter Name" ref={reviewUser} required/>
                                            </div>

                                            <div className="form__group d-flex align-items-center gap-5 rating__group">
                                                <motion.span whileTap={{scale:1.2}} onClick={() => setRating(1)}>1<i className="ri-star-s-fill"></i></motion.span>
                                                <motion.span whileTap={{scale:1.2}} onClick={() => setRating(2)}>2<i className="ri-star-s-fill"></i></motion.span>
                                                <motion.span whileTap={{scale:1.2}} onClick={() => setRating(3)}>3<i className="ri-star-s-fill"></i></motion.span>
                                                <motion.span whileTap={{scale:1.2}} onClick={() => setRating(4)}>4<i className="ri-star-s-fill"></i></motion.span>
                                                <motion.span whileTap={{scale:1.2}} onClick={() => setRating(5)}>5<i className="ri-star-s-fill"></i></motion.span>
                                            </div>

                                            <div className="form__group">
                                                <textarea
                                                ref={reviewMsg}
                                                 rows={4}
                                                 type="text"
                                                 placeholder="Enter Review Message" required/>
                                            </div>

                                            <motion.button
                                            whileTap={{scale:1.2}}
                                            type="submit"
                                            className="buy__btn">Submit</motion.button>

                                        </form>

                                    </div>
                                </div>
                            </div>
                            )}

                        </Col>

                        <Col lg='12' className="mt-5">
                            <h2 className="related__title">You may also like</h2>
                        </Col>
                        <ProductsList data={relatedProducts}/>
                    </Row>
                </Container>
            </section>

    </Helmet>
    )
};

export default ProductDetails;