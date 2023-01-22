const getCharacterResolver = ({ controller }) => {
	const characterResolver = {
		name: (parent, args, context) => {
			return parent.name
		},
		location: (parent, args, context) => {
			const { requestId, dataloaders } = context
			return dataloaders.location.load(parent.location.url)
		},
		episodes: async (parent, args, context) => {
			const { requestId, dataloaders } = context
			const episodes = await Promise.all(parent.episode.map(ep => dataloaders.episode.load(ep.url)))
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
