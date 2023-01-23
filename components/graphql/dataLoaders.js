const initLoaders = ({ controller }) => {
	const characterLoader = async params => {
		const ids = params.map(it => it.id)
		const requestId = params && params[0].requestId
		const characters = await controller.getCharacters({ characterIds: ids, requestId })
		return ids.map(id => characters.find(ch => +id === +ch.id))
	}
	const locationLoader = async params => {
		const ids = params.map(it => it.id)
		const requestId = params && params[0].requestId
		const locations = await controller.getLocations({ urls: ids, requestId })
		return ids.map(id => locations.find(loc => +id === +loc.id))
	}
	const episodeLoader = async params => {
		const ids = params.map(it => it.id)
		const requestId = params && params[0].requestId
		const episodes = await controller.getEpisodes({ urls: ids, requestId })
		return ids.map(id => episodes.find(ep => +id === +ep.id))
	}
	return {
		characterLoader,
		episodeLoader,
		locationLoader,
	}
}

module.exports = initLoaders
