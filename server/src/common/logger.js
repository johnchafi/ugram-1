const winston = require('winston');
const WinstonCloudwatch = require('winston-cloudwatch');

const logger = new winston.Logger({
    transports: [
      new WinstonCloudwatch({
          logGroupName: 'kleinh',
          logStreamName: 'team02-api',
            awsRegion: 'us-east-2',
            jsonMessage: true
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
