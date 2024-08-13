
const hre = require ("hardhat");
const { ethers } = require("hardhat");

async function main() {

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    
    const Token = await hre.ethers.getContractFactory("Token");
    const token = await Token.deploy(deployer.address ,"Faruq", "FRQ", 10000);

    console.log("Deployment result:", token);
    console.log("Instance type:", typeof token);

    // Ensure the contract is deployed
        await token.waitForDeployment();


        console.log("Contract deployed to:", await token.getAddress());
  
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

//CA 0x1852ce45F0147E6c1b4eAa43a55B65635E8d8ce5