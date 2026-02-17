const hre = require("hardhat");
require("dotenv").config();

async function main() {
  // Get deployer account
  const deployer = (await hre.ethers.getSigners())[0];

  // Show deployer balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Deploying with account:", deployer.address);
  console.log("Balance (MATIC):", hre.ethers.formatEther(balance));

  // Deploy contract
  const TouristID = await hre.ethers.getContractFactory("TouristID");
  const contract = await TouristID.deploy();
  await contract.waitForDeployment();

  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
