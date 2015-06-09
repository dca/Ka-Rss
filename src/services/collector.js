

import parser from './parser';
import * as models from '../models.js';

async function processEntity(entity) {
  if (!entity.title || !entity.link) {
    return Promise.reject('no title or link');
  }
  //console.log('entity: %s', entity.title);

  let conditions= {
    link: entity.link
  },
  update = {
    updatedAt: Date.now()
  },
  options = {
    'upsert': true,
    'new': true
  };

  /*
   * TODO 需要更聰明的避免重複方法
   */
  let article = await models.Article.findOneAndUpdateAsync(conditions, update, options);

  if ( isNewArticle(article) ) {
    await article.updateAsync(entity);
    console.log('find new Article, link: %s', article.link);
    return Promise.resolve(article);
  }

  return null;

};

function isNewArticle(article) {
  // TODO move to model
  return !(article.title && article.date);
}

function collector(url) {
  return parser(url).map(processEntity);
}


module.exports = collector;


