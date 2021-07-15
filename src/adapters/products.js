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

function getAllIds() {
  let dat = [];
  data.forEach((element) => { dat.push({ name: element.id, value: element.id }) } )

  return dat;
}

function toggle() {
  var checkBox = document.getElementById("myCheck");
  if (checkBox.checked === true){
    return true;
  } else {
    return false;
  }
}

export { getSalesNft, getUserById, getBidNft, getAllIds, toggle };
