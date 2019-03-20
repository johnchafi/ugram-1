const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const errors = require('./src/common/errors');
const logger = require('./src/common/logger');
const Sentry = require('@sentry/node');

Sentry.init({ dsn: 'https://535ecc5a93654d4fab876372a40565e4@sentry.io/1419323' });

// The request handler must be the first middleware on the app

const routes = require('./src/routes/routes');

const port = process.env.PORT || 80;

const app = express();
app.use(Sentry.Handlers.requestHandler());
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
