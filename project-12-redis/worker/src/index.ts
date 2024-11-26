import { createClient } from 'redis'

const client = createClient();

const main = async () => {
    await client.connect();
    while (true) {
        try {
            const submission = await client.brPop('submissions', 0);
            console.log(submission);
            console.log('Submission received');
        } catch (error) {
            console.log(error)
        }
    }
}

main();