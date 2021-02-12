const PaimonClient = require('./Structures/PaimonClient');
const config = require('../config.json');

const client = new PaimonClient(config);
client.start();
