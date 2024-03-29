const INITIAL_DIFFICULTY = 2;
const MINE_RATE = 1000;
const GENESIS_DATA = {
    timeStamp: 1,
    prevHash: '0x000',
    hash: '0x123',
    data: [],
    nonce: 0,
    difficulty: INITIAL_DIFFICULTY
}

module.exports = { GENESIS_DATA, MINE_RATE }; 