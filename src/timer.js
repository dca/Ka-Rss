

import * as models from './models.js';
import collector from './collector.js';



async function doCollector() {
  console.log('strat run Collector');
  let feeds = await models.Feed.find().execAsync();

  feeds.forEach( feed => {
    console.log('Update %s', feed.name);
    return collector(feed.url)
              .then(res => console.log('%s Collect done', feed.name) )
              .catch(e => console.log(e, e.stack) )
  });
}

setInterval( doCollector, 1000 * 60);

doCollector();

