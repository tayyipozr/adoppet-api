import { Injectable } from "@nestjs/common";

/* Compile And Push To Eth Network */
const fs = require('fs');
const path = require('path');
const solc = require('solc');
const Web3 = require('Web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');

@Injectable()
export class BlockchainService {

  async deploy() {
    /** ENTER YOUR INFORMATION HERE! **/
    const mnemonic = 'era wink patch crazy inform crunch desert junk meadow wheat wash pear';     /* YOUR SEED PHRASE ... */
    const providerOrUrl = 'https://rinkeby.infura.io/v3/865fa442f2f341b6aa5bcba81f4b853b' /* RINKEBY ENDPOINT */
    const pathToContract = 'C:/Users/Tayyip/Desktop/adoppet-api/src/blockchain/AdoptionContract.sol';      /* PATH TO SOLIDITY SMART CONTRACT */

    const provider = new HDWalletProvider({ mnemonic, providerOrUrl });
    const web3 = new Web3(provider);
    const content = fs.readFileSync(pathToContract, 'utf8');

    const input = {
      language: 'Solidity',
      sources: {
        'contract': { content }
      },
      settings: {
        outputSelection: { '*': { '*': ['*'] } }
      }
    };

    console.log("Deploying Smart Contract!");
    /* 1. Get Ethereum Account */
    const [account] = await web3.eth.getAccounts();

    console.log("Compiling...");
    /* 2. Compile Smart Contract */
    const { contracts } = JSON.parse(
      solc.compile(JSON.stringify(input))
    );

    console.log("Get Address...");
    const contract = contracts['contract'].Adoption;

    /* 2. Extract Abi And Bytecode From Contract */
    const abi = contract.abi;
    const bytecode = contract.evm.bytecode.object;

    /* 3. Send Smart Contract To Blockchain */
    const { _address } = await new web3.eth.Contract(abi)
      .deploy({ data: bytecode })
      .send({ from: account, gas: 1000000 });

    console.log("Contract Address =>", _address);
  };


  async adoptionTransaction() {
    /** ENTER YOUR INFORMATION HERE! **/
    const mnemonic = 'era wink patch crazy inform crunch desert junk meadow wheat wash pear';     /* YOUR SEED PHRASE ... */
    const providerOrUrl = 'https://rinkeby.infura.io/v3/865fa442f2f341b6aa5bcba81f4b853b' /* RINKEBY ENDPOINT */
    const pathToContract = 'C:/Users/Tayyip/Desktop/adoppet-api/src/blockchain/AdoptionContract.sol';      /* PATH TO SOLIDITY SMART CONTRACT */

    const provider = new HDWalletProvider({ mnemonic, providerOrUrl });
    const web3 = new Web3(provider);
    const content = fs.readFileSync(pathToContract, 'utf8');

    const input = {
      language: 'Solidity',
      sources: {
        'contract': { content }
      },
      settings: {
        outputSelection: { '*': { '*': ['*'] } }
      }
    };

    console.log("Sending transaction!");
    /* 1. Get Ethereum Account */
    const [account] = await web3.eth.getAccounts();

    /* 2. Compile Smart Contract */
    const { contracts } = JSON.parse(
      solc.compile(JSON.stringify(input))
    );

    const contract = contracts['contract'].Adoption;

    /* 2. Extract Abi And Bytecode From Contract */
    const abi = contract.abi;
    const bytecode = contract.evm.bytecode.object;

    /* 3. Send Smart Contract To Blockchain */
    const adoptionContract = await new web3.eth.Contract(abi, '0x18506EEc278bA43418057f22D335A171b42866b6');

    var value = await adoptionContract.methods.adopt("0xA1E0722B6ADc19c177fD4c107d9585B9c08CFBAC", "0xA1E0722B6ADc19c177fD4c107d9585B9c08CFBAC", 1).call();

    console.log("Transaction =>", value);

    return value;
  };
}
