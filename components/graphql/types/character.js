const { gql } = require('apollo-server-express')

const characterType = gql`
    type Character {
        name: String
        location: Location
        episodes: [Episode]
    }
`
module.exports = { characterType }
