/**
 * Events Resource Definition
 */
const GroupsDefinition = {
  name: 'Group',
  // @todo See if we can put this in a resource creator
  pluralName: 'Groups',
  model: {
    base: [
      {
        name: 'id',
        type: 'string',
        description: 'Group ID'
      },{
        name: 'name',
        type: 'string',
        description: 'Group Name'
      },{
        name: 'description',
        type: 'string',
        description: 'Group Description'
      },{
        name: 'userIds',
        type: 'array',
        description: 'User IDs in group'
      }
    ],
    createdRequired: ['name', 'description'],
    updatedRequired: ['id']
  },
  subModels: []
}

module.exports = GroupsDefinition;
