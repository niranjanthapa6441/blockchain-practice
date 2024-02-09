const { GENESIS_DATA } = require('./config');
const { cryptoHash } = require('./cryptoHash');
const hexToBinary = require('hex-to-binary');
class Block {
    constructor({ timeStamp, prevHash, hash, data }) {
        this.timeStamp = timeStamp;
        this.hash = hash;
        this.prevHash = prevHash;
        this.data = data;
    }
    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({ prevBlock, data }) {
        const prevHash = prevBlock.hash;
        const timeStamp = Date.now();
        const hash = cryptoHash(timeStamp, prevHash, data)
        return new this({
            timeStamp,
            prevHash,
            data,
            hash
        });
    }
}

const block = new Block({
    timeStamp: Date.now,
    hash: "0x123456",
    prevHash: GENESIS_DATA.hash,
    data: "new block"
});

console.log(block);

module.exports = Block;