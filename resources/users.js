/**
 * Events Resource Definition
 */
const UsersDefinition = {
  name: 'User',
  // @todo See if we can put this in a resource creator
  pluralName: 'Users',
  model: {
    base: [
      {
        name: 'id',
        type: 'string',
        description: 'User ID'
      },{
        name: 'name',
        type: 'string',
        description: 'User Name'
      },{
        name: 'bio',
        type: 'string',
        description: 'Owners ID'
      }
    ],
    createdRequired: ['name', 'bio'],
    updatedRequired: ['id']
  },
  subModels: []
}

module.exports = UsersDefinition;
