# Basic Blockchain Practice

Welcome to the Basic Blockchain Practice repository! This project serves as a simple implementation of a blockchain, created for learning and practicing blockchain concepts.

## About Basic Blockchain Practice

Basic Blockchain Practice is a minimalist blockchain implementation designed to help developers understand the fundamental principles of blockchain technology. This project provides a hands-on learning experience for exploring concepts such as blocks, transactions, mining, and consensus mechanisms in a simplified environment.

## Features

- **Blockchain Data Structure:** Implements a basic blockchain data structure consisting of blocks linked together by cryptographic hashes.
- **Proof of Work (PoW) Consensus:** Uses a simple Proof of Work consensus algorithm to validate and add new blocks to the blockchain.
- **Transaction Management:** Supports basic transaction management functionality, allowing users to create and include transactions in new blocks.
- **Persistence:** Persists the blockchain data to disk, ensuring data integrity and durability across sessions.

## Prerequisites

- Node.js version 10 or higher is required. If Node.js is not installed, you can download and install it from the [official Node.js website](https://nodejs.org/). Once Node.js is installed, you can verify the installation by running the following command:

  ```bash
  node --version
  ```
- Redis is required and should be running on port 6379. If Redis is not installed, you can download and install it from the [official Redis.io website](https://redis.io/docs/install/install-redis/):

  
## How to Use

### Clone the repo
To get started, clone the repository by running the following command in your terminal:

```
git clone git@github.com:niranjanthapa6441/blockchain-practice.git
```
### Install dependencies

Install dependencies recursively with this command:

```
npm i 
```
### Configure apps

copy `.env.example` and update the environment variables as required.

### Run the application 
To run the application in development environment use thie command:

```
npm run dev  
```
To run the peer nodes use this command: 

```
npm run dev-peer 
```