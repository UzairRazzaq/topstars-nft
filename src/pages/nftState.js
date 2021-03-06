import axios from 'axios';
import { useEffect, useState } from 'react';
import SelectSearch from 'react-select-search';
import { fuzzySearch } from 'react-select-search';

const NftState = (props) => {
  //varibales
  // let ids = getAllIds();
  const [toggleValue, setStatus] = useState(false);
  const [bidPrice, setBidPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [idd, setIdd] = useState("");

  const [appState, setAppState] = useState({
    loading: true,
    ids: null
  });

  useEffect(() => {
    setAppState({ loading: true });
    axios.get('http://localhost:5000/product')
    .then(resp => {
      const data = resp['data'];
        const allIds = [];
        data.forEach((element) => { allIds.push({ name: element._id, value: element._id }) } )
        setAppState({ loading: false, ids: allIds });
      });
  }, [setAppState]);

  //funtions
  function toggle() {
    if (toggleValue) {
      setStatus(false);
      setBidPrice(0);
    } else {
      setStatus(true);
      setSalePrice(0);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (idd) {
      // for bid price
      if(toggleValue) {
        if(bidPrice && bidPrice !== 0){
          console.log(bidPrice);
          console.log(idd);
          window.alert("Form submitted");
        } else {
          window.alert("Form not submitted");
        }
      } 
      // for sale price 
      else {
        if(salePrice && salePrice !== 0) {
          console.log(salePrice);
          console.log(idd);
          window.alert("Form submitted");
        } else {
          window.alert("Form not submitted");
        }
      }
    }
  }

  //JSX
  return (
    <div className="d-flex justify-content-center mt-5 pad-75">
      {!appState.loading && 
        <form className = 'd-flex flex-column align-items-center border rounded p-5' onSubmit={handleSubmit}>
        <h3 className="mb-5">Convert Nft to Sale/Bid</h3>
        {!appState.loading && <SelectSearch
          options={appState.ids}
          search
          filterOptions={fuzzySearch}
          placeholder="Select Nft by Id"
          onChange={ setIdd } 
        />}
        <label className="mt-3">
          <input className="mx-2" type="checkbox" id="myCheck" onChange={ (event) => toggle()}/>
          For bid?
        </label> <br></br>
        {toggleValue &&
          <label>
            Bid Price: 
            <input className="mx-2" type="number" id="bidPrice" min="0.001" step="0.001" onChange={ (event) => setBidPrice(event.target.value)} />
            ETH
          </label>
        }
        <br></br>
        {!toggleValue &&
          <label>
            Sale Price: 
            <input className="mx-2" type="number" id="salePrice" min="0.001" step="0.001" onChange={ (event) => setSalePrice(event.target.value)} />
            ETH
          </label>
        }
        <br></br>
        <input type="submit" value="Submit" className="btn btn-primary w-100"/>
      </form>}
   </div>
  );
}

export default NftState;