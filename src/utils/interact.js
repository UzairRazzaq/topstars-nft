import {pinJSONToIPFS} from './pinata.js'
import axios from 'axios';
require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); 

const contractABI = require('../Abis/ClipToken.json')
const contractAddress = "0x5C1290955CaE296cF4f291F35aA683e03Be7c112";
const bidContractABI = require('../Abis/SimpleAuction.json')
const bidContractAddress = "0x553Bc416D011914b8c173FeD3c4619Daa199e45C";

export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  export const mintNFT = async(url, name, description) => {
    
    //error handling
    if (url.trim() === "" || (name.trim() === "" || description.trim() === "")) { 
        return {
            success: false,
            status: "❗Please make sure all fields are completed before minting.",
        }
    }
  
    //make metadata
    const metadata = {};
    metadata.name = name;
    metadata.image = url;
    metadata.description = description;

    //pinata pin request
    const pinataResponse = await pinJSONToIPFS(metadata);
    if (!pinataResponse.success) {
        return {
            success: false,
            status: "😢 Something went wrong while uploading your tokenURI.",
        }
    } 
    const tokenURI = pinataResponse.pinataUrl;  

    const newNft = {
      name: name,
      description: description,
      url: url,
      metadata_hash: tokenURI,
      mediaLocation: "NFt/example"
    };

    axios
      .post("http://localhost:5000/product/add", newNft)
      .then((res) => console.log(res.data));

    //load smart contract
    window.contract = await new web3.eth.Contract(contractABI, contractAddress);//loadContract();

    //set up your Ethereum transaction
    const transactionParameters = {
        to: contractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        'data': window.contract.methods.safeMint(window.ethereum.selectedAddress, tokenURI).encodeABI() //make call to NFT smart contract 
    };
  
    //sign transaction via Metamask
    try {
        const txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        return {
            success: true,
            status: "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        }
    }
}
  export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "👆🏽 Write a message in the text-field above.",
          };
        } else {
          return {
            address: "",
            status: "",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };
  
  export const bid = async(ammount) => {
    window.contract = await new web3.eth.Contract(bidContractABI, bidContractAddress);//loadContract();

    //set up your Ethereum transaction
    const transactionParameters = {
        to: bidContractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        'value': ammount,
        'data': window.contract.methods.bid().encodeABI() //make call to NFT smart contract 
    };
    try {
      const txHash = await window.ethereum
          .request({
              method: 'eth_sendTransaction',
              params: [transactionParameters],
          });
      return {
          success: true,
          status: "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash
      }
  } catch (error) {
      return {
          success: false,
          status: "😥 Something went wrong: " + error.message
      }
  }
  };

  export const widraw = async() => {
    window.contract = await new web3.eth.Contract(bidContractABI, bidContractAddress);//loadContract();

    //set up your Ethereum transaction
    const transactionParameters = {
        to: bidContractAddress, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        'data': window.contract.methods.widraw().encodeABI() //make call to NFT smart contract 
    };
    try {
      const txHash = await window.ethereum
          .request({
              method: 'eth_sendTransaction',
              params: [transactionParameters],
          });
      return {
          success: true,
          status: "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" + txHash
      }
  } catch (error) {
      return {
          success: false,
          status: "😥 Something went wrong: " + error.message
      }
  }
  };