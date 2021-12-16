import React from 'react'
import Card2 from '../../components/Card2/Card2';
import "./Collection.css";

const Collection = () => {
    return (
        <>
            <div class="container top-space">
                <div class="row">
                    <div class="col-12">
                        <div class="main__title main__title--page">
                            <h1>My Owned</h1>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 order-xl-1">
                        <div class="row">
                            <Card2 />
                            <Card2 />
                            <Card2 />
                            <Card2 /><Card2 />
                        </div>
                    </div>
                </div>
                <hr style={{"color":"white", "marginTop":"2rem"}}/>

                <div class="col-12">
                        <div class="main__title main__title--page">
                            <h1>My Minted</h1>
                        </div>
                    </div>
                <div className="row">
                    <div class="col-12 order-xl-1">
                        <div class="row">
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
