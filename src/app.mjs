import express from 'express'
import fs from 'fs';

const Users = JSON.parse(fs.readFileSync('path/to/your/users.json', 'utf8'));

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
    console.log(`Link: http://localhost:${PORT}`)
})
