import React, { useState, useEffect } from 'react'
import "./Card2.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Card2 = ({ owned, data, itemContract, handleListing }) => {
    const [token, setToken] = useState({ name: "", description: "", image: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [price,setPrice] = useState("");

    useEffect(() => {
        if (itemContract !== undefined) {
            const getToken = async () => {
                const uri = await itemContract.methods.tokenURI(data.tokenId).call();
                const metaData = await axios.get(uri);
                setToken(metaData.data);
                setIsLoading(false);
            }
            getToken();
        }
    }, [itemContract])


    return (
        <>
            <div className="activity">
                {isLoading
                    ? <>
                        <div className="spinner-border text-primary spinner" role="status">
                            <span className="sr-only"></span>
                        </div>
                    </>
                    : <>
                        <span className="activity__cover">
                            <img src={token.image} alt="" />
                        </span>
                        <div className="activity__content">
                            <h4 className="activity__title">
                                <Link to="/my-collection">{token.name}</Link>
                            </h4>
                            <p className="activity__text">
                                {token.description}
                            </p>

                            {owned
                                ? <></>
                                : <form onSubmit={handleListing} className="list">
                                    <input type="number"
                                        style={{ "height": "2.5rem" }} className="sign__input" required placeholder='Price' value={price} onChange={e=>setPrice(e.target.value)}/>
                                    <input type="number" value={data.itemId} onChange={e=>console.log(e)} style={{"display":"none"}}/>
                                    <button type="submit" className='sell-btn'>List</button>
                                </form>}
                        </div>
                    </>}
            </div>
        </>
    )
}

export default Card2
