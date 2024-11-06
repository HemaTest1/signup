const express= require('express')
const router = express.Router();
const personController = require("../Controller/PersonController");



router.post('/savePerson',personController.insertPerson);
router.put('/updatePerson/:emailid',personController.updatePerson);
router.get('/getingresults/',personController.findAllperson);
router.get('/getingnames/:personId',personController.findAllpersons);

router.post('/saveaddress',personController.insertaddress);
router.get('/finddetalis/:personId',personController.findAlladdress);

module.exports = router;