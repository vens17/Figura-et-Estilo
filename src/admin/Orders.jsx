import React from "react";
import { Container, Row, Col } from "reactstrap";
import useGetData from "../custom-hooks/useGetData";

const Users = ( ) => {

    const {data: usersData, loading} = useGetData("users");

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12' ><h4 className="fw-bold">Reservations</h4></Col>
                    <Col lg='12' className="pt-5">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Size</th>
                                    <th>Color</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    loading ? <tr><td colSpan="6"><h5 className="pt-5 fw-bold">Loading...</h5> </td></tr>
                                    : usersData?.map(user => (
                                        user.reserves && user.reserves.length ?
                                            <>
                                                <tr className="bg-light" key={user.uid}>
                                                    <td colSpan="6"><img src={user.photoURL} alt="" style={{ 'width': '30px' }}/> <b className="ms-3">{user.displayName}</b></td>
                                                </tr>
                                                {
                                                    user?.reserves.map(item => (
                                                        <tr key={item.uid}>
                                                            <td><img src={item.imgUrl} alt="" style={{ 'width': '80px' }}/></td>     
                                                            <td>{item.itemProductName}</td>
                                                            <td>{item.size ? <button type="button" className="btn btn-sm btn-dark me-3" disabled>{item.size.toUpperCase()}</button> : ''}</td>
                                                            <td>{item.color ? <div className="color-holder" style={{ background: item.color }}></div> : ''}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.price * item.quantity}</td>
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