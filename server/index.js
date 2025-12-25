import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/api/tracks', (req, res) => {
    const filepath = path.join(__dirname, 'public', 'db', 'tracks.json');

    fs.readFile(filepath, 'utf8', (err, data) => {
        if(err) {
            console.error(err);
            return res.status(500).send('Error of reading database');
        }
        try {
            const tracks = JSON.parse(data);
            res.json(tracks);

        } catch(parseError) {
            res.status(500).send('Error of parsing data');
        }
    });
});

app.listen(port, () => {
    console.log(`Server working on port ${port}`);
})



