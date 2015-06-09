
var Promise = require('bluebird');
var parser = Promise.promisify(require('parse-rss'));

module.exports = parser;


