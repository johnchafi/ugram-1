const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const errors = require('./common/errors');
const logger = require('./common/logger');

const routes = require('./routes/routes');

const port = process.env.PORT || 1337;

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

const winston = require('winston');
const winstonCloudWatch = require('winston-cloudwatch');

winston.add(winstonCloudWatch, {
    logGroupName: 'glo3012',
    logStreamName: 'sample'
});

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

logger.info(`App started on port ${port}`)