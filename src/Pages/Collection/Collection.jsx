import React, { useEffect, useState } from 'react'
import Card2 from '../../components/Card2/Card2';
import "./Collection.css";
import Loading from "../../components/Loading/Loading";
import { getWeb3 } from "../../utils.js";
import { useHistory } from 'react-router-dom';
import { create } from "ipfs-http-client";
import Marketplace from "../../contracts/Marketplace.json";
import Item from "../../contracts/Item.json";

const Collection = () => {

    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState(undefined);
    const [marketplaceContract, setMarketplaceContract] = useState(undefined);
    const [itemContract, setItemContract] = useState(undefined);
    const [ipfs, setIpfs] = useState(undefined);
    const history = useHistory();
    const [ownedItem, setOwnedItem] = useState([]);
    const [mintedItem, setMintedItem] = useState([]);
    const [listedItem, setListedItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const isReady = () => {
        return (
            typeof marketplaceContract !== 'undefined'
            && typeof itemContract !== 'undefined'
            && typeof web3 !== 'undefined'
            && typeof accounts !== 'undefined'
            && typeof ipfs !== 'undefined'
        );
    }

    const getData = async () => {
        try {
            const boughtI = [];
            const bought = await marketplaceContract.methods.getBoughtItems().call({ from: accounts[0] });
            for (let i = 0; i < bought[0].length; i++) {
                boughtI.push({
                    itemId: bought[0][i],
                    itemContract: bought[1][i],
                    tokenId: bought[2][i],
                    minter: bought[3][i],
                    owner: bought[4][i],
                    price: bought[5][i],
                    listed: bought[6][i]
                })
            }
            const ownedI = [];
            const owned = await marketplaceContract.methods.getCreatedItems().call({ from: accounts[0] });
            for (let i = 0; i < owned[0].length; i++) {
                ownedI.push({
                    itemId: owned[0][i].toString(),
                    itemContract: owned[1][i],
                    tokenId: owned[2][i],
                    minter: owned[3][i],
                    owner: owned[4][i],
                    price: owned[5][i],
                    listed: owned[6][i]
                })
            }
            const listedI = [];
            const listed = await marketplaceContract.methods.getListedItems().call({ from: accounts[0] });
            for (let i = 0; i < listed[0].length; i++) {
                listedI.push({
                    itemId: listed[0][i].toString(),
                    itemContract: listed[1][i],
                    tokenId: listed[2][i],
                    minter: listed[3][i],
                    owner: listed[4][i],
                    price: listed[5][i],
                    listed: listed[6][i]
                })
            }

            setListedItem(listedI);
            setMintedItem(ownedI);
            setOwnedItem(boughtI);
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
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

    useEffect(() => {
        if (isReady()) {
            getData();
        }
    }, [marketplaceContract, accounts]);

    const handleListing = async (e) => {
        e.preventDefault();
        const price = web3.utils.toWei(e.target[0].value, 'ether');
        const itemId = e.target[1].value;

        try {
            await marketplaceContract.methods.listItem(itemId, price).send({ from: accounts[0] });
        } catch (error) {
            console.log(error);
            window.alert("could not list the NFT");
        }

        setIsLoading(true);
        getData();
    }

    if (!isReady() || isLoading) {
        return <Loading />;
    }

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
                            {ownedItem.length > 0
                                ? (ownedItem.map((item, index) => {
                                    return <div key={index} className="col-12 col-lg-6"><Card2 data={item} itemContract={itemContract} handleListing={handleListing} /></div>
                                }))
                                : <h4 style={{ "color": "white" }} className="mt-3 mx-auto">Nothing Here</h4>}
                        </div>
                    </div>
                </div>
                <hr style={{ "color": "white", "marginTop": "2rem" }} />

                <div className="row">
                    <div className="col-12">
                        <div className="main__title main__title--page">
                            <h1>My Listed</h1>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 order-xl-1">
                        <div className="row">
                            {listedItem.length > 0
                                ? (listedItem.map((item, index) => {
                                    return <div key={index} className="col-12 col-lg-6"><Card2 data={item} itemContract={itemContract} owned={true} /></div>
                                }))
                                : <h4 style={{ "color": "white" }} className="mt-3 mx-auto">Nothing Here</h4>}
                        </div>
                    </div>
                </div>
                <hr style={{ "color": "white", "marginTop": "2rem" }} />

                <div className="col-12">
                    <div className="main__title main__title--page">
                        <h1>My Minted</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 order-xl-1">
                        <div className="row">
                            {mintedItem.length > 0
                                ? (mintedItem.map((item, index) => {
                                    return <div key={index} className="col-12 col-lg-6" ><Card2 owned={true} data={item} itemContract={itemContract} /></div>
                                }))
                                : <h4 style={{ "color": "white" }} className="mt-3 mx-auto">Nothing Here</h4>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Collection
