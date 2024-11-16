
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";

const ContactUs = () => {
    return (
        <Helmet title={'Contact Us'}>
            <section className="hero__section">
                <Container>
                    <div className="hero__content text-center">
                        <h2 className="section__title mb-0">Contact Us</h2>
                        <p>Get in touch and let us know how we can help.</p>

                    <Row className="mt-5">
                            <Col md='4'>
                                <div className="card">
                                    <span className="fav__icon" style={{ fontSize: '5.5em' }}><i className="ri-mail-line"></i></span>
                                    <p className="card-text">Email Address</p>
                                    <div className="card-body">                                   
                                        <h5 className="card-title"><br />figuraestilo@gmail.com</h5>
                                    </div>
                                </div>
                            </Col>
                            
                            <Col md='4'>
                                <div className="card">
                                    <span className="fav__icon" style={{ fontSize: '5.5em' }}><i className="ri-map-pin-line"></i></span>
                                    <p className="card-text">Location</p>
                                    <div className="card-body">
                                        <h5 className="card-title">San Andres 2, <br /> Dasmarinas City, Cavite</h5>
                                    </div>
                                </div>
                            </Col>

                            <Col md='4'>
                                <div className="card">
                                    <span className="fav__icon" style={{ fontSize: '5.5em' }}><i className="ri-phone-line"></i></span>
                                    <p className="card-text">Contact Number</p>
                                    <div className="card-body">                                    
                                        <h5 className="card-title">+639159623478 <br /> (484) 9057</h5>
                                    </div>
                                </div>
                            </Col>
                    </Row>
                    </div>
                </Container>
            </section>
        </Helmet>
    )
}

export default ContactUs