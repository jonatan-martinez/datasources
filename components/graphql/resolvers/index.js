// const DataLoader = require('dataloader')
const getCharacterResolver = require('./characterResolver')
const getLocationResolver = require('./locationResolver')

const getResolvers = ({ controller }) => {
	const characterResolver = getCharacterResolver({ controller })
	const locationResolver = getLocationResolver({ controller })

	return {
		Query: {
			Characters: async (_, { characterIds }, context) => {
				const { requestId } = context
				return controller.getCharacters({ characterIds, requestId })
			},
			Character: async (_, { characterId }, context) => {
				const { requestId } = context
				return controller.getCharacter({ characterId, requestId })
			},
		},
		Character: characterResolver,
		Location: locationResolver,
	}
}

module.exports = { getResolvers }
