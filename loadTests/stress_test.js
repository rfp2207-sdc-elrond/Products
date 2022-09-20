import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 },
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 },
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }
  ]
}

const API_BASE_URL = 'http://localhost:3000/products'
const productID = '98457'

export default () => {
  http.batch([
    ['GET', `${API_BASE_URL}`],
    ['GET', `${API_BASE_URL}/${productID}`],
    ['GET', `${API_BASE_URL}/${productID}/styles`],
    ['GET', `${API_BASE_URL}/${productID}/related`]
  ]);

  sleep(1);
}