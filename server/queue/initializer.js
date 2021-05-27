const Bull = require('bull');
const path = require('path');

/**
 * Initialize the the scheduling queue for jobs.
 * @param {Object} queueOptions Queue data
 * @param {Array} queueJobProcessors A list of process handlers for the queue.
 * @returns Queue
 */
const initializeQueue = (queueOptions, queueJobProcessors) => {
  const queue = new Bull(queueOptions.name, queueOptions.options || {
    redis: {
      port: process.env.REDIS_PORT || 6379,
      host: process.env.REDIS_HOST || '127.0.0.1'
    }
  });

  for (const job of queueJobProcessors) {
    queue.process(job.name, path.resolve(process.cwd(), job.jobHandlerPath));
  }

  return queue;
}

module.exports = initializeQueue;