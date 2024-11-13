import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";

const Users = ( ) => {

    const {data: usersData, loading} = useGetData("users");

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12' ><h4 className="fw-bold">Orders</h4></Col>
                    <Col lg='12' className="pt-5">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    loading ? <tr><td colSpan="4"><h5 className="pt-5 fw-bold">Loading...</h5> </td></tr>
                                    : usersData?.map(user => (
                                        user.cart && user.cart.length ?
                                            <>
                                                <tr className="bg-light" key={user.uid}>
                                                    <td colSpan="4"><img src={user.photoURL} alt="" style={{ 'width': '30px' }}/> <b className="ms-3">{user.displayName}</b></td>
                                                </tr>
                                                {
                                                    user?.cart.map(item => (
                                                        <tr key={item.uid}>
                                                            <td><img src={item.imgUrl} alt="" style={{ 'width': '80px' }}/></td>     
                                                            <td>{item.productName}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.totalPrice}</td>
                                                        </tr>
                                                    ) )      
                                                }
                                            </>                                 
                                        : ''                                        
                                    ) )
                                }
                            </tbody>

                        </table>
                    </Col>
                </Row>
            </Container>
        </section>
    )
};

export default Users;