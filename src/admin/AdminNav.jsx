import React, { useRef } from "react";
import { Container, Row } from "reactstrap";
import useAuth from "../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import "../styles/admin-nav.css";
import { NavLink, useNavigate } from "react-router-dom";

const admin__nav = [
    {
        display: 'Dashboard',
        path: '/dashboard'
    },

    {
        display: 'All-Products',
        path: '/dashboard/all-products'
    },

    // {
    //     display: 'Orders',
    //     path: '/dashboard/orders'
    // },

    {
        display: 'Users',
        path: '/dashboard/users'
    },
]

const AdminNav = () => {

    const {currentUser} = useAuth()

    const navigate = useNavigate();

    const profileActionRef = useRef(null)

    const toggleProfileActions = () => profileActionRef.current.classList.toggle('show__profileActions')

    const logout = () => {
        signOut(auth).then(() => {
            toast.success('Logged Out')
            navigate("/home")
        }).catch( err => {
            toast.error(err.message)
        })
    }

    return (
    <>
        <header className="admin__header">
            <div className="admin__nav-top">
                <Container>
                    <div className="admin__nav-wrapper-top">
                        <div className="logo">
                            <h2>Figura et Estilo</h2>
                        </div>
                        
                        <div className="search__box">
                            <input type="text" placeholder="Search..." />
                            <span><i className="ri-search-2-line"></i></span>
                        </div>

                        <div className="admin__nav-top-right">
                            {/* <span><i className="ri-notification-4-line"></i></span>
                            <span><i className="ri-settings-5-line"></i></span> */}
                            <img src={ currentUser && currentUser.photoURL} alt="" onClick={toggleProfileActions}/>
                            
                            <div className="profile__actions" ref={profileActionRef} onClick={toggleProfileActions}>
                                {
                                    currentUser ? <span onClick={logout}>Logout</span> : ''
                                }
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </header>

        <section className="admin__menu p-0">
            <Container>
                {
                    currentUser?.type === 'seller' ? 
                        <Row>
                            <div className="admin__navigation">
                                <ul className="admin__menu-list">
                                    {
                                        admin__nav.map((item, index) => (
                                            <li className="admin__menu-item" key={index}>
                                                <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__admin-menu' : '' } >
                                                    {item.display} </NavLink>
                                            </li>

                                        ))
                                    }
                                </ul>
                            </div>
                        </Row>
                    : ''
                    
                }
                {
                    currentUser?.type === 'buyer' ?
                        <div className="p-3 text-center">
                            <h3>Oops.. You don't have access to this page. </h3>
                        </div>
                    : ''
                }
            </Container>
        </section>

    </>
    )
};

export default AdminNav;