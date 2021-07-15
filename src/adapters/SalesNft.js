// import image1 from '../../public/assets/pic1.jpeg';
import React from 'react';
import ReactPlayer from 'react-player';
const SalesNft = (props) => {
  const { SalesNfts } = props;
  if (!SalesNfts || SalesNfts.length === 0) {
    return <p>No Nfts, sorry</p>;
  }

  return (
    <div className="row">
          {SalesNfts.map((nft) => (
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
                  <button className="btn btn-primary">{nft.price}</button> 
                </div>
              </div>
            </div>
          ))}
        </div>
  );
};
export default SalesNft;