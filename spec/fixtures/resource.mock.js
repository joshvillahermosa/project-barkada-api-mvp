/**
 * Mock Resource Definition
 */
/**
 * Events Resource Definition
 */

module.exports =  {
  name: 'Resource',
  // @todo See if we can put this in a resource creator
  pluralName: 'Resources',
  model: {
    base: [
      {
        name: 'id',
        type: 'string',
        description: 'Resource ID'
      },{
        name: 'name',
        type: 'string',
        description: 'Resource Name'
      },
    ],
    createdRequired: ['name'],
    updatedRequired: ['id']
  },
  generatedModels: {
    creation: {
      name: 'Joi Object'
    },
    update: {
      id: 'Joi Object',
      name: 'Joi Object'
    },
    id: 'Joi Object'
  },
  subModels: []
}
