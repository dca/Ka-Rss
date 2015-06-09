'use strict';

import path from 'path';
import debug from 'debug';

import koa from 'koa';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import Router from 'koa-router';
import mount from 'koa-mount';
import responseTime from 'koa-response-time';
//import koaBody from 'koa-better-body';
//import favicon from 'koa-favicon';
//import hbs from 'koa-hbs';
import staticCache from 'koa-static-cache';
import qs from 'koa-qs';
import koaBody from 'koa-body';

//import router from './router';
//import config from './config/init';

import * as models from './models.js';


const app = koa();
const env = process.env.NODE_ENV || 'development';

// add header `X-Response-Time`
app.use(responseTime());
app.use(logger());

// various security headers
app.use(helmet.defaults());


/*
*
* static
*
**/
const cacheOpts: Object = { maxAge: 86400000, gzip: true };

app.use(mount('/assets', staticCache(path.join(__dirname, '../dist'), cacheOpts)));




/*
*
* body-parser
*
*/
qs(app);

app.use(koaBody({
  formidable:{ uploadDir: __dirname + '/upload' }
}));


/*
*
* Router
*
**/
let router = new Router();

router.get('/api/v1/feeds', function *(next) {
  this.body = yield models.Feed.find().execAsync();
});

router.get('/api/v1/articles', function *(next) {
  this.body = yield models.Article.find().select('-meta').execAsync();
});

app.use(router.routes());


app.listen(3123);
console.log('Application started on port 3123');

import timer from './services/timer.js'

timer();

