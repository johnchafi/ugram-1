const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const errors = require('./src/common/errors');
const logger = require('./src/common/logger');

const routes = require('./src/routes/routes');

const port = process.env.PORT || 80;

const app = express();

 const winston = require('winston');
 const winstonCloudWatch = require('winston-cloudwatch');

 winston.add(winstonCloudWatch, {
     logGroupName: 'glo3012',
     logStreamName: 'ugram',
     awsAccessKeyId : "AKIAIRCQYVHQV4RN5RKA",
     awsSecretKey : "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"
 });

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(errors.genericErrorHandler);
// Enables access-logs on each calls
app.use(morgan('combined', {'stream': logger.stream}));

app.use('/', routes);

app.listen(port);

logger.info(`App started on port ${port}`);
