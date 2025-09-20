const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const ctrl = require('../controllers/sweetsController');

router.post('/', auth, ctrl.createSweet);                 // add sweet
router.get('/', ctrl.listSweets);                         // list all sweets
router.get('/search', ctrl.searchSweets);                 // search sweets
router.put('/:id', auth, ctrl.updateSweet);               // update sweet
router.delete('/:id', auth, admin, ctrl.deleteSweet);     // delete sweet (Admin only)
router.post('/:id/purchase', auth, ctrl.purchaseSweet);   // purchase sweet
router.post('/:id/restock', auth, admin, ctrl.restockSweet); // restock sweet (Admin only)

module.exports = router;
