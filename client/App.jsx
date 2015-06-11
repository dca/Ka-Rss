var React = require('react');
var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

var Locations = require('./components/Locations.jsx');
var MainApp = require('./components/MainApp.jsx');


//var Iso = require('iso');
var alt = require('./alt');

/*
Iso.bootstrap(function (state, meta, container) {
  alt.bootstrap(state);
  React.render(React.createElement(Locations), container);
});
*/
//window.alt = alt;


React.render(
  <MainApp />,
  document.getElementById('ReactApp')
);



