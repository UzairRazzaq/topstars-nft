// import image3 from '../../public/assets/pic3.jpg';
import { useParams } from 'react-router'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return "biding Ended";
  } else {
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
};

const Product = (props) => {

  let { id } = useParams();


  const [appState, setAppState] = useState({
    loading: true,
    nft: null
  });

  useEffect(() => {
    setAppState({ loading: true });
    axios.get('http://localhost:5000/product/'+id)
    .then(resp => {
      const getnft = resp['data'][0];
      setAppState({ loading: false, nft: getnft});
      });
  }, [setAppState, id]);

  return (
    
    <div>
      {!appState.loading && 
      
        <div class="card w-o h-100 m-auto pad-75">
        <img class="card-img-top h-50" src={appState.nft.mediaLocation} alt="Card cap"/>
        <div class="card-body">
          <h5 class="card-title">{appState.nft.name}</h5>
          <p class="card-text"> {appState.nft.description}</p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-primary">{appState.nft.price}</button>
            {!appState.nft.buyable &&  <span class="btn btn-info">
              <Countdown date={Date.now() + (appState.nft.time*60000)} renderer={renderer} ></Countdown>
            </span>}
          </div>
          {appState.nft.buyable && <button class="btn btn-primary mt-2">Buy</button>}
          {!appState.nft.buyable && <button class="btn btn-primary mt-2">Bid</button>}
        </div>
      </div>
      }
      {!appState.loading && !appState.nft.buyable &&
      <table class='mx-auto mt-5'>
        <tr>
          <th>Highest bid</th>
          <th>From</th>
        </tr>
        <tr>
          <td>20 ETH</td>
          <td>0x1235653234</td>
        </tr>
        <tr>
          <td>20 ETH</td>
          <td>0x1235653234</td>
        </tr>
        <tr>
          <td>20 ETH</td>
          <td>0x1235653234</td>
        </tr>
        <tr>
          <td>20 ETH</td>
          <td>0x1235653234</td>
        </tr>
      </table>
      }
      {!appState.loading && appState.nft.buyable &&
      <table class='mx-auto mt-5'>
        <tr>
          <th>Sale History</th>
          <th>From</th>
          <th>To</th>
        </tr>
        <tr>
          <td>20 ETH</td>
          <td>0x1235653234</td>
          <td>0x1235653edc</td>
        </tr>
        <tr>
          <td>20 ETH</td>
          <td>0x1235653234</td>
          <td>0x1235653edc</td>
        </tr>
        <tr>
          <td>20 ETH</td>
          <td>0x1235653234</td>
          <td>0x1235653edc</td>
        </tr>
        <tr>
          <td>20 ETH</td>
          <td>0x1235653234</td>
          <td>0x1235653edc</td>
        </tr>
      </table>
      }
    </div>
  );
}

export default Product;