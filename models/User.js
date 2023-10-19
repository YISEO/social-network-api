const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function (value) {
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
                },
                message: 'Please enter a valid email address'
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }, 
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }, 
        ],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Create a virtual property `friendCount` that gets the length of the user's friends
userSchema.virtual('friendCount')
    // Getter
    .get(function () {
        return this.friends.length;
    });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;