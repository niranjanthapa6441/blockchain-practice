const Block = require('./block');
class BlockChain {
    constructor() {
        this.chain = [Block.genesis()];
    }

    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length - 1],
            data: data
        });
        this.chain.push(newBlock);
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false
        };
        for (let i = 1; i < chain.length; i++) {
            const { timeStamp, prevHash, hash, data } = chain[i];
            const realLastHash = chain[i - 1].hash;

            if (prevHash !== realLastHash) {
                return false;
            }

            const validatedHash = cryptoHash(timeStamp, prevHash, data);

            if (hash !== validatedHash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = BlockChain;