import axios from "axios";
import { createReadStream } from "fs"; // Import createReadStream to read the image as a stream

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { image } = getQuery(event);

    try {
        // Make an HTTP GET request to fetch the image
        const imageUrl = `${config.storageUrl}/${image}`;
        const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

        if (response.status === 200) {
            // Encode the image data as Base64
            const imageRes = Buffer.from(response.data).toString("base64");
        return {
            imageRes: imageRes,
        };
        } else {
            throw new Error(
                `Failed to fetch the image. Status code: ${response.status}`
            );
        }
    } catch (error) {
        console.error(error);
    }
});
