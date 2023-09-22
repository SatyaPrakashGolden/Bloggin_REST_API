const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
});
var blogging = mongoose.model('blogs', BlogSchema);
module.exports = blogging;