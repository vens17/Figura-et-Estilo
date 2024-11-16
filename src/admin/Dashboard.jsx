import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/dashboard.css";
import useGetData from "../custom-hooks/useGetData";
import _ from 'lodash';

const Dashboard = () => {

    const {data: products} = useGetData("products"); 
    const {data: users} = useGetData("users");

    const [orders, setOrder] = useState([]);

    useEffect(() => {
        setOrder(_.flatten(_.map(_.filter(users, o => o.cart), 'cart')))
    }, [users, setOrder])

    return (
    <>
        <section>
            <Container>
                <Row>
                    {/* <Col className="lg-3">
                        <div className="revenue__box">
                            <h5>Total Sales</h5>
                            <span>Php { _.sum(_.map(orders, o => Number(o.totalPrice))) }</span>
                        </div>
                    </Col> */}

                    {/* <Col className="lg-3">
                        <div className="order__box">
                            <h5>Orders</h5>
                            <span>{ _.sum(_.map(orders, 'quantity')) }</span>
                        </div>
                    </Col> */}
                    
                    <Col className="lg-3">
                        <div className="user__box">
                            <h5>Total Users</h5>
                            <span>{users.length}</span>
                        </div>
                    </Col>

                    <Col className="lg-3">
                        <div className="revenue__box">
                            <h5>Total Likes</h5>
                            <span>{ _.sum(_.map(orders, o => Number(o.totalPrice))) }</span>
                        </div>
                    </Col>

                    <Col className="lg-3">
                        <div className="product__box">
                            <h5>Total Products</h5>
                            <span>{products.length}</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
    )
};

export default Dashboard;