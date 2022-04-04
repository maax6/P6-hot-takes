const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const idControl = require('../middleware/idControl')

const sauceCtrl = require('../controllers/sauce');
const likeCtrl = require('../controllers/like');


router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth,idControl, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, idControl, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/:id/like', auth, likeCtrl.likeSauce);


module.exports = router;