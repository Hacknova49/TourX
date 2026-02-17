import { ethers } from "ethers";
import TouristID from "../artifacts/contracts/TouristID.sol/TouristID.json";

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  TouristID.abi,
  wallet
);

export async function registerTouristOnChain(
  touristAddress,
  name,
  kycHash,
  itineraryHash,
  emergency,
  start,
  end
) {
  const tx = await contract.registerTourist(
    touristAddress,
    name,
    kycHash,
    itineraryHash,
    emergency,
    start,
    end
  );

  return await tx.wait();
}
