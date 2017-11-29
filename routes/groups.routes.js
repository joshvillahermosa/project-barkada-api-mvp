const groups = require('../resources/groups');
const HapiResourceCreator = require('../services/hapi-resource-creator.service');

const jsonDb = require('node-json-db');
const db = new jsonDb('mock/groups.json', true, true);

const hapiResourceCreator = new HapiResourceCreator(groups, db);

module.exports = hapiResourceCreator.returnHapiResourceRoutes();
