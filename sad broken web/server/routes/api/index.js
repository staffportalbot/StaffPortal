const express = require('express')

module.exports = function(req, res, next) {
  switch(req.params.v) {
    case "1.0":
      require('./1.0/1.0')(req, res, next)
      break;
    default:
      res.status(404).json({"error":"API Version not found"})
      break;
  }
}
