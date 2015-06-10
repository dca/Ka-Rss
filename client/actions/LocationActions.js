var alt = require('../alt');
var LocationsFetcher = require('../utils/LocationsFetcher.js');

import fetch from 'isomorphic-fetch';
import Fetcher from '../utils/Fetcher.js';

class LocationActions {

  updateLocations(locations) {
    this.dispatch(locations);
  }

  fetchLocations() {
    // we dispatch an event here so we can have "loading" state.
    this.dispatch();

    Fetcher.get('http://localhost:3123/api/v1/feeds').then( res => console.log('....') )

    LocationsFetcher.fetch()
      .then((locations) => {
        // we can access other actions within our action through `this.actions`
        this.actions.updateLocations(locations);
      })
      .catch((errorMessage) => {
        this.actions.locationsFailed(errorMessage);
      });
  }

  locationsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  favoriteLocation(locationId) {
    this.dispatch(locationId);
  }
}

module.exports = alt.createActions(LocationActions);

