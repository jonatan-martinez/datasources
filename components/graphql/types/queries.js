const { gql } = require('apollo-server-express')

const charactersQuery = gql`
    type Query {
        Characters(characterIds: [ID!]!): [Character]
        Character(characterId: ID!): Character
    }
`
module.exports = { charactersQuery }
