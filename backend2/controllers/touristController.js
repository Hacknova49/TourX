import { uploadToIPFS } from "../services/pinata.js";
import { registerTouristOnChain, getTouristFromChain } from "../services/blockchainService.js";

export const registerTourist = async (req, res) => {
    try {
        const { name, kycFilePath, itineraryFilePath, emergencyContact, startDate, endDate, walletAddress } = req.body;

        // Upload KYC and itinerary to IPFS
        const kycHash = await uploadToIPFS(kycFilePath);
        const itineraryHash = await uploadToIPFS(itineraryFilePath);

        // Register on blockchain
        const txHash = await registerTouristOnChain(walletAddress, name, kycHash, itineraryHash, emergencyContact, startDate, endDate);

        res.status(200).json({ success: true, txHash });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

export const getTourist = async (req, res) => {
    try {
        const { walletAddress } = req.params;
        const tourist = await getTouristFromChain(walletAddress);
        res.status(200).json({ tourist });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
