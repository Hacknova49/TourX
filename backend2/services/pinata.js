import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;

export const uploadToIPFS = async (filePath) => {
    const form = new FormData();
    form.append("file", fs.createReadStream(filePath));

    const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", form, {
        maxBodyLength: "Infinity",
        headers: {
            'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
        },
    });

    return response.data.IpfsHash;
};
