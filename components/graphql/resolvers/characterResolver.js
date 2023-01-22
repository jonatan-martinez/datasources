const getCharacterResolver = ({ controller }) => {
	const characterResolver = {
		name: (parent, args, context) => {
			return parent.name
		},
		location: (parent, args, context) => {
			const { requestId } = context
			return controller.getLocation({ url: parent.location.url, requestId })
		},
		episodes: async (parent, args, context) => {
			const { requestId } = context
			const episodes = await Promise.all(parent.episode.map(url => controller.getEpisode({ url, requestId })))
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
