const { User, Thought } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get a user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({
                _id: req.params.id
            })
            .populate({
                path: 'thoughts',
                select:'-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v');

            if (!user) {
                return res.status(404).json({
                    message: 'No user with that ID'
                });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({
                _id: req.params.id
            });

            if (!user) {
                res.status(404).json({
                    message: 'No user with that ID'
                });
            }

            await Thought.deleteMany({
                _id: {
                    $in: user.thoughts
                }
            });
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({
                _id: req.params.id
            }, {
                $set: req.body
            }, {
                runValidators: true,
                new: true
            });

            if (!user) {
                res.status(404).json({
                    message: 'No user with this id!'
                });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add a friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({
                _id: req.params.userId
            }, {
                $addToSet: {friends: req.params.friendId}
            }, {
                runValidators: true,
                new: true
            });

            if (!user) {
                res.status(404).json({
                    message: 'No friend with this id!'
                });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a friend
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({
                _id: req.params.userId
            }, {
                $pull: {
                    friends: req.params.friendId
                }
            }, {
                runValidators: true,
                new: true
            });

            if (!user) {
                res.status(404).json({
                    message: 'No friend with this id!'
                });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};