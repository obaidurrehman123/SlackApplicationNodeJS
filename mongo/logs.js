const mongoose = require('mongoose');

// Define a schema for the logs
const logSchema = new mongoose.Schema(
    {
        message: {
            type: String,
            required: true
        },
        level: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            required: true
        }
    },
    {
        collection: 'logs' // Specify the collection name
    }
);

// Create a Mongoose model for the logs
const Logs = mongoose.model('Log', logSchema);
module.exports = Logs;
