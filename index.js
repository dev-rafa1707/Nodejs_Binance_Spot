require('dotenv').config();
const WebSocket = require('ws');
const axios = require('axios');
const crypto = require('crypto');

const ws = new WebSocket(process.env.STREAM_URL + 'btcusdt@bookTicker')

let isOpened = false;

ws.onmessage = async (event) => {
    const obj = JSON.parse(event.data);
    console.log('Symbol: ' + obj.s);
    console.log('Price: ' + obj.a);

    const price = parseFloat(obj.a);

    if (price < 19000 && !isOpened) {
        console.log('Comprar');
        isOpened = true;
    }
    else if ( price > 21000 && isOpened) {
        console.log('Vender');
        isOpened = false;
    }
}

function newOrder(Symbol, quantity, side){
    const data = {Symbol, quantity, side};
    data.type = 'MARKET';
    data.timestamp = Date.now();
    
}