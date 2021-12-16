import React from 'react'
import { Nav, Navbar, Container, } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./Topbar.css";

const Topbar = () => {
    return (
        <div>
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
                            <Nav.Link>
                                <Link to="/market" className="topbar-links">
                                    Marketplace
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/my-nft" className="topbar-links">
                                    My NFTs
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/add-item" className="topbar-links">
                                    Add Item
                                </Link>
                            </Nav.Link>
                            <Nav.Link>
                                <Link to="/create-nft" className="topbar-links">
                                    Create NFT
                                </Link>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Topbar
