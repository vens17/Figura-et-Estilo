import React, { useState } from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from "reactstrap";

import "../styles/shop.css";

import itemProducts from '../assets/data/itemProductsData'
import ProductList from '../components/UI/ProductsList'

const Shop = ( ) => {

    // code para sa item products na nasa store/shop
    const [productsData, setProductsData] = useState (itemProducts)

    // itong part na 'to is for category filter ng mga products
    const handleFilter = e => {

        const filterValue = e.target.value
        // for bottoms category
            if(filterValue === 'bottoms') {
                const filteredProducts = itemProducts.filter (item => item.category === 'bottoms');

                setProductsData(filteredProducts);
            }

            // for tops category
            if(filterValue === 'tops') {
                const filteredProducts = itemProducts.filter (item => item.category === 'tops');

                setProductsData(filteredProducts);
            }

            // for jumpsuit category
            if(filterValue === 'jumpsuit') {
                const filteredProducts = itemProducts.filter (item => item.category === 'jumpsuit');

                setProductsData(filteredProducts);
            }

            // for jumper category
            if(filterValue === 'jumper') {
                const filteredProducts = itemProducts.filter (item => item.category === 'jumper');

                setProductsData(filteredProducts);
            }

            // for skirts category
            if(filterValue === 'skirts') {
                const filteredProducts = itemProducts.filter (item => item.category === 'skirts');

                setProductsData(filteredProducts);
            }

            // for jorts category
            if(filterValue === 'jorts') {
                const filteredProducts = itemProducts.filter (item => item.category === 'jorts');

                setProductsData(filteredProducts);
            }

    };

    // itong part na 'to is for search naman
    const handleSearch = e => {
        const searchTerm = e.target.value

        const searchProducts = itemProducts.filter(item => item.itemProductName.toLowerCase().includes(searchTerm.toLowerCase()))

            setProductsData(searchProducts)
    }


    return (
        <Helmet title='Shop'>
            <CommonSection title="Products"/>

            <section>
                <Container>
                    <Row>
                        <Col lg='3' md='3'>
                            <div className="filter__widget">
                                <select onChange={handleFilter}>
                                <option>Clothes Category</option>
                                    <option value="bottoms">Bottoms</option>
                                    <option value="tops">Tops</option>
                                    <option value="jumpsuit">Jumpsuit</option>
                                    <option value="jumper">Jumper</option>
                                    <option value="skirts">Skirts</option>
                                    <option value="jorts">Jorts</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg='3' md='6' className="text-end">
                        <div className="filter__widget">
                                <select>
                                <option>Sort By</option>
                                    <option value="ascending">Ascending</option>
                                    <option value="descending">Descending</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg='6' md='12'>
                            <div className="search__box">
                                <input type="text" placeholder="Search" onChange={handleSearch}/>
                                <span><i class="ri-search-eye-line"></i></span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="pt=0">
                <Container>
                    <Row>
                        {
                            productsData.length === 0? <h1 className="text-center fs-4">No items found</h1>
                            : <ProductList data={productsData}/>
                        }
                    </Row>
                </Container>
            </section>

        </Helmet>
    );
};

export default Shop;