import React, {useRef, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import './header.css'
import {motion} from 'framer-motion'
import logo from '../../assets/images/fei-logo.png'
import userIcon from '../../assets/images/user-icon.png'
import { Container, Row } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../redux/slices/cartSlice";
import useAuth from "../../custom-hooks/useAuth";
import { Link } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { signOut, deleteUser } from "firebase/auth";
import { db, auth } from "../../firebase.config";
import { toast } from "react-toastify";

const nav__links = [
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'category/men',
        display: 'Men'
    },
    {
        path: 'category/woman',
        display: 'Woman'
    },
    {
        path: 'category/kids',
        display: 'Kids'
    },
    {
        path: 'category/accessories',
        display: 'Accessories'
    },
    {
        path: 'about-us',
        display: 'About Us'
    },
    {
        path: 'contact-us',
        display: 'Contact Us'
    },
]

const Header = ( ) => {

    const headerRef = useRef(null);
    const profileActionRef = useRef(null)
    const menuRef = useRef(null);

    const dispatch = useDispatch()

    const navigate = useNavigate();
    
    const{ currentUser } = useAuth();

    // const totalQuantity = useSelector(state => state.cart.totalQuantity)
    const likeItems = useSelector((state) => state.cart.likeItems)
    const reserveItems = useSelector((state) => state.cart.reserveItems)

    const stickyHeaderFunc = () => {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 80 || 
                document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add("sticky__header");
            }
            else {
                headerRef.current.classList.remove("sticky__header");
            }
        })
    }

    const logout = () => {
        signOut(auth).then(() => {
            toast.success('Logged Out')
            navigate("/home")
        }).catch( err => {
            toast.error(err.message)
        })
    }

    const deleteAccount = async () => {
        await deleteDoc(doc(db, 'users', currentUser.uid));
        
        deleteUser(currentUser).then(() => {
            toast.success('Account successfully deleted')
            navigate("/home")
        }).catch( err => {
            toast.error(err.message)
        })
    }

    useEffect(() => {
        stickyHeaderFunc()

        if(currentUser){
            dispatch( cartActions.setAuth(currentUser.uid) );
        }

        if(currentUser?.likes){
            dispatch( cartActions.setLikeItem(currentUser.likes) );
        }

        if(currentUser?.reserves){
            dispatch( cartActions.setReserveItem(currentUser.reserves) );
        }

        return () => window.removeEventListener("scroll", stickyHeaderFunc);
    }, [currentUser, dispatch]);

    const menuToggle = () => menuRef.current.classList.toggle('active__menu')

    const navigateToCart = () => {
        navigate("/favorites");
    };

    const navigateToReserves = () => {
        navigate("/reserves");
    };

    const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions')

    return ( 
        <header className="header" ref={headerRef}>
        <Container>
            <Row>
                <div className="nav__wrapper">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <div>
                            <h1>Figura et Estilo</h1>
                        </div>
                    </div>

                    <div className="navigation" ref={menuRef} onClick={menuToggle}>
                        <ul className="menu">
                            
                            {
                                nav__links.map((item, index) => (
                                    <li className="nav__item" key={index}>
                                        <NavLink to={item.path} className={(navClass) => navClass.isActive ? 'nav__active' : ''} > {item.display}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="nav__icons">

                        <span className="fav__icon" onClick={navigateToReserves}>
                            <i className="ri-price-tag-3-line"></i>
                            <span className="like-badge">{reserveItems.length}</span>
                        </span>

                        <span className="fav__icon" onClick={navigateToCart}>
                            <i className="ri-heart-line"></i>
                            <span className="like-badge">{likeItems.length}</span>
                        </span>
                        {/* <span className="cart__icon" onClick={navigateToCart}><i className="ri-shopping-bag-line"></i>
                        <span className="badge">{totalQuantity}</span>
                        </span> */}


                        <div className="profile">
                            <motion.img 
                                whileTap={{ scale: 1.2 }} 
                                src={currentUser ? currentUser.photoURL : userIcon} 
                                alt=""
                                onClick={toggleProfileActions}
                            />

                            <div className="profile__actions" ref={profileActionRef}
                            onClick={toggleProfileActions}
                            >
                                {
                                    currentUser ? ( 
                                        <div className="d-flex align-items-center justify-content-center flex-column">
                                            <span onClick={deleteAccount}>Delete Account</span>
                                            <span onClick={logout}>Logout</span>
                                        </div>
                                     ) : (
                                    <div className="d-flex align-items-center justify-content-center flex-column">
                                        <Link to='/signup'>Signup</Link>
                                        <Link to='/login'>Login</Link>
                                        <Link to='/dashboard'>Dashboard</Link>
                                    </div>
                                    )
                                }
                            </div>

                        </div>

                        <div className="mobile__menu">
                            <span onClick={menuToggle}>
                            <i className="ri-menu-line"></i>
                            </span>
                        </div>
                    </div>
                    
                </div>
            </Row>
        </Container>
    </header>
    )
};

export default Header;