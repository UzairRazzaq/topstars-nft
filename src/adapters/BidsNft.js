// import image1 from '../../public/assets/pic1.jpeg';
import React from 'react';
import Countdown from 'react-countdown';
import ReactPlayer from 'react-player';
import timeHelper from '../utils/timeHelper'

const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return "biding Ended";
    } else {
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };
const BidsNft = (props) => {
  const { bidNfts } = props;
  if (!bidNfts || bidNfts.length === 0) {
    console.log("123" + bidNfts);
    return <p>No Nfts, sorry</p>;
  }

  return (
    <div className="row">
          {bidNfts.map((nft) => (
            <div className="col-sm mt-3" key={nft._id}>
              <div className="card w-o h-550 m-auto">
                { nft.type === 'pic' &&
                  <img className="card-img-top h-60" src={nft.mediaLocation}  alt={nft.name}/>
                }

                { nft.type === 'vid'  &&
                  <ReactPlayer className="card-img-top h-60" url={nft.mediaLocation}
                    controls = {false}
                    muted = {true}
                    width = {'20.9rem'}
                    playing = {true}
                    loop = {true}
                  />
                }
                <div className="card-body">
                  <h5 className="card-title"><a href={`/product/${nft._id}`} className="color-black">{nft.name}</a></h5>
                  <p className="card-text">{nft.description}</p>
                  <div className="d-flex justify-content-between">
                    <button className="btn btn-primary">{nft.price}</button>
                    <span className="btn btn-info">
                      <Countdown date={timeHelper(nft.time)} renderer={renderer} ></Countdown>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
  );
};
export default BidsNft;