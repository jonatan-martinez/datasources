const { DataSource } = require('apollo-datasource')

module.exports = class GenericDataSource extends DataSource {
	constructor({ loader, resolverName }) {
		super()
		this.loader = loader
		this.resolverName = resolverName
	}

	initialize({ context, cache }) {
		this.context = context
		this.cache = cache
	}

	didEncounterError(err) {
		throw err
	}

	async get({ id, requestId, ttlInSeconds = undefined }) {
		const cacheKey = `${this.resolverName}-${id}`
		const cachedDoc = await this.cache.get(cacheKey)
		if (cachedDoc) {
			return JSON.parse(cachedDoc)
		}
		const doc = await this.loader.load({ id, requestId })
		if (ttlInSeconds) {
			this.cache.set(cacheKey, JSON.stringify(doc), { ttl: ttlInSeconds })
		}
		return doc
	}
}
