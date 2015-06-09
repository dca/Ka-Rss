var React = require('react');
var Locations = require('./components/Locations.jsx');


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
  <Locations />,
  document.getElementById('ReactApp')
);



