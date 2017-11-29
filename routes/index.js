const eventsRoutes = require('./events.routes');
const healthRoutes = require('./health.routes');
const userRoutes = require('./users.routes');
const groupRoutes = require('./groups.routes');

module.exports = {
  ...healthRoutes,
  ...eventsRoutes,
  ...userRoutes,
  ...groupRoutes
};
