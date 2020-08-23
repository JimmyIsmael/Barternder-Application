const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

const controller = require('../controllers/main');

app.use(bodyParser.json());

//Add GET endpoints here
router.get('/helloWorld',controller.getHelloWorld);
router.get('/volunteer',controller.getAllUsers);
router.get('/volunteer/:userName/password/:password',controller.getUserByUserNameAndPassword);
router.get('/volunteer/status/:status',controller.getAllUsersByStatus);
router.get('/volunteer/search/:searchValue',controller.getAllUsersBySearchValue);

//Add POST endpoint here
router.post('/volunteer/new', controller.createNewUser);
router.post('/drink/new', controller.createNewDrink);

//Will catch all not defined routes
router.get('*',controller.getNotFound);

module.exports = router;
