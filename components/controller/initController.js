/* eslint-disable no-unreachable */
const axios = require('axios')
const episodes = require('./episodes.json')
const characters = require('./characters.json')
const locations = require('./locations.json')

const initController = () => {
	const start = async ({ config, logger, tracker }) => {
		const getCharacters = async ({ characterIds, requestId }) => {
			logger.info(`Getting Multiple Characters: ${characterIds}`)
			tracker.addRestRequest({
				id: requestId,
				info: {
					resolver: 'characters',
					requestInfo: {
						characterIds,
					},
				},
			})
			return characters.filter(ch => characterIds.map(id => +id).includes(ch.id))
			const ep = `${config.apiEndpoint}/${config.paths.character}/${characterIds.join(',')}`
			const { data } = await axios.get(ep)
			return characterIds.length === 1 ? [data] : data
		}
		const getCharacter = async ({ characterId, requestId }) => {
			tracker.addRestRequest({
				id: requestId,
				info: {
					resolver: 'character',
					requestInfo: {
						characterId,
					},
				},
			})
			logger.info(`Getting Single Character: ${characterId}`)
			return characters.find(ch => ch.id === +characterId)
			const ep = `${config.apiEndpoint}/${config.paths.character}/${characterId}`
			const { data } = await axios.get(ep)
			return data
		}
		const getUrl = async ({ url }) => {
			const { data } = await axios.get(url)
			return data
		}
		const getLocation = ({ url, requestId }) => {
			tracker.addRestRequest({
				id: requestId,
				info: {
					resolver: 'location',
					requestInfo: {
						url,
					},
				},
			})
			logger.info(`Getting Location: ${url}`)
			return locations.find(loc => loc.id === +url)
			return getUrl({ url })
		}

		const getLocations = ({ urls, requestId }) => {
			tracker.addRestRequest({
				id: requestId,
				info: {
					resolver: 'locations',
					requestInfo: {
						urls,
					},
				},
			})
			logger.info(`Getting Locations: ${urls}`)
			return locations.filter(loc => urls.includes(`${loc.id}`))
			return getUrl({ urls })
		}

		const getEpisode = ({ url, requestId }) => {
			tracker.addRestRequest({
				id: requestId,
				info: {
					resolver: 'episode',
					requestInfo: {
						url,
					},
				},
			})
			logger.info(`Getting Episode: ${url}`)
			return episodes.find(ep => ep.id === +url)
			return getUrl({ url })
		}
		const getEpisodes = ({ urls, requestId }) => {
			tracker.addRestRequest({
				id: requestId,
				info: {
					resolver: 'episodes',
					requestInfo: {
						urls,
					},
				},
			})
			logger.info(`Getting Episodes: ${urls}`)
			return episodes.filter(ep => urls.includes(`${ep.id}`))
			return getUrl({ urls })
		}

		return {
			getCharacter,
			getCharacters,
			getLocation,
			getEpisode,
			getLocations,
			getEpisodes,
		}
	}

	return { start }
}

module.exports = initController
