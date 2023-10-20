const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser
} = require('../../controller/user-controller');

router.route('/').get(getUsers).post(createUser);
router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;