const { ApolloServer } = require('apollo-server-express')
const { InMemoryLRUCache } = require('apollo-server-caching')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const http = require('http')
const DataLoader = require('dataloader')
const GenericDataSource = require('./dataSources/GenericDataSource')
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
		const {
			characterLoader,
			episodeLoader,
			locationLoader,
		} = initLoaders({ controller })
		server = new ApolloServer({
			typeDefs,
			resolvers: rootValue,
			csrfPrevention: true,
			cache: new InMemoryLRUCache(),
			dataSources: () => {
				return {
					Character: new GenericDataSource({ loader: new DataLoader(characterLoader), resolverName: 'character' }),
					Location: new GenericDataSource({ loader: new DataLoader(locationLoader), resolverName: 'location' }),
					Episode: new GenericDataSource({ loader: new DataLoader(episodeLoader), resolverName: 'episode' }),
				}
			},
			context: ({ req }) => {
				if (req.body.operationName === 'IntrospectionQuery') {
					return {}
				}
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
