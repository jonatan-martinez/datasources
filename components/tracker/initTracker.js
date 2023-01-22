const { uuid } = require('uuidv4')

const initTracker = () => {
	const start = async ({ logger }) => {
		const gqlRequests = {}
		const addGQLRequest = () => {
			const id = uuid()
			if (!gqlRequests[id]) {
				gqlRequests[id] = {}
			}
			return id
		}
		const addRestRequest = ({ id, info }) => {
			const { resolver, requestInfo } = info
			if (!gqlRequests[id][resolver]) {
				gqlRequests[id][resolver] = {
					hits: 0,
					requests: [],
				}
			}
			gqlRequests[id][resolver].hits += 1
			gqlRequests[id][resolver].requests.push(requestInfo)
		}
		const getTrackInfo = () => {
			return gqlRequests
		}
		return {
			addGQLRequest,
			addRestRequest,
			getTrackInfo,
		}
	}
	return {
		start,
	}
}

module.exports = initTracker
