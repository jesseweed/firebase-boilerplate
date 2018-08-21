const functions   = require('firebase-functions')
const api = require('./api');

module.exports.api = functions.https.onRequest(api)
