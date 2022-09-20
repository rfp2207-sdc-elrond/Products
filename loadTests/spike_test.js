import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: '10s', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1400 },
    { duration: '3m', target: 1400 },
    { duration: '10s', target: 100 },
    { duration: '3m', target: 100 },
    { duration: '10s', target: 0 }
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