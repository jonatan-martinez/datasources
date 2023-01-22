const { gql } = require('apollo-server-express')

const locationType = gql`
    type Location {
        name: String
        type: String
        dimension: String
    }
`
module.exports = { locationType }
