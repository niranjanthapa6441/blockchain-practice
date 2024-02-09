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

    replaceChain(chain) {
        if (chain.length <= this.chain.length) {
            console.error("The chain is not long enough");
        }
        if (!BlockChain.isValidChain(chain)) {
            console.error("The incoming chain is invalid");
            return;
        }
        this.chain = chain;
    }

    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
            return false
        };
        for (let i = 1; i < chain.length; i++) {
            const { timeStamp, prevHash, hash, data, nonce, difficulty } = chain[i];
            const realLastHash = chain[i - 1].hash;

            if (prevHash !== realLastHash) {
                return false;
            }

            const validatedHash = cryptoHash(timeStamp, prevHash, data, nonce, difficulty);

            if (hash !== validatedHash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = BlockChain;