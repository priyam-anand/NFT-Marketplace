import React, { useState, useEffect } from 'react'
import "./CreateNFT.css";
import Loading from "../../components/Loading/Loading";
import { getWeb3 } from "../../utils.js";
import { useHistory } from 'react-router-dom';
import { create } from "ipfs-http-client";
import Marketplace from "../../contracts/Marketplace.json";
import Item from "../../contracts/Item.json";

const CreateNFT = () => {

    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState(undefined);
    const [marketplaceContract, setMarketplaceContract] = useState(undefined);
    const [itemContract, setItemContract] = useState(undefined);
    const [ipfs, setIpfs] = useState(undefined);
    const history = useHistory();
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, setFormInput] = useState({ name: '', description: '' })

    const isReady = () => {
        return (
            typeof marketplaceContract !== 'undefined'
            && typeof itemContract !== 'undefined'
            && typeof web3 !== 'undefined'
            && typeof accounts !== 'undefined'
            && typeof ipfs !== 'undefined'
        );
    }

    useEffect(() => {
        const init = async () => {
            try {
                const web3 = await getWeb3();
                const accounts = await web3.eth.getAccounts();
                const networkId = await web3.eth.net.getId();
                const marketplaceNetwork = Marketplace.networks[networkId];
                const itemNetwork = Item.networks[networkId];
                if (marketplaceNetwork === undefined || itemNetwork === undefined)
                    throw new Error('Make sure you are on the corrent network. Set the network to Ropsten Test Network');
                const marketContract = new web3.eth.Contract(
                    Marketplace.abi,
                    marketplaceNetwork && marketplaceNetwork.address
                );
                const itemContract = new web3.eth.Contract(
                    Item.abi,
                    itemNetwork && itemNetwork.address
                );
                const ipfsNode = create('https://ipfs.infura.io:5001');

                setWeb3(web3);
                setAccounts(accounts);
                setIpfs(ipfsNode);
                setItemContract(itemContract);
                setMarketplaceContract(marketContract);
            } catch (error) {
                window.alert(error);
                history.push("/");
            }
        }
        init();
        if (isReady()) {
            window.ethereum.on('accountsChanged', accounts => {
                setAccounts(accounts);
            });
        }
    }, [history]);

    const onChange = async (e) => {
        const file = e.target.files[0]
        try {
            const added = await ipfs.add(
                file,
                {
                    progress: (prog) => console.log(`received: ${prog}`)
                }
            )
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, description } = formInput;
        const data = JSON.stringify({
            name, description, image: fileUrl
        });
        try {
            const added = await ipfs.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            createToken(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    const createToken = async(url) => {
        try{
            const token = await itemContract.methods.createToken(url).send({from:accounts[0]});
            const tokenId = token.events.Mint.returnValues[0];
            window.alert("NFT created with Token ID : "+tokenId);
            setFormInput({name:"",description:""})
            setFileUrl(null);
        }catch(error){
            window.alert("Could not create token")
        }
    }

    if (!isReady()) {
        return <Loading />;
    }

    return (
        <>
            <div className="container">
                <div className="col-12">
                    <div className="main__title main__title--create">
                        <h2>Create collectible item</h2>
                    </div>
                    <form onSubmit={handleSubmit} className="sign__form sign__form--create">
                        <div className="row">
                            <div className="col-12">
                                <h4 className="sign__title">Upload Image</h4>
                            </div>

                            <div className="col-12">
                                <div className="sign__file">
                                    <label id="file1" htmlFor="sign__file-upload">Select Image</label>
                                    <input data-name="#file1" id="sign__file-upload" name="file" className="sign__file-upload" type="file" accept=".png,.jpg,.jpeg" required onChange={onChange} />
                                </div>
                            </div>
                            {
                                fileUrl && (
                                    <img src={fileUrl} alt='' style={{ "width": "30rem", "margin": "auto auto", "objectFit": "cover" }} />
                                )
                            }

                            <div className="col-12 mt-3">
                                <h4 className="sign__title">Item details</h4>
                            </div>

                            <div className="col-12">
                                <div className="sign__group">
                                    <label className="sign__label" htmlFor="itemname">Item name</label>
                                    <input id="itemname" type="text" name="itemname" className="sign__input" placeholder="e. g. 'Crypto Punks'" required value={formInput.name} onChange={e => setFormInput({ ...formInput, name: e.target.value })} />
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="sign__group">
                                    <label className="sign__label" htmlFor="description">Description</label>
                                    <textarea id="description" name="description" className="sign__textarea" placeholder="e. g. 'Crypto punks are a cool set of collectibles...'" required value={formInput.description} onChange={e => setFormInput({ ...formInput, description: e.target.value })}></textarea>
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
