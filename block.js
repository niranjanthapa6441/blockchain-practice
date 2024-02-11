const { GENESIS_DATA, MINE_RATE } = require('./config');
const { cryptoHash } = require('./cryptoHash');
const hexToBinary = require('hex-to-binary');
class Block {
    constructor({ timeStamp, prevHash, hash, data, nonce, difficulty }) {
        this.timeStamp = timeStamp;
        this.hash = hash;
        this.prevHash = prevHash;
        this.data = data;
        this.difficulty = difficulty;
        this.nonce = nonce;
    }
    static genesis() {
        return new this(GENESIS_DATA);
    }

    static mineBlock({ prevBlock, data }) {
        let hash, timeStamp;
        const prevHash = prevBlock.hash;
        let difficulty = prevBlock.difficulty;
        let nonce = 0;
        do {
            nonce++;
            timeStamp = Date.now();
            difficulty = Block.adjustDifficulty({ originalBlock: prevBlock, timeStamp: timeStamp })
            hash = cryptoHash(timeStamp, prevHash, data, nonce, difficulty)
        }
        while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));
        return new this({
            timeStamp,
            prevHash,
            data,
            hash,
            nonce,
            difficulty
        });
    }

    static adjustDifficulty({ originalBlock, timeStamp }) {
        const { difficulty } = originalBlock;
        const difference = timeStamp - originalBlock.timeStamp;

        if (difficulty < 1) {
            return 1;
        }

        if (difference > MINE_RATE) {
            return difficulty - 1;
        } else {
            return difficulty + 1;
        }
    }
}

module.exports = Block;