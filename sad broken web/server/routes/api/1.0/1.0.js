const logging = require('../../../../modules/console')

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

const redis = require('../../../../modules/redis')
const db = require('../../../../modules/database/driver')
const models = db.get()

const crypto = require('crypto')

// Schemas
const post_schemas = {
  auth: buildSchema(`
    type AuthResponse {
      success: Int,
      token: String,
      error: String
    }
    
    type Query {
      token(user: String!, pass: String!): AuthResponse,
      logout(user: String!): String
    }
  `)
}

const get_schemas = {
  
}

class AuthResponse {
  constructor(success, token, error) {
    this.success = success
    this.token = token
    this.error = error
  }
}

module.exports = function(req, res, next) {
  // Resolvers
  const root = {
    token: function(user, pass) {
      db.user.findOne({ 'config.email': user }).then(function(err, userDocument) {
        
        if (userDocument !== null) {
          
          var challenge = crypto.pbkdf2(pass, userDocument.auth.salt, userDocument.auth.iterations, 512, 'sha512', (err, key) => {return key.toString('hex')})
          
          if (challenge === userDocument.auth.pass) {
            
            redis.hget(userDocument.id, function(err, res) {
              
              if (err) logging.err("Failed to access redis database", {err: JSON.stringify(err)})
              if (!res) {
                var token = crypto.randomBytes(128);  
                redis.set(userDocument.id, token)
                redis.expire(userDocument.id, 43200) // TODO, token refresh system ey
                
                return new AuthResponse(1, token, null)
                
              } else {
                return new AuthResponse(1, res, null)
              }
            })
          } else {
            return new AuthResponse(0, null, "Email and password to not match.")
          }
          
        } else {
          return new AuthResponse(0, null, "Email and password do not match.")
        }
        
      })
    },
    logout: require('./logout')
  }
}