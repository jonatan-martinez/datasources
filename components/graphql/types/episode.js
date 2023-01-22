const { gql } = require('apollo-server-express')

const episodeType = gql`
    type Episode {
        id: ID
        name: String
        air_date: String
        episode: String
    }
`
module.exports = { episodeType }
