// const DataLoader = require('dataloader')
const getCharacterResolver = require('./characterResolver')
const getLocationResolver = require('./locationResolver')

const getResolvers = ({ controller }) => {
	const characterResolver = getCharacterResolver({ controller })
	const locationResolver = getLocationResolver({ controller })
	const ttlInSeconds = 300
	return {
		Query: {
			Characters: async (_, { characterIds }, context) => {
				const { requestId, dataSources } = context
				return Promise.all(characterIds.map(id => dataSources.Character.get({ id, requestId, ttlInSeconds })))
			},
			Character: async (_, { characterId }, context) => {
				const { requestId, dataSources } = context
				return dataSources.Character.get({ id: characterId, requestId, ttlInSeconds })
			},
		},
		Character: characterResolver,
		Location: locationResolver,
	}
}

module.exports = { getResolvers }
