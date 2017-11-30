/*======================================
=            Vendor Imports            =
======================================*/
// import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import createClass from 'create-react-class';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
/*=====  End of Vendor Imports  ======*/

/*===================================
=            App Imports            =
===================================*/
/*=====  End of App Imports  ======*/

/*=============================
=            Setup            =
=============================*/
/*=====  End of Setup  ======*/

/*===============================
=            Helpers            =
===============================*/
/*=====  End of Helpers  ======*/


/*=================================
=            Component            =
=================================*/
let App = withRouter(createClass({
  getInitialState(){
    return {
      prevPath: ''
    }
  },
  componentWillReceiveProps(nextProps){
    if (nextProps.location !== this.props.location) {
      this.setState({ 
        prevPath: this.props.location,
      });
    }
  },
  render(){
    return (
      <div>Starter Template</div>
    );
  }
}));
/*=====  End of Component  ======*/

/*==============================
=            Router            =
==============================*/
let routes = {
  default(prev, next){
  }
};

ReactDOM.render((
  <Router>
    <Route component={App}></Route>
  </Router>
), document.getElementById('app'));

export default App;
/*=====  End of Router  ======*/
