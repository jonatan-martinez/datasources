const initLoaders = ({ controller, requestId }) => {
	const characterLoader = async ids => {
		return controller.getCharacters({ characterIds: ids, requestId })
	}
	const locationLoader = async ids => {
		return controller.getLocations({ urls: ids, requestId })
	}
	const episodeLoader = async ids => {
		return controller.getEpisodes({ urls: ids, requestId })
	}
	return {
		characterLoader,
		episodeLoader,
		locationLoader,
	}
}

module.exports = initLoaders
