const System = require('systemic')
const { join } = require('path')

module.exports = () => new System({ name: 'datasources' })
	.bootstrap(join(__dirname, 'components'))
