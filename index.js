require('dotenv').config();
const express = require("express");
const request = require("request");
const BlockChain = require('./blockchain');
const bodyParser = require('body-parser');
const PublishSubscriber = require('./publishSubscriber');

const app = express();
const blockChain = new BlockChain();
const publishSubscriber = new PublishSubscriber(({ blockchain: blockChain }));

const DEFAULT_PORT = process.env.DEFAULT_PORT || 3000;
const GENERATE_PEER_PORT = process.env.GENERATE_PEER_PORT === 'true';
const ROOT_NODE_ADDRESS = process.env.ROOT_NODE_ADDRESS || `http://localhost:${DEFAULT_PORT}`;

let PEER_PORT;

setTimeout(() => publishSubscriber.broadcastChain(), 1000);

if (GENERATE_PEER_PORT === 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const syncChains = () => {
    request({ url: `${ROOT_NODE_ADDRESS}/api/blocks` }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const rootChain = JSON.parse(body);
            console.log('Replace Chain on sync with', rootChain);
            blockChain.replaceChain(rootChain);
        }
    })
}
app.use(bodyParser.json());

const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
    console.log(`Listening to Port: ${PORT}`);
    syncChains();
})

app.get('/api/blocks', (req, res) => {
    res.json(blockChain.chain)
});

app.post("/api/mine", (req, res) => {
    const { data } = req.body;

    blockChain.addBlock({ data: data });
    publishSubscriber.broadcastChain();
    res.redirect('/api/blocks');
})

