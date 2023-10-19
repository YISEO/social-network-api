const { Schema, model } = require('mongoose');
const date = require('date-and-time');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => date.format(timestamp, 'MMM DD YYYY')
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => date.format(timestamp, 'MMM DD YYYY')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount') 
    // Getter
    .get(function () {
        return this.friends.length;
    });

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;