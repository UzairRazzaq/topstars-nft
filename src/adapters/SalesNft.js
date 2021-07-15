// import image1 from '../../public/assets/pic1.jpeg';
import React from 'react';
const SalesNft = (props) => {
  const { SalesNfts } = props;
  if (!SalesNfts || SalesNfts.length === 0) {
    console.log("123" + SalesNfts);
    return <p>No Nfts, sorry</p>;
  }

  return (
    <div class="row mt-75 mb-5">
      {SalesNfts.map((nft) => {
        return (
            <div class="col-sm mt-3">
            <div class="card w-o h-100 m-auto">
              <img class="card-img-top h-50" src={nft.mediaLocation}  alt="Card cap"/>
              <div class="card-body">
                <h5 class="card-title"><a href={`/product/${nft._id}`} class="color-black">{nft.name}</a></h5>
                <p class="card-text">{nft.description}</p>
                <button class="btn btn-primary">{nft.price}</button> 
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default SalesNft;