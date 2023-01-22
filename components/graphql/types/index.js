const { mergeTypeDefs } = require('@graphql-tools/merge')
const { characterType } = require('./character')
const { locationType } = require('./location')
const { episodeType } = require('./episode')
const { charactersQuery } = require('./queries')

const typeDefs = [
	episodeType,
	locationType,
	characterType,
	charactersQuery,
]

module.exports = { typeDefs: mergeTypeDefs(typeDefs) }
