import express from 'express';
import path from 'path';
import fs from 'fs';
import { AddressInfo } from 'net';
import open from 'open';
import progress from './utils/progress';

const app = express();
const port = 0;

const client = path.resolve("../client");

app.use(express.static(path.resolve(client, './public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: path.resolve(client, './public')});
    // res.render('index.html');
    // res.sendFile(path.resolve(__dirname, '../../client/public/index.html'));
    }
);

let userData: string;
app.get('/userData', (req, res) => {
    /**
    res.sendFile(path.resolve(__dirname, 'assets/user/userData.json'),
    {headers: } ,(err) => {
        console.log(err);
    });
     */
    fs.promises.readFile(path.resolve('src/assets/user/userData.json'))
        .then((val) => {
            userData = val.toString();
            res.json(userData); 
        })
        .catch((reason) => {
            console.log(reason);
        });
});

app.post('/saveData', (req, res) => {
    const data = JSON.stringify(req.body);
    progress.start();
    fs.promises.writeFile(path.resolve('src/assets/user/userData.json'), data)
    .then(() => {
        progress.end();
        console.log('saved!');
    });
});

app.post('/exit', (req, res) => {
    const data = JSON.stringify(req.body);
    progress.start();
    fs.promises.writeFile(path.resolve('src/assets/user/userData.json'), data)
    .then(() => {
        progress.end();
        console.log('saved!');
        process.exit();
    });
});

const srv = app.listen(0, () => {
    const {port} = srv.address() as AddressInfo;
    const url = `http://localhost:${port}`;
    console.log(`[server]: Server is running at ${port}`);
    open(url);
});