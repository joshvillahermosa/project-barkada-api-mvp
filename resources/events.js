/**
 * Events Resource Definition
 */
const EventsDefinition = {
  name: 'Event',
  // @todo See if we can put this in a resource creator
  pluralName: 'Events',
  model: {
    base: [
      {
        name: 'id',
        type: 'string',
        description: 'Event ID'
      },{
        name: 'name',
        type: 'string',
        description: 'Event Name'
      },{
        name: 'ownerId',
        type: 'string',
        description: 'Owners ID'
      },{
        name: 'description',
        type: 'string',
        description: 'Event Description'
      },{
        name: 'time',
        type: 'string',
        description: 'Event Time'
      },{
        name: 'location',
        type: 'string',
        description: 'Event Location'
      }, {
        name: 'name',
        type: 'string',
        description: 'Event Name'
      }, {
        name: 'inviteeIds',
        type: 'array',
        description: 'Array of Invitee Ids'
      }, {
        name: 'planningElementIds',
        type: 'array',
        description: 'Array of active planning elements'
      }, {
        name: 'status',
        type: 'string',
        description: 'Event status'
      }
    ],
    createdRequired: ['name', 'ownerId', 'status'],
    updatedRequired: ['id']
  },
  subModels: []
}

module.exports = EventsDefinition;
