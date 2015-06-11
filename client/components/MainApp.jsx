
var React = require('react');
var LocationStore = require('../stores/LocationStore');
var FavoritesStore = require('../stores/FavoritesStore');
var LocationActions = require('../actions/LocationActions');


var mui = require('material-ui');
var ThemeManager = new mui.Styles.ThemeManager();
var AppBar = mui.AppBar;
var LeftNav = mui.LeftNav;

//import {AppBar, LeftNav, Styles} from 'material-ui';
//let ThemeManager = new Styles.ThemeManager();


var MainApp = React.createClass({

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

    let menuItems = [
      { payload: '1', text: 'CCCB!', iconClassName: 'muidocs-icon-communication-phone', number: '10' },
      { payload: '2', text: 'Voicemail', iconClassName: 'muidocs-icon-communication-voicemail',  number: '5' },
      { payload: '3', text: 'Starred', iconClassName: 'muidocs-icon-action-stars', number: '3' },
      { payload: '4', text: 'Shared', iconClassName: 'muidocs-icon-action-thumb-up',  number: '12' }
    ];

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

module.exports = MainApp;

