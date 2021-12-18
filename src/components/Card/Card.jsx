import React, { useState, useEffect } from 'react'
import "./Card.css";
import { Link } from "react-router-dom";
import axios from "axios";


const Card = ({web3, data, itemContract, handleBuying }) => {

    const [token, setToken] = useState({ name: "", description: "", image: "" });
    const [isLoading, setIsLoading] = useState(false);
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
                            <img src={token.image} alt="" />
                        </span>
                        <h4 className="card__title">
                            <Link to="/explore">{token.name}</Link>
                        </h4>
                        <p className='card__desc'>
                            {token.description}
                        </p>
                        <div className="card__info mx-auto">
                            <div className="card__price">
                                <span>Price</span>
                                <span>{web3.utils.fromWei(data.price, 'ether')} ETH</span>
                            </div>
                            <form onSubmit={handleBuying}>
                                <input type="number" value={data.itemId} onChange={e=>console.log(e)} style={{"display":"none"}}/>
                                <input type="number" value={data.price} onChange={e=>console.log(e)} style={{"display":"none"}}/>
                                <button type="submit" className="sell-btn"> Buy </button>
                            </form>
                            
                        </div>
                    </>
            }
        </div>
    )
}

export default Card
