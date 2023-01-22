const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const http = require('http')
const { getResolvers } = require('./resolvers')
const { typeDefs } = require('./types')

const initGraphQL = () => {
	let server
	const start = async ({
		app, controller, tracker,
	}) => {
		const rootValue = getResolvers({ controller })
		const httpServer = http.createServer(app)
		server = new ApolloServer({
			typeDefs,
			resolvers: rootValue,
			csrfPrevention: true,
			cache: 'bounded',
			context: async () => {
				const requestId = tracker.addGQLRequest()
				return {
					requestId,
				}
			},
			plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
		})
		await server.start()
		server.applyMiddleware({ app, path: '/graphql' })
		return { schema: typeDefs, rootValue }
	}
	const stop = async () => {
		await server.stop()
	}
	return { start, stop }
}

module.exports = { initGraphQL }
