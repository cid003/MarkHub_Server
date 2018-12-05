import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const config = require('./config.json'); //config is a javascript object, converted from a .json file

// Create connection to MongoDB
const mongoDB = `mongodb://${config.user}:${config.getIn}@${config.MongoInst}`;

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB error occurred:'));
// The routes for the back-end Api
import ApiRouter from './router/router';


// Create an express app
const app = express();

// Set up body parser to be able to read json request bodies
app.use(bodyParser.json());
// urlencoding for parameter request - do not need to extend 
app.use(bodyParser.urlencoded({ extended: false }));
// initialize Routes
app.use(ApiRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
}); 