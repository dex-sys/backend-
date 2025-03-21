const express = require('express');
const {get_friends, add_friend, del_friend, check_user} = require('../controllers/friendsController');

const router = express.Router();

router.get('/:id', get_friends);
router.post('/:id', add_friend);
router.delete('/:id', del_friend);
router.get('/:id/check_user', check_user);

module.exports = router;
