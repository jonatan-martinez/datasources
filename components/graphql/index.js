const System = require('systemic')
const { initGraphQL } = require('./initGraphQL')

module.exports = new System({ name: 'graphql' })
	.add('graphql', initGraphQL())
	.dependsOn('app', 'config', 'logger', 'controller', 'tracker')
