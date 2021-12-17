import React from 'react'
import "./AddItem.css";

const AddItem = () => {
    return (
        <>
            <div className="container">
                <div className="col-12">
                    <div className="main__title main__title--create">
                        <h2>Add your existing NFT</h2>
                    </div>
                    <form className="sign__form add-item-form">
                        <div className="row">
                            <div className="col-12 mt-3 mx-auto">
                                <h4 className="sign__title">Token Id</h4>
                            </div>

                            <div className="col-12">
                                <div className="sign__group">
                                    <label className="sign__label" htmlFor="tokenId">Token Id</label>
                                    <input id="tokenId" type="number" name="tokenId" className="sign__input" placeholder="e. g. '34, 87'" required/>
                                </div>
                            </div>

                            <div className="col-12 col-xl-3">
                                <button type="submit" className="sign__btn">Add Item</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddItem
