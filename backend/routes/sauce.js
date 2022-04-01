const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


const sauceCtrl = require('../controllers/sauce');
const likeCtrl = require('../controllers/likes');


router.post('/', auth, multer, stuffCtrl.createSauce);
router.put('/:id', auth, multer, stuffCtrl.modifySauce);
router.delete('/:id', auth, stuffCtrl.deleteSauce);
router.get('/:id', auth, stuffCtrl.getOneSauce);
router.get('/', auth, stuffCtrl.getAllSauces);
router.post('/:id/like', auth, likeCtrl.likeSauce);


module.exports = router;