const initLoaders = ({ controller, requestId }) => {
	const characterLoader = ids => {
		return controller.getCharacters({ characterIds: ids, requestId })
	}
	const locationLoader = ids => {
		return controller.getLocations({ urls: ids, requestId })
	}
	const episodeLoader = ids => {
		return controller.getEpisodes({ urls: ids, requestId })
	}
	return {
		characterLoader,
		episodeLoader,
		locationLoader,
	}
}

module.exports = initLoaders
