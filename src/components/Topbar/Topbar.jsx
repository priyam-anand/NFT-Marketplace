import React from 'react'
import { Nav, Navbar, Container, } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./Topbar.css";

const Topbar = () => {
    return (
        <div className="fixed-top">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>
                        <Link to="/" className="topbar-links">
                            NFT Marketplace
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="nav-links">
                            <Nav.Link as={Link} to="/explore">
                                <span className='topbar-links'>
                                    Explore
                                </span>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/my-collection">
                                <span className="topbar-links">
                                    My Collection
                                </span>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/add-item">
                                <span className="topbar-links">
                                    Add Item
                                </span>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/create-nft">
                                <span className="topbar-links">
                                    Create NFT
                                </span>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Topbar
