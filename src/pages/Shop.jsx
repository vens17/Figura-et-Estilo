import React, {useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CommonSection from "../components/UI/CommonSection";
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from "reactstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.config";
import _ from 'lodash';

import "../styles/shop.css";

// import itemProducts from '../assets/data/itemProductsData'
import ProductList from '../components/UI/ProductsList'

const Shop = ( ) => {

    const { category } = useParams();

    // code para sa item products na nasa store/shop
    const [productsData, setProductsData] = useState ([])

    const [filteredProducts, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getProduct = async() => {
            setLoading(true);
            const docSnap = await getDocs(collection(db, 'products'));
          
            let data = [];
            await docSnap.forEach((doc) => {
                data.push(_.merge({ 'id': doc.id }, doc.data()));
            });

            if(category){
                if(_.includes(['men', 'woman', 'unisex'], category)){
                    setProductsData(_.filter(data, o => _.includes([category, 'unisex'], o.gender)))
                    setProducts(_.filter(data, o => _.includes([category, 'unisex'], o.gender)))
                }
    
                if(category === 'kids'){
                    setProductsData(_.filter(productsData, o => o.forKids))
                    setProducts(_.filter(productsData, o => o.forKids))
                }
    
                if(category === 'accessories'){
                    setProductsData(_.filter(data, o => o.category === category))
                    setProducts(_.filter(data, o => o.category === category))
                }
            } else {
                setProducts(data)
                setProductsData(data)
            }
            setLoading(false);
        }

        getProduct();
    }, [category])

    // itong part na 'to is for category filter ng mga products
    const handleFilter = e => {
        const filterValue = e.target.value

        if(filterValue) {
            setProducts(_.filter(productsData, o => o.category === filterValue));
        } else setProducts(productsData);
        
        // // for bottoms category
        //     if(filterValue === 'bottoms') {
        //         const filteredProducts = productsData.filter (item => item.category === 'bottoms');

        //         setProductsData(filteredProducts);
        //     }

        //     // for tops category
        //     if(filterValue === 'tops') {
        //         const filteredProducts = productsData.filter (item => item.category === 'tops');

        //         setProductsData(filteredProducts);
        //     }

        //     // for jumpsuit category
        //     if(filterValue === 'jumpsuit') {
        //         const filteredProducts = itemProducts.filter (item => item.category === 'jumpsuit');

        //         setProductsData(filteredProducts);
        //     }

        //     // for jumper category
        //     if(filterValue === 'jumper') {
        //         const filteredProducts = itemProducts.filter (item => item.category === 'jumper');

        //         setProductsData(filteredProducts);
        //     }

        //     // for skirts category
        //     if(filterValue === 'skirts') {
        //         const filteredProducts = itemProducts.filter (item => item.category === 'skirts');

        //         setProductsData(filteredProducts);
        //     }

        //     // for jorts category
        //     if(filterValue === 'jorts') {
        //         const filteredProducts = itemProducts.filter (item => item.category === 'jorts');

        //         setProductsData(filteredProducts);
        //     }

    };

    // itong part na 'to is for search naman
    const handleSearch = e => {
        const searchTerm = e.target.value

        if(searchTerm) {
            setProducts(_.filter(productsData, o => _.includes(o.itemProductName?.toLowerCase(), searchTerm.toLowerCase())));
        } else setProducts(productsData);

        // const searchProducts = itemProducts.filter(item => item.itemProductName.toLowerCase().includes(searchTerm.toLowerCase()))

        // setProductsData(searchProducts)
    }

    const handleSortFilter = e => {
        const filterValue = e.target.value

        if(filterValue === 'ascending') {
            setProducts(_.sortBy(filteredProducts, 'price'));
        } else if(filterValue === 'descending') {
            setProducts(_.sortBy(filteredProducts, 'price').reverse());
        } else setProducts(productsData);
    }


    return (
        <Helmet title='Shop'>
            <CommonSection title={category ? category.toUpperCase() : "Products"}/>

            <section>
                <Container>
                    <Row>
                        <Col lg='3' md='3'>
                            <div className="filter__widget">
                                <select onChange={handleFilter}>
                                    <option value="">Category</option>
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
                                <select onChange={handleSortFilter}>
                                    <option value="">Sort By</option>
                                    <option value="ascending">Lowest to Highest</option>
                                    <option value="descending">Highest to Lowest</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg='6' md='12'>
                            <div className="search__box">
                                <input type="text" placeholder="Search" onChange={handleSearch}/>
                                <span><i className="ri-search-eye-line"></i></span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="pt=0">
                <Container>
                    {
                        loading ? (<h4 className="py-5 ">Loading...</h4>) : 
                        (
                            <Row>
                                {
                                    filteredProducts.length === 0? <h1 className="text-center fs-4">No items found</h1>
                                    : <ProductList data={filteredProducts}/>
                                }
                            </Row>
                        )
                    }                   
                </Container>
            </section>

        </Helmet>
    );
};

export default Shop;