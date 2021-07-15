import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected } from "../utils/interact";

const Navbar = (props) => {

const [walletAddress, setWallet] = useState("");
const [walletStatus, setStatus] = useState("");


    useEffect(() => {
      async function syncWallet() {
        const {address, status} = await getCurrentWalletConnected();
        setWallet(address)
        setStatus(status);

        addWalletListener(); 
      }
      syncWallet();
    }, []);

    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWallet(walletResponse.address);
      };

      function addWalletListener() {
        if (window.ethereum) {
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              setWallet(accounts[0]);
              setStatus("");
            } else {
              setWallet("");
              setStatus("");
            }
          });
        } else {
          setStatus(
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          );
        }
      };

      return (
        <div className="wallet">
          <button className="btn btn-outline-success my-2 my-sm-0"
           id="walletButton" onClick={connectWalletPressed}>
            {walletAddress.length > 0 ? (
              "Connected: " +
              String(walletAddress).substring(0, 6) +
              "..." +
              String(walletAddress).substring(38)
            ) : (
              <span>Connect Wallet</span>
            )}
          </button>
    
          <p id="status">
            {walletStatus}
          </p>
        </div>
      );
}

export default Navbar;