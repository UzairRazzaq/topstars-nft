// import image1 from '../../public/assets/pic1.jpeg';
import React from 'react';
import Countdown from 'react-countdown';

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
    <div class="row mt-75 mb-5">
          {bidNfts.map((nft) => (
            <div class="col-sm mt-3">
              <div class="card w-o h-100 m-auto">
                <img class="card-img-top h-50" src={nft.mediaLocation}  alt="Card cap"/>
                <div class="card-body">
                  <h5 class="card-title"><a href={`/product/${nft._id}`} class="color-black">{nft.name}</a></h5>
                  <p class="card-text">{nft.description}</p>
                  <div class="d-flex justify-content-between">
                    <button class="btn btn-primary">{nft.price}</button>
                    <span class="btn btn-info">
                      <Countdown date={Date.now() + (nft.time*60000)} renderer={renderer} ></Countdown>
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