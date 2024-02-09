const { GENESIS_DATA } = require('./config');
const { cryptoHash } = require('./cryptoHash');
class Block {
    constructor({ timeStamp, prevHash, hash, data, nonce, difficulty }) {
        this.timeStamp = timeStamp;
        this.hash = hash;
        this.prevHash = prevHash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }
    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({ prevBlock, data }) {
        let hash, timeStamp;
        const prevHash = prevBlock.hash;
        const difficulty = prevBlock.difficulty;
        let nonce = 0;
        do {
            nonce++;
            timeStamp = Date.now();
            hash = cryptoHash(timeStamp, prevHash, data, nonce, difficulty)
        }
        while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
        return new this({
            timeStamp,
            prevHash,
            data,
            hash,
            nonce,
            difficulty
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