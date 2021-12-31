import React, { useEffect, useState } from 'react'
import Card from '../../components/Card/Card';
import "./Explore.css";
import Loading from "../../components/Loading/Loading";
import { getWeb3 } from "../../utils.js";
import { useHistory } from 'react-router-dom';
import { create } from "ipfs-http-client";
import Marketplace from "../../contracts/Marketplace.json";
import Item from "../../contracts/Item.json";

const Explore = () => {

    const [web3, setWeb3] = useState(undefined);
    const [accounts, setAccounts] = useState(undefined);
    const [marketplaceContract, setMarketplaceContract] = useState(undefined);
    const [itemContract, setItemContract] = useState(undefined);
    const [ipfs, setIpfs] = useState(undefined);
    const history = useHistory();
    const [itemAddress, setItemAddress] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [listedItem, setListedItem] = useState([]);

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
            const listedI = [];
            const listed = await marketplaceContract.methods.getMarketItems().call({ from: accounts[0] });
            for (let i = 0; i < listed[0].length; i++) {
                listedI.push({
                    itemId: listed[0][i],
                    itemContract: listed[1][i],
                    tokenId: listed[2][i],
                    minter: listed[3][i],
                    owner: listed[4][i],
                    price: listed[5][i],
                    listed: listed[6][i]
                })
            }
            setListedItem(listedI);
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

                setItemAddress(itemNetwork.address);
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
    }, [marketplaceContract]);

    const handleBuying = async (e) => {
        e.preventDefault();
        const itemId = e.target[0].value;
        const price = e.target[1].value;
        try {
            await marketplaceContract.methods.sellItem(itemAddress, itemId).send({ from: accounts[0], value: price });
        } catch (error) {
            console.log(error);
            window.alert("Could not buy NFT");
        }

        setIsLoading(true);
        getData();
    }

    if (!isReady() || isLoading) {
        return <Loading />;
    }

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
                        {
                            listedItem.length > 0
                                ? (listedItem.map((item, index) => {
                                    return <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={index}><Card data={item} itemContract={itemContract} web3={web3} handleBuying={handleBuying} account={accounts}/></div>
                                }))
                                : <h4 style={{ "color": "white" }} className="mt-3 mx-auto">Nothing Here</h4>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Explore
