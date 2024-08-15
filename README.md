# Lending dApp on the Core Network

## Pre-requisites
Following are the pre-requisites tools that you'll need: 
- [Node.js](https://nodejs.org/) 
- [Visual Studio Code (VSCode)](https://visualstudio.microsoft.com/) 
- [Git](https://git-scm.com/)


## Configure Git CLI
- Open your favorite terminal.
- Run `gh --version` to ensure that you have installed the Git CLI successfully.
- Run `gh auth login --web` in your terminal and follow the steps given below:
  - First, it will ask for your preferred protocol for Git operations. I chose HTTPS, you can choose any.
  - Second, it will ask you to Authenticate Git with your GitHub credentials, and type Y.
  - Third, you will be able to see some code on your terminal. Copy it.
  - Then, press Enter. It will open a window in your browser.
  - Paste the code you copied and authorize your git. You might need to enter your GitHub password if you have yet to log in.
- Do not close this terminal!


## Contract Deployment

- Fork and clone the repo by running `gh repo fork <https://github.com/0xmetaschool/build-lending-dapp-on-core.git> --clone`.
- Navigate into the folder using `cd build-lending-dapp-on-core`.
- Install dependencies by running `npm install`.
- Create **.env** file and place your Private Key inside it.
- Run `npx hardhat compile` to compile.
- Run `npx hardhat ignition deploy ./ignition/modules/deploy.js --network core_testnet`to deploy.
- Copy the addresses of **DAPP, USD and BTC** Contracts from Terminal and paste them in the **.env** file present inside _./interface/.env_

## Frontend Setup

- Navigate to react app by running `cd interface`
- Install dependencies using `npm install`
- Copy the .json files containing the ABI from _./artifacts/contracts_. You'll need to copy the following json files from their respective folders
  - Bitcoin.json
  - CoreLoanPlatform.json
  - IERC20.json
  - USD.json
  to `interface/src/ABI/` folder.
- Run the frontend using `npm  start`.
