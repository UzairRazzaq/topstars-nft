import data from '../db/db.json'
import axios from 'axios';

async function getSalesNft() {
  axios.get('http://localhost:5000/product')
    .then(resp => {
        console.log(resp['data']);
        return resp['data'];
    })
    .catch(err => {
        console.error(err);
    });
}

function getBidNft() {
  const result = data.filter(word => word.buyable === false);
  return result;
}

function getUserById(id) {
  let dat = data;
  return dat[id-1];
}

export { getSalesNft, getUserById, getBidNft };
