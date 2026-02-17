import { uploadToIPFS } from "../services/pinata.js";
import { registerTouristOnChain } from "../services/blockchainService.js";

export async function registerTourist(req, res) {
  try {
    const {
      touristAddress,
      name,
      emergencyContact,
      startDate,
      endDate
    } = req.body;

    const kycHash = await uploadToIPFS(req.files.kyc.path);
    const itineraryHash = await uploadToIPFS(req.files.itinerary.path);

    const receipt = await registerTouristOnChain(
      touristAddress,
      name,
      kycHash,
      itineraryHash,
      emergencyContact,
      startDate,
      endDate
    );

    res.json({
      success: true,
      txHash: receipt.transactionHash
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
