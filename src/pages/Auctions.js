import { useState } from "react";
import { bid , widraw} from "../utils/interact.js";
const Auctions = (props) => {

    const [bidAmmount, setBidValue] = useState("");
    const [status, setStatus] = useState("");
 

    const onBidPressed = async () => {
        const { status } = await bid(bidAmmount);
        setStatus(status);
      };
    
      const onWidrawPressed = async () => {
        const { status } = await widraw();
        setStatus(status);
      };
  return (
    <div>
        <h1>Auctions</h1>
        <input
          type="text"
          placeholder=" 0.00 Eth"
          onChange={(event) => setBidValue(event.target.value)}
        />
        <button id="bidButton" onClick={onBidPressed}>
        Bid
      </button>
      <button id="widrawButton" onClick={onWidrawPressed}>
        Widraw
      </button>
      <p id="status">
        {status}
      </p>
    </div>
    );
};

export default Auctions;
