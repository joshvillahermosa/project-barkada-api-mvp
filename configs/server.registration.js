/**
 * Server Registration Array
 */
const inert = require('inert');
const swaggered = require('hapi-swaggered');
const vision = require('vision');
const swaggeredUI = require('hapi-swaggered-ui');
const version = require('../package').version;
const prefix = `/api/v${version.slice(0, -4)}`;

const TITLE = 'Project Barkda API - MVP';

const swaggeredConfig = {
  register: swaggered,
  options: {
    stripPrefix: prefix,
    info:{ 
      title: TITLE,
 	  description: 'Fork of the normal Project',
    version: version,
  	}
  }
};

const swaggeredUIConfig = {
  register: swaggeredUI,
  options: {
    title: TITLE,
  	path: '/docs',
  	swaggerOptions: {
  	  validatorUrl: null
  	}
  }
};

module.exports = [
  inert,
  vision,
  swaggeredConfig,
  swaggeredUIConfig
];

module.register = function() {};

module.register.attributes = {
  name: 'api',
  version
}
