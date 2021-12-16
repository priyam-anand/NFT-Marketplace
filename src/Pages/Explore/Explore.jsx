import React from 'react'
import Card from '../../components/Card/Card';
import "./Explore.css";
const Explore = () => {
    return (
        <div>
            <div className="container top-space">
                <div className="row">
                    <div className="col-12">
                        <div className="main__title main__title--page">
                            <h1>Explore exclusive digital assets</h1>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                            <Card/>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                            <Card/>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                            <Card/>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                            <Card/>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                            <Card/>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4 col-xl-3">
                            <Card/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Explore
