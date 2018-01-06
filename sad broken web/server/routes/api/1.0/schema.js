var { buildSchema } = require('graphql');

module.exports = {
  "POST": {},
  "GET": {
    token: buildSchema(`
      type TokenResponse {
        success: Int
        token: String
        error: String
      }
    
      type Query {
        login(user: String!, pass: String!): TokenResponse
      }
    `)
  }
}