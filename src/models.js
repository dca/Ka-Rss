
var Promise = require('bluebird');
    Promise.promisifyAll(require('mongoose'));

var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/ka-rss');

/*
* mongoose 除錯模式
*/
if ( /mongoose/.test(process.env.DEBUG) ){
  mongoose.set('debug', true);
}

//
var FeedSchema = mongoose.Schema({
  name: String,
  url: String,
}, { strict: false });

var ArticleSchema = mongoose.Schema({
  title: String,
  description: String,
  summary: String,
  date: Date,
  link: String,
  guid: String,
  author: String,
}, { strict: false })

export var Feed = mongoose.model('Feed', FeedSchema);
export var Article = mongoose.model('Article', ArticleSchema);

/*
Feed.createAsync([{
  name: 'JavaScript Weekly',
  url: 'http://javascriptweekly.com/rss/268gc90k'
}, {
  name: 'DailyNode',
  url: 'http://news.rednode.cn/feed'
}]);
*/


