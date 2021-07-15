// import image3 from '../../public/assets/pic3.jpg';
import { useParams } from 'react-router'
import ReactPlayer from 'react-player'
import Popup from 'reactjs-popup';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import timeHelper from '../utils/timeHelper'

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return "biding Ended";
  } else {
    return <span>{hours}:{minutes}:{seconds}</span>;
  }
};

const Product = (props) => {

  let { id } = useParams();
  const [bidPrice, setBid] = useState("");


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

  function handleSubmit(event) {
    event.preventDefault();
    if(bidPrice) {
      console.log(bidPrice);
      window.alert("bid successful");
    } else {
      window.alert("bid Unsuccessful");
    }
  }

  return (
    
    <div className = "mt-12">
    {!appState.loading && <>
      <div className="card w-o h-100 m-auto">
        { appState.nft.type === 'pic' &&
          <img className="card-img-top h-50" src={appState.nft.mediaLocation}  alt={appState.nft.name}/>
        }
        { appState.nft.type === 'vid'  &&
          <ReactPlayer className="card-img-top h-50" url={appState.nft.mediaLocation}
            controls = {true}
            muted = {true}
            width= {'20.9rem'}
            playing = {true}
          />
        }
        <div className="card-body">
          <h5 className="card-title">{appState.nft.name}</h5>
          <p className="card-text"> {appState.nft.description}</p>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary">{appState.nft.price}</button>
            {!appState.nft.buyable &&
              <span className="btn btn-info">
                <Countdown date={timeHelper(appState.nft.time)} renderer={renderer} ></Countdown>
              </span>
            }
          </div>
          {appState.nft.buyable &&
            <Popup trigger={<button className="btn btn-primary mt-2"> Buy</button>}>
              <div className = "popup d-flex justify-content-center align-items-center flex-column">
                <span className="font-weight-bold text-uppercase">Price</span> {appState.nft.price}
                <button className="btn btn-primary w-100 my-3">Buy</button>
              </div>
            </Popup>
          }
          {!appState.nft.buyable &&
           <Popup trigger={<button className="btn btn-primary mt-2"> Bid</button>}>
              <div className = "popup d-flex justify-content-center align-items-center flex-column">
                <form>
                  <label>Bid Price
                    <input className="w-100" type="number" id="bidPrice" onChange={ (event) => setBid(event.target.value)} />
                  </label>
                  <button onClick={handleSubmit} type="submit" value="Submit" className="btn btn-primary w-100 my-3">Bid</button>
                </form> 
              </div>
            </Popup>
          }
        </div>
      </div>
      {!appState.nft.buyable &&
        <table className='mx-auto my-5'>
          <tbody>
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
          </tbody>
        </table>
      }
      {appState.nft.buyable &&
        <table className='mx-auto my-5'>
          <tbody>
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
          </tbody>
      </table>
      }
      </>}
    </div>
  );
}

export default Product;