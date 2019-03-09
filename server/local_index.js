const express = require('express');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const errors = require('./src/common/errors');
const logger = require('./src/common/logger');

const routes = require('./src/routes/routes');

const port = process.env.PORT || 1337;



// Gérer la connexion a MongoDB
mongoose.connect('mongodb://ugram:2ZuyP9j4u2PDZqxt@ec2-3-16-169-246.us-east-2.compute.amazonaws.com:27017/ugram-db?authSource=admin', {useNewUrlParser: true}).catch((err) => console.log(err));

const app = express();
const corsOptions = {
    origin: '*',
    methods: [
        'GET',
        'PUT',
        'POST',
        'PATCH',
        'DELETE',
        'UPDATE'
    ],
    credentials: true
};

/*const winston = require('winston');
const winstonCloudWatch = require('winston-cloudwatch');

winston.add(winstonCloudWatch, {
    logGroupName: 'glo3012',
    logStreamName: 'sample'
});*/

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.use(errors.genericErrorHandler);
// Enables access-logs on each calls
app.use(morgan('combined', {'stream': logger.stream}));

app.use('/', routes);

app.listen(port);
module.exports = app;
logger.info(`App started on port ${port}`)
