import React, { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/checkout.css";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../custom-hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { cartActions } from "../redux/slices/cartSlice";
import { updateDoc, arrayUnion, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import _ from 'lodash';

const Checkout = ( ) => {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const { currentUser } = useAuth(); 
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',   
        city: '',
        postal: '',
        country: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const cartItems = useSelector(state => state.cart.cartItems)
    const totalQty = useSelector(state => state.cart.totalQuantity)
    const totalAmount = useSelector(state => state.cart.totalAmount)

    const checkout = async () => {       
        try{
            const userRef = doc(db, "users", currentUser.uid);
            
            await updateDoc(userRef, {
                cart: arrayUnion(...cartItems),
                billing: formData
            });

            resetForm();

            toast.success("Order successfully placed.");
            navigate('/home');
        } catch(error) {
            toast.error(error);  
        }
    }

    const resetForm = () => {
        dispatch( cartActions.resetCart() );
        _.mapKeys(formData, (v, key) => { setFormData({ ...formData, [key]: '' }) })
    }

    return (
        <Helmet title="Checkout">
            <CommonSection title="Checkout"/>
            <section>
                <Container>
                    <Row>
                        <Col lg='8'>
                            <h6 className="mb-4 fw-bold">Billing Information</h6>
                            <Form className="billing_form">
                                <FormGroup className="form__group">
                                    <input type="text" placeholder="Enter your name" id="name" value={formData.name} onChange={handleChange}/>
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input type="email" placeholder="Enter your email" id="email" value={formData.email} onChange={handleChange}/>
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input type="number" placeholder="Phone number" id="phone" value={formData.phone} onChange={handleChange}/>
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input type="text" placeholder="Address" id="address" value={formData.address} onChange={handleChange}/>
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input type="text" placeholder="City" id="city" value={formData.city} onChange={handleChange}/>
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input type="text" placeholder="Postal Code" id="postal" value={formData.postal} onChange={handleChange}/>
                                </FormGroup>

                                <FormGroup className="form__group">
                                    <input type="text" placeholder="Country" id="country" value={formData.country} onChange={handleChange}/>
                                </FormGroup>
                            </Form>
                        </Col>

                        <Col lg='4'>
                            <div className="checkout__cart">
                                <h6>Total Quantity: <span>{totalQty} items</span></h6>
                                <h6>Subtotal: <span>Php {totalAmount}</span></h6>
                                <h6>
                                    <span>
                                        Shipping: <br />
                                        free shipping
                                    </span> 
                                    <span>
                                        Php 0
                                    </span>
                                </h6>
                                <h4>Total Cost: <span>Php {totalAmount}</span></h4>
                                <button type="submit" className="buy__btn auth__btn w-100" onClick={checkout}>Place Order</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
};

export default Checkout;