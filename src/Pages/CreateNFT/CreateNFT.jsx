import React from 'react'
import "./CreateNFT.css";

const CreateNFT = () => {
    return (
        <>
            <div className="container">
                <div className="col-12">
                    <div className="main__title main__title--create">
                        <h2>Create collectible item</h2>
                    </div>
                    <form className="sign__form sign__form--create">
                        <div className="row">
                            <div className="col-12">
                                <h4 className="sign__title">Upload Image</h4>
                            </div>

                            <div className="col-12">
                                <div className="sign__file">
                                    <label id="file1" htmlFor="sign__file-upload">Select Image</label>
                                    <input data-name="#file1" id="sign__file-upload" name="file" className="sign__file-upload" type="file" accept=".png,.jpg,.jpeg" required />
                                </div>
                            </div>
                            <div className="col-12 mt-3">
                                <h4 className="sign__title">Item details</h4>
                            </div>

                            <div className="col-12">
                                <div className="sign__group">
                                    <label className="sign__label" htmlFor="itemname">Item name</label>
                                    <input id="itemname" type="text" name="itemname" className="sign__input" placeholder="e. g. 'Crypto Punks'" required/>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="sign__group">
                                    <label className="sign__label" htmlFor="description">Description</label>
                                    <textarea id="description" name="description" className="sign__textarea" placeholder="e. g. 'Crypto punks are a cool set of collectibles...'" required></textarea>
                                </div>
                            </div>

                            <div className="col-12 col-xl-3">
                                <button type="submit" className="sign__btn">Create item</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default CreateNFT
