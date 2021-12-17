import React from 'react'
import "./Card2.css";
import { Link } from "react-router-dom";

const Card2 = ({ owned , data}) => {
    console.log(data);
    return (
        <>
            <div className="col-12 col-lg-6">
                <div className="activity">
                    <span className="activity__cover">
                        <img src="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/43YAWLITTZJLZIQTCP2JSS4KSM.jpg" alt="" />
                    </span>
                    <div className="activity__content">
                        <h4 className="activity__title">
                            <Link to="/my-collection">Walking on Air</Link>
                        </h4>
                        <p className="activity__text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore totam, natus aperiam mollitia aut adipisci.
                        </p>

                        {owned
                            ? <></>
                            : <form className="list">
                                <input type="number" 
                                style={{"height":"2.5rem"}} className="sign__input" required placeholder='Price' />
                                <button className='sell-btn'>List</button>
                            </form>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card2
