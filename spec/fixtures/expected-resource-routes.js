/**
 * @description Expected Routes to test against for Routes Creator
 * Service
 */

module.exports = {
  deleteItem: {
    method: 'DELETE',
    path: '/resources/{id}',
    handler: () => {},
    config: {
      tags: ['api', 'resource'],
      description: 'Delete a resource',
      notes: 'Will Delete a resource and return the deleted resource if successful. **Receiving the deleted resource will be the last time to see the deleted resource**',
      validate: {
        params: '@todo'
      }
    }
  },
  getList: {
    method: 'GET',
    path: '/resources',
    handler: () => {},
    config: {
      tags: ['api', 'resource'],
      description: 'Gets resources',
      notes: 'Will return a list of resources'
    }
  },
  getItem: {
    method: 'GET',
    path: '/resources/{id}',
    handler: () => {},
    config: {
      tags: ['api', 'resource'],
      description: 'Gets a resource',
      notes: 'Will return a single resource',
      validate: {
        params: {
          id: '@todo'
        }
      }
    }
  },
  getItemProperty: {
    method: 'GET',
    path: '/resources/{id}/property/{property}',
    handler: () => {},
    config: {
      tags: ['api', 'resource'],
      description: 'Gets single resource property',
      notes: 'Will a get a resource property by ID and Property Name',
      validate: {
        params: '@todo'
      }
    }
  },
  postItem: {
    method: 'POST',
    path: '/resources',
    handler: () => {},
    config: {
      tags: ['api', 'resource'],
      description: 'Post a resource',
      notes: 'Will Post a resource and return the posted even if successful',
      validate: {
        payload: '@todo'
      }
    }
  },
  updateItem: {
    method: 'PUT',
    path: '/resources',
    handler: () => {},
    config: {
      tags: ['api', 'resource'],
      description: 'Updates a resource',
      notes: 'Will update a resource and return updated resource if successful',
      validate: {
        payload: '@todo'
      }
    }
  }
}
