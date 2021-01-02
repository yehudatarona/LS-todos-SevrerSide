const mongoose = require('mongoose');
const config = require("config")

// mongoose.connect('mongodb://localhost/testingTodos', {useNewUrlParser: true});
mongoose.connect(`mongodb+srv://admin:${config.get("mongoPass")}@cluster0-oiuyl.gcp.mongodb.net/Todos?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("we're connected let get to work")
});

module.exports = db;