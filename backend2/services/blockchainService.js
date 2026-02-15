import { ethers } from "ethers";
import fs from "fs";
import path from "path";

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractABI = JSON.parse(fs.readFileSync(path.join(__dirname, "../contracts/TouristIDABI.json"), "utf8"));
const contractAddress = process.env.CONTRACT_ADDRESS;

export const contract = new ethers.Contract(contractAddress, contractABI, wallet);

export const registerTouristOnChain = async (touristAddress, name, kycHash, itineraryHash, emergencyContact, startDate, endDate) => {
    const tx = await contract.registerTourist(
        touristAddress,
        name,
        kycHash,
        itineraryHash,
        emergencyContact,
        startDate,
        endDate
    );
    await tx.wait();
    return tx.hash;
};

export const getTouristFromChain = async (touristAddress) => {
    return await contract.getTourist(touristAddress);
};
