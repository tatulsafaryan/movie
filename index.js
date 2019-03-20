const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes/index');
const config = require('./config/config');
const constants = require('./config/constans');


const app = express();

mongoose.connect(config.databaseConnectUrl, {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(constants.API_URL_VERSION_0, router);


app.listen(config.serverPort,()=>{
    console.log(`server is runing on port ${config.serverPort}`);
})