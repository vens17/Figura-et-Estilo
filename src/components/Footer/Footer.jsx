import React from "react";
import './footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = ( ) => {

    //copyright part, for date purposes
    const year = new Date().getFullYear()

    return <footer className="footer">
        <Container>
            <Row>
                <Col lg="4" className="mb-4" md="6">
                <div className="logo">
                        <div>
                            <h1>Figura et Estilo</h1>
                        </div>
                    </div>

                    <small className="footer__text mt-4">
                        Figura et Estilo is Latin for Shape and Style, embodying the essence of our Virtual Fashion Assistant. The name reflects our commitment to helping individuals embrace their unique figures and discover their personal style effortlessly.
                    </small>
                    <small className="footer__text mt-4">
                    With Figura et Estilo, we celebrate individuality while making fashion more accessible and inspiring for everyone.
                    </small>
                </Col>

                <Col lg="3" md="3" className="mb-4">
                <div className="footer__links">
                    <h4 className="links__titles">Categories</h4>
                    <ListGroup className="mb-3">
                        <ListGroupItem className="ps-0 border-0">
                            <Link to='#'>Tops</Link>
                        </ListGroupItem>

                        <ListGroupItem className="ps-0 border-0">
                            <Link to='#'>Bottoms</Link>
                        </ListGroupItem>

                        <ListGroupItem className="ps-0 border-0">
                            <Link to='#'>Skirts</Link>
                        </ListGroupItem>

                        <ListGroupItem className="ps-0 border-0">
                            <Link to='#'>Jorts</Link>
                        </ListGroupItem>

                    </ListGroup>
                </div>
                </Col>

                <Col lg="2" md="3" className="mb-4">
                <div className="footer__links">
                    <h4 className="links__titles">Useful Links</h4>
                    <ListGroup className="mb-3">
                        {/* <ListGroupItem className="ps-0 border-0">
                            <Link to="/shop">Shop</Link>
                        </ListGroupItem>

                        <ListGroupItem className="ps-0 border-0">
                            <Link to="/cart">Cart</Link>
                        </ListGroupItem> */}

                        <ListGroupItem className="ps-0 border-0">
                            <Link to="/login">Login</Link>
                        </ListGroupItem>

                        <ListGroupItem className="ps-0 border-0">
                            <a href="https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwww.websitepolicies.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fprivacy-policy-template.docx&wdOrigin=BROWSELINK" target="_blank" rel="noreferrer">Privacy Policy</a>
                        </ListGroupItem>

                    </ListGroup>
                </div>
                </Col>

                <Col lg="3" md="3">
                <div className="footer__links">
                    <h4 className="links__titles">Contacts</h4>
                    <ListGroup className="footer__contacts">
                        <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                            <span><i className="ri-map-pin-line"></i></span>
                            <p>San Andres 2, Dasmarinas City, Cavite</p>
                        </ListGroupItem>

                        <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                        <span><i className="ri-contacts-book-line"></i></span>
                        <p>+639159623478</p>
                        </ListGroupItem>

                        <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                        <span><i className="ri-mail-open-line"></i></span>
                        <p>figuraestilo@gmail.com</p>
                        </ListGroupItem>

                    </ListGroup>
                </div>
                </Col>
                <Col lg='12'>
                <p className="footer__copyright">Copyright {year}. All rights reserved.</p>
                </Col>
            </Row>
        </Container>
    </footer>
};

export default Footer;