// import image1 from '../assets/pic1.jpeg';
import React, { useEffect, useState } from 'react';
import WithListLoading from '../adapters/WithListLoading';
import SalesNft from '../adapters/SalesNft';
import axios from 'axios';
import BidsNft from '../adapters/BidsNft';


function Home() {
  const SalesListLoading = WithListLoading(SalesNft);
  const BidsListLoading = WithListLoading(BidsNft);
  const [appState, setAppState] = useState({
    loading: false,
    Salesnfts: null,
    bidnfts: null,
  });
  // const { data: Salesnfts, error } = useSWR('../adapters/products.js', getSalesNft);
  // const bidNfts = getBidNft();

  useEffect(() => {
    setAppState({ loading: true });
    axios.get('http://localhost:5000/product')
    .then(resp => {
      const allnfts = resp['data'];
        console.log(resp['data']);
        const forSale = [];
        const forBid = [];
        allnfts.forEach(element => {
          if(element['buyable'])
          forSale.push(element);
          else
          forBid.push(element);
        
        });
        setAppState({ loading: false, Salesnfts: forSale, bidnfts: forBid });
      });
  }, [setAppState]);

  // if(error) return "Error!";
  // if(!Salesnfts) return "Loading!";

  // console.log(bidNfts);


    return (
    <div>
      <div class="d-flex justify-content-center pad-75">
        <h1>
          Sales
        </h1>
      </div>
      <div class="container">
      <SalesListLoading isLoading={appState.loading} SalesNfts={appState.Salesnfts} />  
      </div>
      <div class="d-flex justify-content-center pad-75">
        <h1>
          Bids
        </h1>
      </div>
      <div class="container">
      <BidsListLoading isLoading={appState.loading} bidNfts={appState.bidnfts} />
      </div>
    </div>
    );
  
}

export default Home;