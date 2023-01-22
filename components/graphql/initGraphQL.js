const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const http = require('http')
const DataLoader = require('dataloader')
const { getResolvers } = require('./resolvers')
const initLoaders = require('./dataLoaders')
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
			context: ({ req }) => {
				if (req.body.operationName === 'IntrospectionQuery') {
					return {}
				}
				const requestId = tracker.addGQLRequest()
				const {
					characterLoader,
					episodeLoader,
					locationLoader,
				} = initLoaders({ controller, requestId })
				return {
					requestId,
					dataloaders: {
						character: new DataLoader(characterLoader),
						location: new DataLoader(locationLoader),
						episode: new DataLoader(episodeLoader),
					},
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
