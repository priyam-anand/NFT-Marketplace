import React, { useState, useEffect } from 'react'
import "./Card.css";
import { Link } from "react-router-dom";
import axios from "axios";


const Card = ({ data, itemContract }) => {

    const [token, setToken] = useState({ name: "", description: "", image: "" });
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (itemContract !== undefined) {
            const getToken = async () => {
                const uri = await itemContract.methods.tokenURI(data.tokenId).call();
                const metaData = await axios.get(uri);
                console.log(metaData.data);
                setToken(metaData.data);
                setIsLoading(false);
            }
            getToken();
        }
    }, [itemContract])


    return (
        <div className="my-card">
            {
                isLoading
                    ? <>
                        <div className="spinner-border text-primary spinner" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </>
                    : <>
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
                            <button className="sell-btn"> Buy </button>
                        </div>
                    </>
            }
        </div>
    )
}

export default Card
