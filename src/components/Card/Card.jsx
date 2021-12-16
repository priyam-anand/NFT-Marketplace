import React from 'react'
import "./Card.css";
import { Link } from "react-router-dom"
const Card = () => {
    return (
        <div>
            <div className="my-card">
                <span className="card__cover">
                    <img src="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/43YAWLITTZJLZIQTCP2JSS4KSM.jpg" alt="" />
                </span>
                <h4 className="card__title">
                    <Link to="/explore">Walking on Air</Link>
                </h4>
                <p className='card__desc'>
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
                </p>
                <div className="card__info mx-auto">
                    <div className="card__price">
                        <span>Price</span>
                        <span>4.89 ETH</span>
                    </div>
                    <button className="btn btn-primary btn-lg"> Buy </button>
                </div>
            </div>
        </div>
    )
}

export default Card
