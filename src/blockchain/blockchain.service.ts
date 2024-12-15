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
    const mnemonic = '';     /* YOUR SEED PHRASE ... */
    const providerOrUrl = '' /* RINKEBY ENDPOINT */
    const pathToContract = 'src/blockchain/AdopToken.sol';      /* PATH TO SOLIDITY SMART CONTRACT */

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

  async deployToken() {
    /** ENTER YOUR INFORMATION HERE! **/
    const mnemonic = '';     /* YOUR SEED PHRASE ... */
    const providerOrUrl = '' /* RINKEBY ENDPOINT */
    const pathToContract = 'src/blockchain/AdopToken.sol';      /* PATH TO SOLIDITY SMART CONTRACT */

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

    function findImports(path) {
      if (fs.existsSync(path)) {
        console.log(path);
        const file = fs.readFileSync(path, 'utf8');
        return { contents: file };
      }
      else return { error: 'File not found' }
    }

    console.log("Deploying Smart Contract!");
    /* 1. Get Ethereum Account */
    const [account] = await web3.eth.getAccounts();

    console.log("Compiling...");
    /* 2. Compile Smart Contract */
    //console.log("TEST", solc.compile(JSON.stringify(input), { import: findImports }));
    const { contracts } = JSON.parse(
      solc.compile(JSON.stringify(input), { import: findImports })
    );
    console.log(contracts);

    console.log("Get Address...");
    console.log(contracts);
    const contract = contracts['contract'].AdopToken;

    /* 2. Extract Abi And Bytecode From Contract */
    const abi = contract.abi;
    const bytecode = contract.evm.bytecode.object;

    /* 3. Send Smart Contract To Blockchain */
    const { _address } = await new web3.eth.Contract(abi)
      .deploy({ data: bytecode })
      .send({ from: account, gas: 10000000 });

    console.log("Contract Address =>", _address);
  };


  async adoptionTransaction(transactionContent: string) {
    /** ENTER YOUR INFORMATION HERE! **/
    const mnemonic = '';     /* YOUR SEED PHRASE ... */
    const providerOrUrl = '' /* RINKEBY ENDPOINT */
    const pathToContract = 'src/blockchain/AdopToken.sol';      /* PATH TO SOLIDITY SMART CONTRACT */

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
    const adoptionContract = await new web3.eth.Contract(abi, '0x50B915AA014Dd9Ed801285a4Cd58F2eDEB359B97');

    var value = await adoptionContract.methods.adopt("0xA1E0722B6ADc19c177fD4c107d9585B9c08CFBAC", "0xA1E0722B6ADc19c177fD4c107d9585B9c08CFBAC",
      transactionContent).send({ from: "0xA1E0722B6ADc19c177fD4c107d9585B9c08CFBAC" });

    console.log("Transaction =>", value);

    return value;
  };


  async getAdoptions() {
    /** ENTER YOUR INFORMATION HERE! **/
    const mnemonic = '';     /* YOUR SEED PHRASE ... */
    const providerOrUrl = '' /* RINKEBY ENDPOINT */
    const pathToContract = 'src/blockchain/AdopToken.sol';      /* PATH TO SOLIDITY SMART CONTRACT */

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
    const adoptionContract = await new web3.eth.Contract(abi, '0x50B915AA014Dd9Ed801285a4Cd58F2eDEB359B97');

    var value = await adoptionContract.methods.getAnimal().call();

    console.log("Transaction =>", value);

    return value;
  };




  async adoptionDonation(amount: string) {
    /** ENTER YOUR INFORMATION HERE! **/
    const mnemonic = '';     /* YOUR SEED PHRASE ... */
    const providerOrUrl = '' /* RINKEBY ENDPOINT */
    const pathToContract = 'src/blockchain/AdopToken.sol';      /* PATH TO SOLIDITY SMART CONTRACT */

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

    function findImports(path) {
      if (fs.existsSync(path)) {
        console.log(path);
        const file = fs.readFileSync(path, 'utf8');
        return { contents: file };
      }
      else return { error: 'File not found' }
    }
    /* 1. Get Ethereum Account */
    const [account] = await web3.eth.getAccounts();

    /* 2. Compile Smart Contract */
    const { contracts } = JSON.parse(
      solc.compile(JSON.stringify(input), { import: findImports })
    );

    const contract = contracts['contract'].AdopToken;

    /* 2. Extract Abi And Bytecode From Contract */
    const abi = contract.abi;
    const bytecode = contract.evm.bytecode.object;

    /* 3. Send Smart Contract To Blockchain */
    const adoptionContract = await new web3.eth.Contract(abi, '0xB031EFB071Bc5FcDE4974736AA5B735481C24a7a');

    var value = await adoptionContract.methods.transfer("0x106349cB7D19d0cb893dfd55e1DB24803b92A233", amount).send({ from: "0xA1E0722B6ADc19c177fD4c107d9585B9c08CFBAC" });

    console.log("Transaction =>", value);

    return value;
  };
}
