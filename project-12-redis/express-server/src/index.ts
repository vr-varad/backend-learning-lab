import express, { Request, Response } from 'express'
import { createClient } from 'redis'

const app = express();
const client = createClient();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Hello World' }) as any;
})

app.post("/submit", async (req: Request, res: Response) => {
    const { problemId, code, language } = req.body;
    try {
        await client.lPush('submissions', JSON.stringify({ problemId, code, language }));
        return res.status(200).json({ message: 'Submited successfully' }) as any;
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' }) as any;
    }
})


const startServer = async () => {
    try {
        await client.connect();
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.log(error)
    }
}

startServer();