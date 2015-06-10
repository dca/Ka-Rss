
var React = require('react');
var LocationStore = require('../stores/LocationStore');
var FavoritesStore = require('../stores/FavoritesStore');
var LocationActions = require('../actions/LocationActions');

var mui = require('matevirial-ui');
var ThemeManager = new mui.Styles.ThemeManager();
//var AppBar = mui.AppBar;
//var LeftNav = mui.LeftNav;

import AppBar, LeftNav from 'matevirial-ui';

var Locations = React.createClass({

  getInitialState() {
    return LocationStore.getState();
  },

  componentDidMount() {
    LocationStore.listen(this.onChange);

    LocationActions.fetchLocations();
  },

  componentWillUnmount() {
    LocationStore.unlisten(this.onChange);
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    console.log('getChildContext');
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  onChange(state) {
    console.log('MainApp onChange', state);
    this.setState(state);
  },

  _handleOnClick(){
    console.log('on click');
    this.refs.leftNav.toggle();
  },

  render() {
    if (this.state.errorMessage) {
      return (
        <div>Something is wrong :{this.state.errorMessage}</div>
      );
    }

    if (!this.state.locations.length) {
      return (
        <div>
          ...
        </div>
      )
    }

    let menuItems = [];

    return (
      <div>
        <AppBar title='Title'
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onLeftIconButtonTouchTap={this._handleOnClick} />

        <LeftNav docked={false}
                 menuItems={menuItems}
                 ref='leftNav' />

        <ul>
          {this.state.locations.map((location) => {
            return (
              <li>{location.name}</li>
            );
          })}
        </ul>
      </div>
    );
  }
});

module.exports = Locations;

