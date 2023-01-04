const functions = require('firebase-functions');
const server = require('./server');
const api = functions
                .runWith({memory:'256MB', timeoutSeconds: 60})
                .https
                .onRequest(server);

module.exports = {
    api
}

