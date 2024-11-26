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
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const app = (0, express_1.default)();
const client = (0, redis_1.createClient)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.status(200).json({ message: 'Hello World' });
});
app.post("/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { problemId, code, language } = req.body;
    try {
        yield client.lPush('submissions', JSON.stringify({ problemId, code, language }));
        return res.status(200).json({ message: 'Submited successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    }
    catch (error) {
        console.log(error);
    }
});
startServer();
