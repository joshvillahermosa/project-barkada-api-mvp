const eventsDefinition = require('../resources/events');
const HapiResourceCreator = require('../services/hapi-resource-creator.service');

const jsonDb = require('node-json-db');
const db = new jsonDb('mock/events.json', true, true);

const hapiResourceCreator = new HapiResourceCreator(eventsDefinition, db);

module.exports = hapiResourceCreator.returnHapiResourceRoutes();
