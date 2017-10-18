const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
   content: String,
   complete: Boolean,
   created: {type: Date, default: new Date()}
});

module.exports = mongoose.model('Todo', TodoSchema);