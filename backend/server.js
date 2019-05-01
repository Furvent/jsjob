const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');
const jwt = require('jsonwebtoken');

let initialJobs = data.jobs;
let addedJobs = [];

users = [
    {id: 1, email: "fake@user.fr", nickname: "Tutu", password: "aze", role: 'admin'},
    {id: 2, email: "fake2@user.fr", nickname: "Tutu2", password: "aze", role: 'user'}
]; // Populate d'entrée avecun fake user

const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq' // ATTENTION ne pas mettre sur GH ou ailleurs, à aller chercher dans un fichier ou autre.

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
const authentification = express.Router();

authentification.post('/login', (req, res) => {
    if (req.body) {
        const email = req.body.email.toLocaleLowerCase();
        const password = req.body.password.toLocaleLowerCase();
        const index = users.findIndex(user => user.email === email)

        if (index > -1 && users[index].password === password) {
            let user = users[index];
            let token = '';
            if(user.email === 'fake@user.fr') {
                token = jwt.sign({ iss: 'http://localhost:4201', role: 'admin', email: req.body.email} , secret);
            } else {
                token = jwt.sign({ iss: 'http://localhost:4201', role: 'user', email: req.body.email} , secret);
            }
            res.json({success: true, token}) // token = token: token
        } else {
            res.status(401).json({ success: false, message: "Identifiants incorrects"});
        }
    } else {
        res.status(500).json({ success: false, message: "Données manquantes"});
    }
});

authentification.post('/register', (req, res) => {
    console.log('res.body', req.body);
    if (req.body) {
        const email = req.body.email.toLocaleLowerCase().trim();
        const password = req.body.password.toLocaleLowerCase().trim();
        const nickname = req.body.nickname.trim();
        users = [{id: Date.now(), email: email, password: password}, ... users];
        res.json({ success: true, users: users }); // En prod on enverrait pas les users...
    } else {
        res.json({ success: false, message: 'La création a échoué'});
    }
})

api.get('/jobs', (req, res) => {
    res.json(getAllJobs());
});

// MIDDLEWARE de controle pour le token
const checkUserToken = (req, res, next) => {
    // Dans le header : "Authorization: Bearer suivi du token" Bearer est le type d'authentification utilisé
    if (!req.header('authorization')) {
        return res.status(401).json({ success: false, message: "Header d'authentification manquant" })
    }

    const authorizationParts = req.header('authorization').split(' ');
    let token = authorizationParts[1];
    const decodedToken = jwt.verify(token, secret);
    console.log('decodedToken: ', decodedToken);
    next();
}

api.post('/jobs', checkUserToken, (req, res) => {
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

api.get('/search/:term/:place?', (req, res) => {
    console.log("in the get of search");
    const term = req.params.term.toLowerCase().trim();
    let place = req.params.place;
    let jobs = getAllJobs().filter(j =>(j.description.toLowerCase().includes(term) || j.title.toLowerCase().includes(term) ));
    if (place) {
        place = place.toLowerCase().trim();
        jobs = jobs.filter(j => (j.city.toLowerCase().includes(place)));
    }

    res.json({ success: true, jobs}) // Jobs equivalent à jobs: jobs
});

app.use('/api', api); // /api au lieu de Localhost:4201/jobs
app.use('/authentification', authentification);

const port = 4201;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});