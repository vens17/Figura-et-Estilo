import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { db } from "../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import useGetData from "../custom-hooks/useGetData";
import { toast } from "react-toastify";
import _ from 'lodash';

const AllProducts = () => {
    
    const navigate = useNavigate()

    const {data: users} = useGetData("users");
    const {data: productsData, loading} = useGetData("products");    

    const [reserve, setReserve] = useState([]);

    useEffect(() => {
        let items = [];
        
        _.map(_.filter(users, o => o.reserves),'reserves').map(o => {
            let item = _.find(items, n => n.id === o.id);

            if(item){
                items.quantity = items.quantity += o.quantity;
            } else items.push(o);
        });

        setReserve(_.flatten(items));    
    },[users]);

    const stock = (id) => {
        const product = _.find(productsData, o => o.id === id);
        const item = _.find(reserve, o => o.id === id);

        if(item){
            const qty = Number(product.productStock) - Number(item.quantity);
            return qty > 0 ? qty : 0;
        }

        return product.productStock;
    }

    const deleteProduct = async(id) => {
        await deleteDoc(doc(db, "products", id));
        toast.success("Deleted!");
    }

    const editProduct = (id) => {
        navigate(`/dashboard/edit-product/${id}`);
    };

    return (
        <section className="pt-0">            
                <Container>
                    <div className="d-flex justify-content-end mb-5">
                        <Link to='/dashboard/add-product'>
                            <button type="button" className="buy__btn">Add New Product</button>
                        </Link>
                    </div>

                    <Row>
                        <Col lg='12'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product Name</th>
                                        <th>Category</th>
                                        <th>Sizes</th>
                                        <th>Stocks</th>
                                        <th>Gender</th>
                                        <th>Colors</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        loading ? (<tr><td colSpan="9"><h4 className="py-5 text-center fw-bold">Loading...</h4></td></tr>) : 
                                        
                                            (productsData.map(item => (
                                                <tr key={item.id}>
                                                    <td> <img src={item.imgUrl} alt="" style={{ 'width': '80px' }}/> </td>
                                                    <td>{item.itemProductName}</td>
                                                    <td>{item.category}</td>                                                    
                                                    <td> 
                                                        {
                                                            item.sizes ?
                                                                item.sizes.map(o => 
                                                                    <button type="button" className="btn btn-sm btn-dark me-3" disabled key={o}>{o.toUpperCase()}</button>
                                                                )
                                                            : ''
                                                        }
                                                    </td>
                                                    {/* <td>{item.productStock ?? 0}</td> */}
                                                    <td>{stock(item.id)}</td>
                                                    <td>{item.gender}</td>
                                                    <td>
                                                        {
                                                            item.colors ?
                                                                item.colors.map(o => 
                                                                    <div className="color-holder" style={{ background: o }} key={o}></div>
                                                                )
                                                            : ''
                                                        }
                                                    </td>
                                                    <td>{item.price}</td>
                                                    <td> 
                                                        <button onClick={() => 
                                                            {editProduct(item.id)}} 
                                                            className="btn btn-secondary me-2">
                                                                Edit
                                                        </button> 

                                                        <button onClick={() => 
                                                            {deleteProduct(item.id)}} 
                                                            className="btn btn-danger">
                                                                Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>

                            </table>
                        </Col>
                    </Row>
                </Container>
            </section>
    );
};

export default AllProducts;