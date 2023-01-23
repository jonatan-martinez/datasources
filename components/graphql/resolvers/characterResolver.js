const getCharacterResolver = ({ controller }) => {
	const ttlInSeconds = 300
	const characterResolver = {
		name: (parent, args, context) => {
			return parent.name
		},
		location: (parent, args, context) => {
			const { requestId, dataSources } = context
			return dataSources.Location.get({ id: parent.location.url, requestId, ttlInSeconds })
		},
		episodes: async (parent, args, context) => {
			const { requestId, dataSources } = context
			const episodes = await Promise.all(parent.episode.map(ep => dataSources.Episode.get({ id: ep, requestId, ttlInSeconds })))
			return episodes.map(_episode => {
				const {
					id,
					name,
					air_date,
					episode,
				} = _episode
				return {
					id,
					name,
					air_date,
					episode,
				}
			})
		},
	}
	return characterResolver
}
module.exports = getCharacterResolver
