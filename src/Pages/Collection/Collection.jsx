import React from 'react'
import Card2 from '../../components/Card2/Card2';
import "./Collection.css";

const Collection = () => {
    return (
        <>
            <div className="container top-space">
                <div className="row">
                    <div className="col-12">
                        <div className="main__title main__title--page">
                            <h1>My Owned</h1>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 order-xl-1">
                        <div className="row">
                            <Card2 />
                            <Card2 />
                            <Card2 />
                            <Card2 /><Card2 />
                        </div>
                    </div>
                </div>
                <hr style={{"color":"white", "marginTop":"2rem"}}/>

                <div className="col-12">
                        <div className="main__title main__title--page">
                            <h1>My Minted</h1>
                        </div>
                    </div>
                <div className="row">
                    <div className="col-12 order-xl-1">
                        <div className="row">
                            <Card2 owned={true}/>
                            <Card2 owned={true}/><Card2 owned={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Collection
