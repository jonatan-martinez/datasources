const System = require('systemic')
const initTracker = require('./initTracker')

module.exports = new System({ name: 'tracker' })
	.add('tracker', initTracker())
	.dependsOn('logger')
