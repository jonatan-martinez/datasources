const System = require('systemic')
const adminRoutes = require('./admin-routes')

module.exports = new System({ name: 'routes' })
	.add('routes', adminRoutes())
	.dependsOn('app', 'logger', 'middleware.prepper', 'manifest', 'graphql', 'tracker')
