const Blockchain = require('./blockchain');
const blockChain = new Blockchain();
blockChain.addBlock({ data: "new Data" });
let prevTimestamp, nextTimeStamp, nextBlock, timeDiff, averageTime;

const times = [];

for (let i = 0; i < 1000; i++) {
    prevTimestamp = blockChain.chain[blockChain.chain.length - 1].timeStamp;
    blockChain.addBlock({ data: `block ${i}` });
    console.log(blockChain.chain[blockChain.chain.length - 1]);
    nextBlock = blockChain.chain[blockChain.chain.length - 1];
    nextTimeStamp = nextBlock.timeStamp;

    timeDiff = nextTimeStamp - prevTimestamp;
    times.push(timeDiff);

    averageTime = times.reduce((total, num) => (total + num)) / times.length;

    console.log(`Time to mine block: ${timeDiff} ms, Difficulty: ${nextBlock.difficulty}, avgTime: ${averageTime}`);
}