import React from 'react'
import "./Home.css";
import {Link} from "react-router-dom"
const Home = () => {
    return (
        <>
            <div className="home">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="home-content">
                                <h1 className="home-title">
                                    NFT Marketplace
                                </h1>
                                <p className="home-text">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis corrupti porro velit? eum non eligendi iusto?
                                </p>
                                <div className="home-btns">
                                    <Link className='home-btn home-btn--clr'>
                                        Explore
                                    </Link>
                                    <Link className='home-btn'>
                                        Create
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
