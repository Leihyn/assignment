const { ethers } = require("ethers");

const INFURA_ID = '0efa44d155024bdb86e1d961fbdf930c'
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_ID}`)

const account1 = '0x321e2e525195b6981dB170E8e20AC206a15e3095' // Your account address 1
const account2 = '0x321e2e525195b6981dB170E8e20AC206a15e3095' // Your account address 2

const privateKey1 = '' // Private key of account 1
const wallet = new ethers.Wallet(privateKey1, provider)
//0xc8f287689ca732243cc2357f5fb9c9f48eb7261d0111cc51d23458dd368a2fd9


const ERC20_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint256 value) returns (bool)",
]
const address = '';
const contract = new ethers.Contract(address, ERC20_ABI, provider)

const main = async () => {
    const balance = await contract.balanceOf(account1)

    console.log(`\nReading from ${address}\n`)
    console.log(`Name: ${name}`)
    console.log(`Symbol: ${symbol}`)
    console.log(`Total Supply: ${totalSupply}\n`)
    console.log(`\nReading from ${address}\n`)
    console.log(`\nBalance: ${balance}\n`)


    const contractWithWallet = contract.connect(wallet)

    const tx = await contractWithWallet.transfer(account2, balance)
    await tx.wait()

    console.log(tx)

    const balanceOfSender = await contract.balanceOf(account1)
    const balanceOfReceiver = await contract.balanceOf(account2)

    console.log(`\nBalance of sender after transfer: ${balanceOfSender}\n`)
    console.log(`\nBalance of receiver after transfer: ${balanceOfReceiver}\n`)
}

main()