const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');

let initialJobs = data.jobs;
let addedJobs = [];

const getAllJobs = () => {
    return [...addedJobs, ...initialJobs];
};

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

const api = express.Router();

api.get('/jobs', (req, res) => {
    res.json(getAllJobs());
});

api.post('/jobs', (req, res) => {
    const job = req.body;
    addedJobs = [job, ...addedJobs];
    console.log('Total number of jobs: ' + getAllJobs().length);
    res.json(job);
});

api.get('/jobs/:id', (req, res) => {
    //const id = req.params.id; // On récupère "1" par exemple, en String
    const id = parseInt(req.params.id, 10); // Là on recup 1
    const job = getAllJobs().filter(j => j.id === id);
    if (job.length === 1) {
        res.json( {success: true, job: job[0]});
    } else {
        res.json( {success: false, message: `pas de job ayant pour id : ${id}`});
    }
});

app.use('/api', api); // /api au lieu de Localhost:4201/jobs 

const port = 4201;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});