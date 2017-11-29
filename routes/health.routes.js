/**
 * Checks the health of the API
 */
const METHOD_CONSTANTS = require('./../services/methods.constants');

/**
 * Ideally the health check path should be left as / but hapi does not seem to
 * register it.
 * 
 * @todo Investigate why HAPI will not take `/` as default route
 */
const health = {
  method: METHOD_CONSTANTS.GET,
  path: '/health',
  handler: (request, reply) => {
    reply('200 OK')
  },
  config: {
  	tags: ['api', 'health'],
  	description: 'General API Health',
  	notes: 'General API Health Check'
  }
};

module.exports = {health}
