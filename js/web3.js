import Web3 from 'web3';

const contractAddress = "0x115c68ef2a76e25ca960145db662c772385c19a5";
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "num",
				"type": "int256"
			}
		],
		"name": "setNum",
		"outputs": [],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "getNum",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"type": "function",
		"stateMutability": "nonpayable"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "num",
				"type": "int256"
			}
		],
		"name": "evSetNum",
		"type": "event"
	}
];

export const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
export const contractObj = web3.eth.contract(abi).at(contractAddress);
