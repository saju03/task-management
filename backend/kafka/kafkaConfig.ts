import { Kafka, logLevel } from 'kafkajs';
import winston from 'winston';

// Configure Winston to format log messages
const kafkaLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

// Function to map KafkaJS log levels to Winston
const toWinstonLogLevel = (kafkaLogLevel: any) => {
  switch (kafkaLogLevel) {
    case logLevel.ERROR:
      return 'error';
    case logLevel.WARN:
      return 'warn';
    case logLevel.INFO:
      return 'info';
    case logLevel.DEBUG:
      return 'debug';
    default:
      return 'info';
  }
};

// Custom logger for KafkaJS
const customLogger = ({ level, log }) => {
  const { message, ...extra } = log;
  kafkaLogger.log({
    level: toWinstonLogLevel(level),
    message,
    ...extra,
  });
};

// Initialize Kafka client with custom logger

const createKafka = (clientID: string)=>{
    return new Kafka({
        clientId: clientID,
        brokers: ['localhost:9092'],
        logLevel: logLevel.INFO, // Set the desired log level here
        logCreator: () => customLogger,
      });
      
}

export default createKafka