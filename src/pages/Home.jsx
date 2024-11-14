import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Helmet from "../components/Helmet/Helmet";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import clothesImg from '../assets/images/group-clothes.png'
import ProductsList from "../components/UI/ProductsList";
import Clock from "../components/UI/Clock";
import useGetData from "../custom-hooks/useGetData";

const Home = ( ) => {

    const {data: products, loading} = useGetData('products')

    //ito naman for itemsData or para sa products
    // const [trendingProducts, setTrendingProducts] = useState([])
    // const [bestSalesItems, setBestSalesItems] = useState([])

    // ito naman for itemsData or para sa products sa part ng new arrivals
    // const [jumpsuitProducts, setJumpsuitProducts] = useState([])
    // const [skirtsProducts, setSkirtsProducts] = useState([])
    // const [popularProducts, setPopularProducts] = useState([])

    // sa may homepage 'to
    const year = new Date().getFullYear()

    // useEffect(() =>
    //     {
    //         // tops
    //         const filteredTrendingProducts = products.filter((item) => item.category);

    //         //jorts
    //         const filteredBestSalesItems = products.filter((item) => item.category);

    //         //jumpsuits
    //         const filteredJumpsuitProducts = products.filter((item) => item.category);

    //         //skirts
    //         const filteredSkirtProducts = products.filter((item) => item.category);

    //         //jumper && popular products
    //         const filteredJumperProducts = products.filter((item) => item.category);

    //         setTrendingProducts(filteredTrendingProducts);
    //         setBestSalesItems(filteredBestSalesItems);
    //         setSkirtsProducts(filteredSkirtProducts);
    //         setJumpsuitProducts(filteredJumpsuitProducts);
    //         setPopularProducts(filteredJumperProducts);

    //     }, [products] );

    return <Helmet title={'Home'}>
        <section className="hero__section">
            <Container>
                <Row>
                    <Col lg='6' md='6'>
                        <div className="hero__content">
                            <p className="hero__subtitle">Trending Products in {year}</p>
                            <h2>Simplicity is Sophistication.</h2>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            </p>

                            <motion.button whileTap={{ scale: 1.2 }} className="buy__btn"><Link to='/shop'>SHOP NOW</Link></motion.button>

                        </div>
                    </Col>

                    <Col lg='6' md='6'>
                        <div className="hero__img">
                            <img src={clothesImg} alt="" />
                        </div>
                    </Col>

                </Row>
            </Container>
        </section>

        <section className="trending__products">
            <Container>
                <Row>
                    <Col lg='12' className="text-center">
                        <h2 className="section__title">Product Trends</h2>
                    </Col>

                    {
                        loading ? (<h5 className="fw-bold">Loading...</h5>) :
                        (<ProductsList data={products}/>)
                    }

                </Row>
            </Container>
        </section>


        <section className="best__sales">
            <Container>
            <Row>
                    <Col lg='12' className="text-center">
                        <h2 className="section__title">Best Sales</h2>
                    </Col>

                    {
                        loading ? (<h5 className="fw-bold">Loading...</h5>) :
                        (<ProductsList data={products}/>)
                    }

                </Row>
            </Container>
        </section>

        <section className="timer__count">
            <Container>
                <Row>
                    <Col lg='6' md='12' className="count__down-col">

                    <div className="timerClock__top-content">
                        <h4 className="mb-2">Limited Product Offers</h4>
                        <h3 className="mb-3">Product Sale!</h3>
                    </div>
                        <Clock />

                        <motion.button 
                        whileTap={{ scale: 1.2 }} 
                        className="buy__btn store__btn">

                            <Link to="/shop">Visit Store</Link>

                        </motion.button>

                    </Col>

                    <Col lg='6' md='12' className="text-end counter__img">
                    <img src={clothesImg} alt="" />
                    </Col>
                </Row>
            </Container>
        </section>

        <section className="new__arrival">
            <Container>
                <Row>
                <Col lg='12' className="text-center mb-5">
                        <h2 className="section__title">New Arrivals</h2>
                    </Col>

                    {
                        loading ? (<h5 className="fw-bold">Loading...</h5>) :
                        (<ProductsList data={products}/>)
                    }

                </Row>
            </Container>
        </section>

        <section className="popular__category">
        <Container>
                <Row>
                <Col lg='12' className="text-center mb-5">
                        <h2 className="section__title">Popular Products</h2>
                    </Col>

                    {
                        loading ? (<h5 className="fw-bold">Loading...</h5>) :
                        (<ProductsList data={products}/>)
                    }

                </Row>
            </Container>
        </section>

    </Helmet>;
};

export default Home;